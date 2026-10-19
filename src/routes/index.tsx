import { createFileRoute } from '@tanstack/react-router';
import { pageResponse } from '@/lib/site-pages';

export const Route = createFileRoute('/')({
  server: { handlers: {
    GET: () => pageResponse('home'),
    HEAD: () => pageResponse('home', true),
  } },
});
