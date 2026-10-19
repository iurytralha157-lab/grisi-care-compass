import { createFileRoute } from '@tanstack/react-router';
import { pageResponse } from '@/lib/site-pages';

export const Route = createFileRoute('/contato')({
  server: { handlers: {
    GET: () => pageResponse('contato'),
    HEAD: () => pageResponse('contato', true),
  } },
});
