import home from "@/data/site/home.html?raw";
import sobre from "@/data/site/sobre.html?raw";
import paciente from "@/data/site/paciente.html?raw";
import contato from "@/data/site/contato.html?raw";
import privacidade from "@/data/site/privacidade.html?raw";
import blog from "@/data/site/blog.html?raw";
import cursos from "@/data/site/cursos.html?raw";
import perioIa from "@/data/site/perio-ia.html?raw";

/** Complete documents preserve the source site's Elementor selectors and runtime.
 * Native server routes render these without an iframe or a React wrapper.
 * Presentation dependencies are versioned under public/.
 */
export const sitePages = { home, sobre, paciente, contato, privacidade, blog, cursos, perioIa };
export type SitePage = keyof typeof sitePages;
const noIndexPages = new Set<SitePage>(["blog", "cursos", "perioIa"]);

export function pageResponse(page: SitePage, head = false): Response {
  return new Response(head ? null : sitePages[page], {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      ...(noIndexPages.has(page) ? { "X-Robots-Tag": "noindex, follow" } : {}),
    },
  });
}
