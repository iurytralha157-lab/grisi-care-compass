import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { sitePages } from "@/lib/site-pages";
import { Route as HomeRoute } from "@/routes/index";
import { Route as SobreRoute } from "@/routes/sobre";
import { Route as PatientRoute } from "@/routes/informacoes-ao-paciente";
import { Route as ContactRoute } from "@/routes/contato";
import { Route as PrivacyRoute } from "@/routes/politica-de-privacidade";
import { Route as BlogRoute } from "@/routes/blog";

const publicRoot = resolve(process.cwd(), "public");
const origin = "https://grisi-copy.test";
const pageCases = [
  {
    name: "home",
    route: HomeRoute,
    title: "Instituto Grisi",
    content: "Nossos Tratamentos",
  },
  {
    name: "sobre",
    route: SobreRoute,
    title: "Sobre – Instituto Grisi",
    content: "Quem irá cuidar de você?",
  },
  {
    name: "paciente",
    route: PatientRoute,
    title: "Informações ao Paciente – Instituto Grisi",
    content: "Benefícios em ser paciente",
  },
  {
    name: "contato",
    route: ContactRoute,
    title: "Contato – Instituto Grisi",
    content: "R. Maestro Villa Lobos, 465",
  },
  {
    name: "privacidade",
    route: PrivacyRoute,
    title: "Política de Privacidade – Instituto Grisi",
    content: "ÚLTIMA ATUALIZAÇÃO: 29.02.2024",
  },
  {
    name: "blog",
    route: BlogRoute,
    title: "Blog – Instituto Grisi",
    content: "Em breve, novos conteúdos",
  },
] as const;

function parse(html: string): Document {
  // DOMParser does not execute the captured site's scripts or fetch resources.
  return new DOMParser().parseFromString(html, "text/html");
}

function text(element: Element | DocumentFragment | null): string {
  return (element?.textContent ?? "").replace(/\s+/g, " ").trim();
}

function bodyText(doc: Document): string {
  const body = doc.body.cloneNode(true) as HTMLElement;
  body.querySelectorAll("script, style, template, noscript").forEach((node) => node.remove());
  return text(body);
}

function handlers(route: { options: unknown }) {
  // These are the actual server handlers used by each public route, without a
  // browser, development server or request to the original WordPress backend.
  return (route.options as { server: { handlers: { GET: () => Response; HEAD: () => Response } } })
    .server.handlers;
}

function assetPath(url: string, owner = "/"): string {
  const parsed = new URL(url, origin + owner);
  expect(parsed.origin, `Presentation resource must be local: ${url}`).toBe(origin);
  return resolve(publicRoot, decodeURIComponent(parsed.pathname).replace(/^\/+/, ""));
}

function expectAsset(url: string, owner = "/"): string {
  const file = assetPath(url, owner);
  expect(existsSync(file), `Missing presentation resource: ${url}`).toBe(true);
  expect(statSync(file).size, `Empty presentation resource: ${url}`).toBeGreaterThan(0);
  return file;
}

function presentationResources(doc: Document): Set<string> {
  const urls = new Set<string>();
  doc
    .querySelectorAll(
      'img[src], script[src], source[src], link[rel="stylesheet"][href], link[rel="icon"][href]',
    )
    .forEach((element) => urls.add(element.getAttribute("src") ?? element.getAttribute("href")!));
  doc.querySelectorAll("img[srcset], source[srcset]").forEach((element) => {
    for (const item of element.getAttribute("srcset")!.split(",")) {
      const url = item.trim().split(/\s+/)[0];
      if (url) urls.add(url);
    }
  });
  return urls;
}

describe.each(pageCases)("Instituto Grisi: $name", ({ name, route, title, content }) => {
  it("serves its complete Portuguese document from the public route", async () => {
    const response = handlers(route).GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/html; charset=utf-8");
    const doc = parse(await response.text());
    expect(doc.documentElement.lang.toLowerCase()).toBe("pt-br");
    expect(doc.title).toBe(title);
    expect(doc.querySelector("main")).not.toBeNull();
    expect(bodyText(doc)).toContain(content);
    expect(doc.querySelector('[data-elementor-type="header"]')).not.toBeNull();
    expect(doc.querySelector('[data-elementor-type="footer"]')).not.toBeNull();
    expect(handlers(route).HEAD().body).toBeNull();
  });

  it("keeps the four requested navigation entries and working Home links", () => {
    const doc = parse(sitePages[name]);
    const menu = [...doc.querySelectorAll("header nav ul > li > a")].map((anchor) => ({
      label: text(anchor),
      href: anchor.getAttribute("href"),
    }));
    expect(menu).toEqual([
      { label: "Home", href: "/" },
      { label: "Sobre", href: "/sobre/" },
      { label: "Informações ao Paciente", href: "/informacoes-ao-paciente/" },
      { label: "Contato", href: "/contato/" },
    ]);
    expect(doc.querySelector('a[href=""]')).toBeNull();
    expect(doc.querySelector('a[href*="/blog"]')).toBeNull();
    doc.querySelectorAll("header a").forEach((logo) => {
      if (logo.querySelector("img")) expect(logo.getAttribute("href")).toBe("/");
    });
  });

  it("contains only the retained clinic's visible content and usable email links", () => {
    const doc = parse(sitePages[name]);
    expect(bodyText(doc)).not.toMatch(
      /bras[ií]lia|SRTVS|Asa Sul|\(61\)|98137|care compass|lovable/i,
    );
    expect(doc.querySelector('a[href*="brasilia"]')).toBeNull();
    expect(doc.querySelector('a[href*="email-protection"]')).toBeNull();
    doc.querySelectorAll("a").forEach((anchor) => {
      if (text(anchor).includes("@institutogrisi.com.br")) {
        expect(anchor.getAttribute("href")).toMatch(/^mailto:/);
      }
    });
  });

  it("ships every referenced image, font stylesheet and script locally", () => {
    const doc = parse(sitePages[name]);
    const resources = presentationResources(doc);
    expect(resources.size).toBeGreaterThan(20);
    for (const url of resources) {
      expectAsset(url);
      if (!new URL(url, origin).pathname.endsWith(".css")) continue;
      const css = readFileSync(assetPath(url), "utf8");
      for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
        const dependency = match[1]?.trim();
        if (dependency && !dependency.startsWith("data:")) expectAsset(dependency, url);
      }
    }
  });
});

