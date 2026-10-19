import { createFileRoute } from '@tanstack/react-router';
import { pageResponse } from '@/lib/site-pages';

export const Route = createFileRoute('/blog')({
  server: { handlers: {
    GET: () => pageResponse('blog'),
    HEAD: () => pageResponse('blog', true),
  } },
});
