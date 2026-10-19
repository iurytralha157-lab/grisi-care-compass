# Contrato de apresentação do Instituto Grisi

Este documento registra a estrutura e o branding aprovados e complementa o
`AGENTS.md` da raiz. A política foi solicitada em 19/10/2026 para evitar que uma
edição pontual descaracterize o site. Não constitui autorização para uma alteração
visual. A referência inicial é o commit `bad81ca`; alterações posteriores só
passam a compor a referência quando aprovadas pelo responsável pelo projeto.

## Confirmação obrigatória antes da edição

Para qualquer mudança na apresentação ou criação de página, a IA deve primeiro
inspecionar o estado atual e apresentar uma proposta com:

- página, componente e arquivos que serão alterados;
- mudança exata solicitada, sem ampliações automáticas;
- elementos que serão preservados, com atenção ao cabeçalho, hero e mobile;
- possíveis efeitos nas outras páginas, em interações e nos tamanhos de tela;
- captura do estado atual e rascunho separado quando necessário para explicar a
  mudança; um rascunho não deve substituir arquivos usados pelo site;
- verificações previstas e critério de comparação antes/depois.

Encerre a proposta perguntando: **“Posso aplicar exatamente esta alteração,
mantendo o restante da estrutura e do branding atual?”** Só comece a editar a
apresentação depois de receber confirmação explícita. A aprovação é restrita ao
escopo proposto. Uma proposta já aprovada não precisa de confirmação duplicada;
uma mudança adicional precisa. Não trate ausência de resposta como aprovação.

Exemplo: “mude o cabeçalho” exige explicar quais partes do cabeçalho mudarão e
perguntar antes de implementar. Isso não permite alterar animação, logo, menu,
hero ou rodapé junto. “Crie uma página” exige propor a referência existente, seu
conteúdo e destino antes de criar a rota ou o documento.

Consultas, auditorias, capturas e testes sem mudanças na apresentação podem ser
feitos diretamente. Se uma auditoria encontrar um defeito, apresente a proposta
da correção e aguarde confirmação. Documentar a política quando solicitado não
exige um novo pedido de autorização para o mesmo trabalho de documentação.

## Fonte de verdade e arquivos

| Área | Referência versionada |
| --- | --- |
| Documentos completos das páginas | `src/data/site/*.html` |
| Rotas e redirecionamentos | `src/routes/` e `src/lib/site-pages.ts` |
| Paleta e tipografia do kit original | `public/wp-content/uploads/elementor/css/post-13.css` |
| Cabeçalho compartilhado | HTML `data-elementor-id="25"` e `post-25.css` |
| Rodapé compartilhado | HTML `data-elementor-id="37"` e `post-37.css` |
| Home, heros e carrosséis | `home.html` e `post-17.css` |
| Topo e blocos de Contato/Blog | `contato.html`, `blog.html` e `post-304.css` |
| Movimento e comportamento | `data-settings`, classes e scripts locais referenciados nos HTML |
| Fontes, logos, fotografias e certificados | `public/wp-content/` e `public/_external/` |
| Exportação e prévia estática | `scripts/export-static.mjs` e `scripts/preview-static.mjs` |

Os nomes `post-*.css` na tabela estão em
`public/wp-content/uploads/elementor/css/`. A tabela identifica referências, não
autoriza alterar arquivos. O código local aprovado prevalece sobre uma aparência
futura de `institutogrisi.com.br` ou sobre sugestões de um template.

O projeto entrega documentos HTML completos por TanStack Start/Vite e também
exporta páginas estáticas. Não converter a implementação para Next.js, Laravel,
um tema novo ou outro mecanismo de renderização durante uma tarefa de conteúdo
ou apresentação. As regras de arquitetura do Vimob CRM não descrevem esta stack.

Não usar os tokens legados de `src/styles.css` como identidade das páginas Grisi.
Os documentos preservados possuem seus próprios estilos e fontes. Não remover
classes, IDs, atributos `data-*`, ordem de carregamento ou dependências Elementor
sem mapear as consequências e obter aprovação para essa mudança.

