# Instituto Grisi

Apresentação do [Instituto Grisi](https://institutogrisi.com.br/), copiada da versão pública consultada em 19/10/2026 e adaptada para a unidade de Ribeirão Preto. O projeto mantém a estrutura TanStack Start/Vite do repositório conectado ao [Lovable](https://lovable.dev/projects/e6d08911-69ab-47e3-bdff-14decb0f7e00).

## Páginas

| Endereço | Conteúdo |
| --- | --- |
| `/` | Home |
| `/sobre` | Conteúdo original da unidade Ribeirão Preto, apresentado como Sobre |
| `/informacoes-ao-paciente` | Informações ao paciente e links dos podcasts |
| `/contato` | Contato, localização e orientações para chegar a Ribeirão Preto |
| `/politica-de-privacidade` | Política original, acessível pelo rodapé |
| `/blog` | Página preparada no mesmo padrão visual, fora do menu e com `noindex` |

O endereço antigo `/a-clinica/ribeirao-preto/` redireciona para `/sobre`. A unidade Brasília foi retirada da navegação, do carrossel da Home, dos contatos, dos mapas e dos textos que mencionavam as duas unidades. As demais alterações de texto se limitam à identificação de Sobre e aos ajustes necessários para essa retirada.

## Como funciona

As rotas de servidor do TanStack retornam documentos HTML completos. Isso preserva a marcação, os seletores, os estilos responsivos e os scripts Elementor usados na apresentação original, incluindo cabeçalho, animações, carrosséis e popups. A renderização não usa iframe e não exige instalar WordPress ou reconstruir seu banco de dados.

O build também exporta os mesmos seis documentos, sem alterar seu conteúdo, como páginas estáticas em `.output/public` e em `dist/client`, quando esse diretório é gerado pelo ambiente. Os assets locais acompanham o build. O TanStack continua disponível para desenvolvimento e execução no servidor; a exportação permite hospedar a apresentação estática.

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

- `src/data/site/*.html`: documentos das seis páginas, incluindo conteúdo, cabeçalho, rodapé e popups.
- `src/lib/site-pages.ts`: associação dos documentos às respostas HTML e cabeçalhos HTTP.
- `src/routes/`: endereços, handlers GET/HEAD e redirecionamentos.
- `public/wp-content/` e `public/wp-includes/`: estilos, scripts e mídia da apresentação original.
- `public/_external/`: fontes externas copiadas para servir localmente.
- `scripts/export-static.mjs` e `scripts/preview-static.mjs`: exportação dos documentos e servidor local de prévia.

Ao editar a apresentação, preserve as classes e os atributos usados pelos estilos e scripts Elementor. Alterações em um documento não atualizam automaticamente o cabeçalho ou o rodapé das outras páginas. Confira o resultado em desktop e mobile, além dos menus, links, carrosséis e popups.

## GitHub e Lovable

O histórico Git e a configuração de conexão com o Lovable são preservados. As mudanças são feitas por commits normais, sem reescrever o histórico ou usar force push. O projeto continua disponível no editor Lovable pelo link acima; a publicação depende do fluxo de hospedagem escolhido para o projeto.
