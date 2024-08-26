import { defineMiddleware } from "astro/middleware";
import { TOKEN, PUBLIC_ROUTES } from "./constant";
export const onRequest = defineMiddleware((context, next) => {
  // Ignore auth validation for public routes
  if (PUBLIC_ROUTES.includes(context.url.pathname)) {
    return next();
  }
  console.log(context);
  next();
});
