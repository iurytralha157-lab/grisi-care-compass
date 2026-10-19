import { createFileRoute } from '@tanstack/react-router';
import { pageResponse } from '@/lib/site-pages';

export const Route = createFileRoute('/informacoes-ao-paciente')({
  server: { handlers: {
    GET: () => pageResponse('paciente'),
    HEAD: () => pageResponse('paciente', true),
  } },
});
