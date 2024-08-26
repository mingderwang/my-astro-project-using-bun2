
// pages/[...slugs].ts
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { userProfile } from "../plugins/userProfile";
import { counter } from "../plugins/counter";

const app = new Elysia()
  .use(swagger())
  .use(userProfile)
  .use(counter)

export type App = typeof app;

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
export const PATCH = handle;