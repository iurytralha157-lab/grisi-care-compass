import { createFileRoute } from '@tanstack/react-router';
import { pageResponse } from '@/lib/site-pages';

export const Route = createFileRoute('/politica-de-privacidade')({
  server: { handlers: {
    GET: () => pageResponse('privacidade'),
    HEAD: () => pageResponse('privacidade', true),
  } },
});
