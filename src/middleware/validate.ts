import { defineMiddleware } from "astro/middleware";

export const validate = defineMiddleware((context, next) => {
  console.log("In validate middleware");
  console.log(context.cookies.get('start-time'))
  return next();
});