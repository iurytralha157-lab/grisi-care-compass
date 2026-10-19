<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Instituto Grisi — preservar a apresentação aprovada

Estas instruções se aplicam a todo o repositório e a qualquer IA ou pessoa que
trabalhe nele. Leia também [docs/branding-e-estrutura.md](docs/branding-e-estrutura.md)
antes de propor alterações. O [comando para outras IAs](docs/comando-lovable.txt)
reproduz as regras essenciais em um texto que pode ser colado nas instruções do
projeto.

## Regra principal: propor, confirmar, só então editar

A estrutura e a identidade visual atuais foram aprovadas pelo responsável pelo
site. **Nunca altere diretamente a apresentação nem crie uma página sem antes
apresentar uma proposta concreta e receber confirmação explícita.** Isso inclui
texto visível, cabeçalho, navegação, logo, hero, animações, fotos, cores, fontes,
botões, blocos, rodapé, popups, espaçamentos, comportamento mobile e ordem das
seções. Um pedido inicial de alteração deve gerar primeiro uma proposta; não
autoriza uma reformulação nem mudanças adicionais.

Antes de editar:

1. Leia os arquivos e registre a página e o componente envolvidos, incluindo o
   estado desktop e mobile. Não faça alterações de apresentação nesta etapa.
2. Descreva exatamente o que pretende mudar, em quais arquivos, o que será
   preservado e os efeitos possíveis em outras páginas, telas e interações.
3. Mostre a referência atual e, quando útil, um rascunho separado da aplicação.
   Explique como vai comparar o resultado e testar a regressão.
4. Pergunte: **“Posso aplicar exatamente esta alteração, mantendo o restante da
   estrutura e do branding atual?”** Aguarde a resposta. Silêncio, tempo decorrido,
   uma hipótese ou a aprovação de outra tarefa não são confirmação.
5. Depois da confirmação, implemente somente o escopo aprovado. Qualquer exceção
   ou ampliação exige outra proposta e confirmação. Não repita a pergunta se a
   pessoa já aprovou explicitamente essa mesma proposta e esse mesmo escopo.

Leitura, diagnóstico, capturas, testes e auditorias sem mudanças na apresentação
não exigem confirmação. A manutenção destas instruções, quando solicitada, também
não exige aprovar novamente o próprio pedido de documentação. Uma auditoria de
responsividade não autoriza aplicar correções visuais: apresente os problemas e a
correção proposta antes de editar.

## Preservar o padrão existente

- A fonte de verdade é a última versão aprovada no repositório, inicialmente a
  cópia de 19/10/2026 no commit `bad81ca`, e suas alterações posteriores aprovadas.
  O site externo pode mudar; não sincronize uma nova aparência automaticamente.
- Não redesenhe, modernize, simplifique, troque a identidade ou aplique templates
  genéricos. Não substitua a apresentação por componentes de uma biblioteca.
- Novas páginas devem partir da página existente mais próxima. Preserve
  cabeçalho, topo interno, rodapé, paleta, tipografia por componente, botões,
  fundos, blocos, espaçamentos e comportamento responsivo. Use Contato/Blog como
  referência de topo interno quando pertinente. Um formato diferente só pode ser
  usado se proposto e aprovado explicitamente como exceção.
- Preserve as logos, fotos, fontes e certificados locais; o WhatsApp, os links,
  as animações do cabeçalho, carrosséis, popups e downloads existentes.
- A navegação pública permanece Home, Sobre, Informações ao paciente e Contato,
  com agendamento pelo WhatsApp. Brasília permanece removida. O Blog permanece
  fora do menu e com `noindex` até uma autorização específica para mudar isso.
- Preserve as diferenças desktop/tablet/mobile. Não force a versão desktop no
  celular nem oculte conteúdo ou corte a página para mascarar transbordamento.

## Arquitetura e verificação

- Este projeto é TanStack Start/Vite com documentos completos em
  `src/data/site/*.html`, não é o Vimob CRM nem um projeto Next.js/Laravel.
  Preserve o mecanismo atual de rotas, entrega HTML e exportação estática.
- A aparência aprovada vem dos documentos e dos assets locais em `public/`.
  Os estilos Elementor e as classes/IDs/atributos usados pelos scripts precisam
  continuar compatíveis. `src/styles.css` não define o branding desses documentos.
- Não edite `src/components/ui/`, dependências ou assets minificados de terceiros
  para resolver uma tarefa visual sem relação com eles. Evite refatorações,
  formatação global, atualização de pacotes ou substituição da stack fora do
  escopo aprovado. Prefira correções pequenas e delimitadas quando autorizadas.
- Valide desktop, tablet e mobile, inclusive os limites de breakpoint, menus,
  scroll do cabeçalho, carrosséis, popups, downloads e links afetados. Registre
  dimensões e resultados reais; não declare compatibilidade universal sem prova.
- Faça somente commits e envios ao GitHub autorizados no escopo da tarefa.
  Publicação, hospedagem, domínio e serviços externos exigem autorização própria.
  Preserve o bloco LOVABLE acima e nunca reescreva o histórico remoto.

Segundo a [documentação do Lovable](https://docs.lovable.dev/features/knowledge),
o editor lê automaticamente o `AGENTS.md` da raiz. Estas são instruções de
trabalho, não um bloqueio técnico universal. Não afirme que outra IA as carregou
ou que as configurações do editor foram alteradas sem verificar isso na ferramenta.
