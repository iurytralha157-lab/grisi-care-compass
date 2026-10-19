import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clínica Gengiva Viva — Periodontia especializada" },
      { name: "description", content: "Clínica especializada em periodontia: prevenção, tratamento e manutenção da saúde das gengivas." },
      { property: "og:title", content: "Clínica Gengiva Viva — Periodontia especializada" },
      { property: "og:description", content: "Prevenção, tratamento e manutenção da saúde das gengivas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600&family=Manrope:wght@400;600;700&display=swap" },
    ],
  }),
  component: Index,
});

const treatments = [
  { t: "Check-up periodontal", d: "Avaliação completa de gengivas e implantes para detectar problemas cedo." },
  { t: "Tratamento não cirúrgico", d: "Limpeza profunda e controle da inflamação sem cortes." },
  { t: "Tratamento cirúrgico", d: "Procedimentos para recuperar tecidos e suporte dos dentes." },
  { t: "Manutenção de suporte", d: "Acompanhamento periódico de dentes naturais e implantes." },
  { t: "Halitose", d: "Diagnóstico das causas do mau hálito e plano de cuidado." },
];

const units = [
  { city: "Unidade Centro", addr: "Endereço de exemplo, 100 — Centro" },
  { city: "Unidade Jardins", addr: "Endereço de exemplo, 200 — Jardins" },
];

function Index() {
  return (
    <main>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-2xl text-primary">Gengiva Viva</span>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#tratamentos">Tratamentos</a><a href="#sobre">A clínica</a><a href="#unidades">Unidades</a><a href="#contato">Contato</a>
        </nav>
        <a href="#contato" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Agendar</a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Periodontia especializada</p>
          <h1 className="mt-4 text-5xl leading-tight md:text-6xl">Gengivas saudáveis, sorriso para a vida toda.</h1>
          <p className="mt-6 text-lg text-muted-foreground">Cuidamos da base do seu sorriso com foco em preservar seus dentes naturais.</p>
          <a href="#contato" className="mt-8 inline-block rounded-full bg-accent px-7 py-3 font-semibold text-accent-foreground">Agende sua avaliação</a>
        </div>
        <img src={hero} alt="Paciente sorrindo na clínica" width={1600} height={1008} className="rounded-[2rem] object-cover shadow-xl" />
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 px-6 py-12 text-center">
          {[["+5.000", "Pacientes atendidos"], ["100%", "Foco em periodontia"], ["20+", "Anos de experiência"]].map(([n, l]) => (
            <div key={l}><div className="font-display text-4xl">{n}</div><div className="mt-1 text-sm opacity-80">{l}</div></div>
          ))}
        </div>
      </section>

      <section id="tratamentos" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-4xl">Nossos tratamentos</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">Planos personalizados para cada paciente.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((x) => (
            <article key={x.t} className="rounded-2xl border bg-card p-6">
              <h3 className="text-xl">{x.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sobre" className="bg-secondary">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-4xl">A clínica</h2>
          <p className="mt-4 text-lg text-secondary-foreground">Unimos atendimento especializado e cuidado próximo para promover saúde bucal duradoura.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Prevenção e manutenção", "Tratamento de gengivas e implantes", "Cuidado integrado com a saúde geral", "Mais qualidade de vida"].map((i) => (
              <li key={i} className="rounded-xl bg-card px-4 py-3">• {i}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="unidades" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-4xl">Nossas unidades</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {units.map((u) => (
            <div key={u.city} className="rounded-2xl border bg-card p-8">
              <h3 className="text-2xl">{u.city}</h3>
              <p className="mt-2 text-muted-foreground">{u.addr}</p>
            </div>
          ))}
        </div>
      </section>

      <footer id="contato" className="bg-foreground text-background">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-3">
          <span className="font-display text-2xl">Gengiva Viva</span>
          <p className="text-sm opacity-80">(00) 0000-0000<br />contato@exemplo.com</p>
          <p className="text-sm opacity-80">Seg a sex, 8h–18h</p>
        </div>
      </footer>
    </main>
  );
}