## Paleta e tipografia verificadas

Os valores abaixo foram lidos no CSS local aprovado. Não são uma ordem para
uniformizar componentes que já tenham uma exceção no CSS.

| Token do kit Elementor | Valor | Uso de referência |
| --- | --- | --- |
| `--e-global-color-secondary` | `#008585` | Cor institucional, fundos e CTAs conforme o componente |
| `--e-global-color-accent` | `#008585` | Acento institucional |
| `--e-global-color-18457cd` | `#008585` | Variação nomeada da mesma cor |
| `--e-global-color-0d99f5a` | `#08A5A5` | Destaques e estados de interação definidos localmente |
| `--e-global-color-3eec7ca` | `#FFFFFF` | Branco de fundos, textos e botões conforme o componente |
| `--e-global-color-6e0fe5d` | `#EEFFFD` | Fundo claro do kit |
| `--e-global-color-primary` | `#7A7A7A` | Cinza definido no kit; preservar o uso de cada seletor |
| `--e-global-color-text` | `#7A7A7A` | Texto base |
| `--e-global-color-ad80077` | `#7A7A7A` | Variação nomeada do cinza |

As regras específicas também usam outros cinzas, preto, transparências e cores
de imagens. Reutilize os estilos do bloco de referência em vez de substituir
todos os valores pela tabela.

O kit define Inter para títulos e vários botões e Heebo para o texto base. Há
regras específicas com Inter, Open Sans, Montserrat, Lato e outras variações
existentes. Preserve a fonte, peso, tamanho, altura de linha e breakpoint de cada
componente. Não aplicar uma fonte única a todo o site.

No kit, o título primário usa 48 px em desktop, 36 px em tablet e 32 px em mobile;
o secundário usa 32 px e 24 px em mobile; o texto base usa 16 px e 14 px em mobile.
São valores de referência sujeitos aos overrides atuais de cada elemento.

## Cabeçalho, hero, botões e blocos

- Preserve o cabeçalho transparente/inicial e o estado ao rolar, seu posicionamento,
  logo, cores, transições, desfoque e menu mobile. A folha do plugin sticky header
  contém transições de `0.4s ease-in-out`; o CSS do cabeçalho contém desfoque de
  `20px`. Não trocar o conjunto por um header genérico fixo.
- Preserve a composição do hero, fotografias, recortes, alinhamento, altura,
  overlays e versões específicas para mobile. O hero da Home já troca fundos
  no breakpoint mobile: `Page-5.webp`, `Page-3.webp`, `Page-7.webp`, `Page-2.webp`
  em `uploads/2025/03/` têm regras com `3.png`, `2.png`, `4.png`, `1.png` no mobile.
  Não impor a imagem de desktop ao celular.
- Preserve o comportamento e a sequência dos carrosséis, controles e animações
  de entrada. Não remover movimento ou trocar o tempo de animação como efeito
  colateral de uma mudança de texto ou responsividade.
- Não existe um único raio de botão para todos os componentes. O botão do
  cabeçalho tem fundo branco, texto institucional, raio de 4 px e estado de
  interação turquesa. Há botões da Home com raio de 5 px e o padrão do kit com
  raio de 50 px. Reutilize o botão correspondente ao contexto, mantendo padding,
  borda, fonte, cores normal/hover/focus e comportamento.
- Preserve fundos, divisões, largura dos contêineres, margens, respiros, imagens,
  bordas e raios dos blocos por seção. Não converter os blocos em cards genéricos
  nem ajustar toda a escala de espaçamento durante uma tarefa pontual.
- Preserve os popups e seus gatilhos, fechamento, conteúdo, sobreposição e scroll;
  certificados e downloads; links de WhatsApp, mapas, redes sociais e podcasts.
  Não enviar mensagens nem dados a serviços externos para testar um link.
- Preserve rodapé, política de privacidade, crédito de desenvolvimento e logos
  existentes. Cabeçalho e rodapé estão repetidos nos documentos: uma alteração
  aprovada em elemento comum precisa ser conferida em todas as páginas afetadas.

