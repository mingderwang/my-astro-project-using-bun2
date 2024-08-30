
// pages/[...slugs].ts
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { registerOptions } from "../plugins/registerOptions";
import { authenticateOptions } from "../plugins/authenticateOptions";

const app = new Elysia()
  .use(swagger())
  .use(registerOptions)
  .use(authenticateOptions)

export type App = typeof app;

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
export const PATCH = handle;