describe("Requested source behavior and layout", () => {
  it("uses Sobre in both the page title and breadcrumb", () => {
    const doc = parse(sitePages.sobre);
    const masthead = doc.querySelector("main section");
    expect(text(masthead?.querySelector("h2") ?? null)).toBe("Sobre");
    expect(text(masthead?.querySelector(".elementor-icon-list-items") ?? null)).toBe(
      "Início Sobre",
    );
  });

  it("retains the original four hero slides and distinct desktop/mobile artwork", () => {
    const doc = parse(sitePages.home);
    const hero = doc.querySelector('[data-id="910b097"]');
    expect(hero?.querySelectorAll(".swiper-wrapper > .swiper-slide")).toHaveLength(4);
    const href = doc.querySelector("#elementor-post-17-css")!.getAttribute("href")!;
    const css = readFileSync(expectAsset(href), "utf8");
    expect(css).toContain("--min-height:100vh");
    const mobileStart = css.search(/@media\s*\(max-width:767px\)/);
    expect(mobileStart).toBeGreaterThan(0);
    const nextMedia = css.indexOf("@media", mobileStart + 6);
    const desktopCss = css.slice(0, mobileStart);
    const mobileCss = css.slice(mobileStart, nextMedia < 0 ? undefined : nextMedia);
    const desktopImages = ["Page-5.webp", "Page-3.webp", "Page-7.webp", "Page-2.webp"];
    const mobileImages = ["3.png", "2.png", "4.png", "1.png"];
    for (const [rules, images] of [
      [desktopCss, desktopImages],
      [mobileCss, mobileImages],
    ] as const) {
      for (const filename of images) {
        const path = `/wp-content/uploads/2025/03/${filename}`;
        expect(rules).toContain(path);
        expectAsset(path);
      }
    }
  });

  it("retains treatment popup content and makes both original certificates downloadable", () => {
    const home = parse(sitePages.home);
    const about = parse(sitePages.sobre);
    expect(home.querySelectorAll('[data-elementor-type="popup"]')).toHaveLength(5);
    expect(about.querySelectorAll('[data-elementor-type="popup"]')).toHaveLength(7);
    const triggerIds = new Set(
      [...home.querySelectorAll('a[href^="#elementor-action"]')].map((anchor) => {
        const action = decodeURIComponent(anchor.getAttribute("href")!);
        const encoded = action.split("settings=")[1]!;
        return (JSON.parse(atob(encoded)) as { id: string }).id;
      }),
    );
    for (const id of [543, 551, 555, 559, 565]) {
      const modal = home.querySelector(`[data-elementor-type="popup"][data-elementor-id="${id}"]`);
      expect(modal).not.toBeNull();
      expect(text(modal).length).toBeGreaterThan(250);
      expect(triggerIds.has(String(id))).toBe(true);
    }
    const certificate = about.querySelector(
      '[data-elementor-type="popup"][data-elementor-id="712"]',
    );
    const links = [...(certificate?.querySelectorAll("a[download]") ?? [])];
    expect(links).toHaveLength(2);
    expect(links.map((link) => link.getAttribute("download"))).toEqual([
      "Certificado-GBT.webp",
      "Certificado12.webp",
    ]);
    for (const link of links) {
      expectAsset(link.getAttribute("href")!);
      expect(link.querySelector("img")).not.toBeNull();
      expect(link.getAttribute("data-elementor-open-lightbox")).toBe("no");
    }
  });

  it("keeps Blog reachable with its own canonical while excluding it from indexing", () => {
    const doc = parse(sitePages.blog);
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("/blog/");
    expect(doc.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe(
      "noindex, follow",
    );
    expect(handlers(BlogRoute).GET().headers.get("X-Robots-Tag")).toBe("noindex, follow");
  });
});