## Novas páginas e navegação

A navegação pública aprovada é Home, Sobre, Informações ao paciente e Contato.
O agendamento usa WhatsApp. Sobre corresponde à unidade de Ribeirão Preto.
Brasília foi removida e não deve reaparecer em menus, conteúdo, contatos, mapas
ou novos blocos. Nomes antigos de assets não constituem autorização para publicar
conteúdo de Brasília.

O Blog já existe em `/blog`, no mesmo padrão visual, fora do menu e com `noindex`.
Não adicionar o Blog à navegação nem mudar a indexação sem pedido e confirmação
específicos. Política de privacidade permanece acessível pelo rodapé.

Ao propor uma página nova, selecione a página existente mais próxima e diga qual
será usada como referência. Para uma página interna institucional, use o topo de
Contato/Blog quando for o modelo pertinente. Reutilize cabeçalho, rodapé, estilos,
fontes, botões, blocos e comportamento mobile desse modelo. Proponha separadamente
o conteúdo, a rota, os links e a indexação. A criação não autoriza colocá-la no
menu automaticamente. Um formato diferente exige uma exceção descrita e aprovada.

## Responsividade e verificação de uma mudança aprovada

Uma verificação precisa preservar a aparência e identificar falhas reais:

- conferir 320, 360, 375, 390, 430, 768, 1024, 1280 e 1440 px, além dos dois lados
  dos breakpoints existentes de 767/768 e 1024/1025 px quando afetados;
- conferir rotação/orientação e altura da tela quando houver menu, hero ou popup;
- verificar ausência de scroll horizontal indevido, texto cortado, sobreposição,
  imagens distorcidas, botões inacessíveis e conteúdo bloqueado pelo cabeçalho;
- abrir e fechar menu mobile e popups; rolar a página para verificar o cabeçalho;
  conferir carrosséis, downloads, rotas e alvos dos links afetados;
- comparar capturas antes/depois com o mesmo tamanho, posição de scroll e estado
  de carrossel; separar mudanças intencionais de regressões;
- executar os testes e o build adequados à alteração. Passar build não comprova
  responsividade, e uma captura isolada não comprova todas as interações;
- relatar dimensões, navegador e interações realmente verificados, problemas
  restantes e limitações. Não prometer funcionamento em 100% dos dispositivos
  existentes a partir de uma amostra de telas.

Não corrigir transbordamento apenas com `overflow-x: hidden`, esconder conteúdo,
reduzir indiscriminadamente fontes ou reordenar toda a página. Uma correção
precisa ter causa identificada, escopo mínimo e confirmação antes de ser aplicada.

## Limites de execução e alcance das instruções

Não atualizar pacotes, reformatar todo o projeto, editar bibliotecas de UI,
substituir dependências ou modificar assets minificados de terceiros como efeito
colateral de um ajuste de apresentação. Preserve alterações locais de outras
pessoas. GitHub, publicação, hospedagem, domínio e serviços externos só devem ser
alterados dentro do escopo autorizado. Nunca faça force push ou reescreva commits
publicados; mantenha o bloco LOVABLE do `AGENTS.md`.

Segundo a [documentação oficial do Lovable sobre Knowledge](https://docs.lovable.dev/features/knowledge),
o Lovable lê automaticamente o `AGENTS.md` da raiz. Esse arquivo contém as regras
principais para que a política acompanhe o repositório. Como opção adicional, o
texto de `docs/comando-lovable.txt` pode ser colado em Settings → Knowledge do
projeto ou nas instruções persistentes de outro editor. A cópia manual é opcional,
não uma condição para usar a política no Lovable.

Esta política orienta ferramentas que a leem; ela não é um bloqueio técnico
universal nem garante o comportamento de qualquer IA. A leitura automática do
`AGENTS.md` é uma capacidade declarada pelo fornecedor. Não afirmar que outra
ferramenta já carregou o contrato, ou que as configurações de Knowledge foram
salvas, sem verificar essa ação na ferramenta utilizada.
