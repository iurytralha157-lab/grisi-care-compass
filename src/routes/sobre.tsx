import { createFileRoute } from '@tanstack/react-router';
import { pageResponse } from '@/lib/site-pages';

export const Route = createFileRoute('/sobre')({
  server: { handlers: {
    GET: () => pageResponse('sobre'),
    HEAD: () => pageResponse('sobre', true),
  } },
});
