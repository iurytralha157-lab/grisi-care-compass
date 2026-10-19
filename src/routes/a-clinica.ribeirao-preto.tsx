import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/a-clinica/ribeirao-preto')({
  server: { handlers: { GET: () => new Response(null, { status: 301, headers: { Location: '/sobre/' } }) } },
});
