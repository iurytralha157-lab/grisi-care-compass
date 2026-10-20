import { createFileRoute } from "@tanstack/react-router";
import { pageResponse } from "@/lib/site-pages";

export const Route = createFileRoute("/cursos")({
  server: {
    handlers: {
      GET: () => pageResponse("cursos"),
      HEAD: () => pageResponse("cursos", true),
    },
  },
});
