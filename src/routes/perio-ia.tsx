import { createFileRoute } from "@tanstack/react-router";
import { pageResponse } from "@/lib/site-pages";

export const Route = createFileRoute("/perio-ia")({
  server: {
    handlers: {
      GET: () => pageResponse("perioIa"),
      HEAD: () => pageResponse("perioIa", true),
    },
  },
});
