# Instituto Grisi

Apresentação do [Instituto Grisi](https://institutogrisi.com.br/), copiada da versão pública consultada em 19/10/2026 e adaptada para a unidade de Ribeirão Preto. O projeto mantém a estrutura TanStack Start/Vite do repositório conectado ao [Lovable](https://lovable.dev/projects/e6d08911-69ab-47e3-bdff-14decb0f7e00).

## Regras para editar

Leia o [AGENTS.md](AGENTS.md) e o [contrato de branding e estrutura](docs/branding-e-estrutura.md) antes de propor uma alteração. A apresentação atual está aprovada: qualquer edição visual, de conteúdo ou criação de página deve ser proposta e confirmada pelo responsável antes da implementação. Novas páginas seguem o mesmo modelo e branding, salvo exceção aprovada. O [comando reutilizável](docs/comando-lovable.txt) pode ser copiado para outras IAs.

A [auditoria de responsividade de 19/10/2026](docs/auditoria-responsividade-2026-10-19.json) registra 72 combinações de página/tela e quatro problemas confirmados. Essa auditoria descreve a versão daquela data. Suas quatro correções não integram a proposta de navegação aprovada em 20/10/2026 e continuam aguardando autorização própria; o registro anterior não comprova a validação da implementação nova.

## Páginas

| Endereço | Conteúdo |
| --- | --- |
| `/` | Home |
| `/sobre/` | Clínica de Periodontia, novo nome de Sobre; mesma URL e conteúdo de Ribeirão Preto |
| `/informacoes-ao-paciente/` | Conteúdo e podcasts existentes; Textos (`#textos`) e Folders para baixar (`#folders`) |
| `/cursos/` | Presenciais (`#presenciais`) e Online (`#online`); sem materiais, “Em breve.” e `noindex, follow` |
| `/perio-ia/` | Apresentação (`#apresentacao`), Guia Rápido (`#guia-rapido`) e Filmes (`#filmes`); sem materiais, “Em breve.” e `noindex, follow` |
| `/contato` | Contato, localização e orientações para chegar a Ribeirão Preto |
| `/politica-de-privacidade` | Política original, acessível pelo rodapé |
| `/blog` | Página preparada no mesmo padrão visual, fora do menu e com `noindex` |

O menu aprovado em 20/10/2026 tem Home, Clínica de Periodontia, Informações ao Paciente, Cursos, Perio IA e Contato, nesta ordem, além do Agendamento pelo WhatsApp. As divisões internas são acessadas por botões na própria página, sem dropdowns no cabeçalho nem uma página separada para cada seção. O menu compacto existente é usado até 1200 px, inclusive; a navegação horizontal começa em 1201 px, preservando a animação e os estados de scroll do cabeçalho.

O endereço antigo `/a-clinica/ribeirao-preto/` continua redirecionando para `/sobre/`. Clínica de Periodontia preserva o conteúdo clínico, equipe, tratamentos, imagens e contatos dessa página. A unidade Brasília foi retirada da navegação, do carrossel da Home, dos contatos, dos mapas e dos textos que mencionavam as duas unidades e permanece removida. Blog continua fora do menu. Política de Privacidade, créditos, certificados GBT e podcasts são preservados.

Cursos e Perio IA usam o mesmo padrão de topo interno, botões, blocos, tipografia e rodapé de Contato/Blog. As seções novas sem materiais mostram “Em breve.”, inclusive folders sem arquivos. Não há inscrições, preços, datas, PDFs, vídeos ou ferramenta de IA inventados. As duas páginas novas permanecem com `noindex, follow` até receberem conteúdo fornecido e aprovado; materiais e mudanças de indexação exigem autorização específica.

## Como funciona

As rotas de servidor do TanStack retornam documentos HTML completos. Isso preserva a marcação, os seletores, os estilos responsivos e os scripts Elementor usados na apresentação original, incluindo cabeçalho, animações, carrosséis e popups. A renderização não usa iframe e não exige instalar WordPress ou reconstruir seu banco de dados.

O build também exporta os mesmos oito documentos, sem alterar seu conteúdo, como páginas estáticas em `.output/public` e em `dist/client`, quando esse diretório é gerado pelo ambiente. Os assets locais acompanham o build. O TanStack continua disponível para desenvolvimento e execução no servidor; a exportação permite hospedar a apresentação estática.

CSS, JavaScript, fontes, logos, fotografias e certificados estão versionados localmente em `public/`. Os scripts de analytics do site original foram removidos; essa remoção não altera a apresentação.

Esta é uma cópia da apresentação pública. O painel administrativo, o banco de dados e os serviços de backend do WordPress não foram copiados. A página de contato original não tinha formulário. WhatsApp, mapas, rotas, redes sociais, podcasts e a página externa da certificação GBT mantêm os destinos originais e dependem desses serviços externos.

O popup GBT mantém os dois certificados. As imagens completas em WebP também estão disponíveis para download em `public/wp-content/uploads/2024/02/Certificado-GBT.webp` e `Certificado12.webp`.

## Desenvolvimento

Com Node.js e npm disponíveis:

```sh
npm install
npm run dev
```

Use o endereço local informado pelo Vite. Para gerar a versão de produção e executar os testes:

```sh
npm run build
npm test
```

O comando `npm run preview` serve a exportação existente com Node.js, sem recompilar e sem depender da prévia Nitro/Cloudflare. Se ainda não houver build, ele orienta a executá-lo. Host e porta podem ser definidos, por exemplo: `npm run preview -- --host 127.0.0.1 --port 4174`. Os comandos acima documentam o fluxo de desenvolvimento; a criação do build não publica o site.

## Onde editar

- `src/data/site/*.html`: documentos das oito páginas, incluindo conteúdo, cabeçalho, rodapé e popups.
- `src/lib/site-pages.ts`: associação dos documentos às respostas HTML e cabeçalhos HTTP.
- `src/routes/`: endereços, handlers GET/HEAD e redirecionamentos.
- `public/grisi-navigation.css`: ajustes delimitados da navegação aprovada e das seções novas, preservando os estilos originais de terceiros.
- `public/wp-content/` e `public/wp-includes/`: estilos, scripts e mídia da apresentação original.
- `public/_external/`: fontes externas copiadas para servir localmente.
- `public/404.html` e `public/_redirects`: tratamento de URLs inexistentes e redirecionamentos na publicação estática do Pages.
- `scripts/export-static.mjs` e `scripts/preview-static.mjs`: exportação dos documentos e servidor local de prévia.

Ao editar a apresentação, preserve as classes e os atributos usados pelos estilos e scripts Elementor. Alterações em um documento não atualizam automaticamente o cabeçalho ou o rodapé das outras páginas. Confira o resultado em desktop e mobile, além dos menus, links, carrosséis e popups.

## GitHub, Lovable e Cloudflare Pages

O histórico Git e a configuração de conexão com o Lovable são preservados. As mudanças são feitas por commits normais, sem reescrever o histórico ou usar force push. O projeto continua disponível no editor Lovable pelo link acima.

Em 21/10/2026, o responsável autorizou a integração oficial do GitHub restrita a este repositório e a publicação automática da `main` no projeto Cloudflare Pages `grisi-care-compass`, em seu endereço `pages.dev`. A configuração aprovada é:

| Campo | Valor |
| --- | --- |
| Repositório | `iurytralha157-lab/grisi-care-compass` |
| Branch de produção | `main` |
| Framework preset | `None` |
| Build command | `npm ci && npm test && npm run build` |
| Build output directory | `.output/public` |
| `NODE_VERSION` | `24` |
| `SKIP_DEPENDENCY_INSTALL` | `1` |
| `NITRO_PRESET` | `cloudflare-module` |

Depois da aprovação das alterações e das checagens pertinentes, o commit e push para `main` disparam a publicação automática no Pages. Essa publicação integra o fluxo já autorizado e não exige uma confirmação de deploy adicional para o mesmo escopo. As regras de proposta e confirmação antes de editar aparência, conteúdo ou criar páginas continuam valendo. DNS, domínio próprio, novos serviços, ampliação de permissões e outros destinos de publicação exigem autorização específica.

`public/404.html` é uma página com o branding de Contato/Blog e `noindex, follow`; copiada para a raiz da saída estática, permite que o Pages trate URLs inexistentes como 404 e evita o fallback SPA. `public/_redirects` mantém os dois redirecionamentos permanentes necessários na hospedagem estática:

```text
/a-clinica/ribeirao-preto /sobre/ 301
/a-clinica/ribeirao-preto/ /sobre/ 301
```

Esta seção registra a autorização e a configuração do fluxo. Um push ou build local não comprova que uma implantação terminou. Para relatar sucesso de cada publicação, confira o estado no Pages, o commit implantado e a URL de destino, além das respostas reais das páginas, assets, redirects e 404.
