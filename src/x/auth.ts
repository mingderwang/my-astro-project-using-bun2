import { errors, jwtVerify } from "jose";
import { defineMiddleware } from "astro/middleware";
import { TOKEN, PUBLIC_ROUTES } from "../constant";
import type { APIContext, MiddlewareNext } from "astro";

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);

function encodeToBase64(secret: string) { 
  const encoder = new TextEncoder(); 
  const keyBytes = encoder.encode(secret); 
  return Buffer.from(keyBytes).toString('base64'); 
}

const verifyAuth = async (token?: string) => {
  console.log(encodeToBase64(import.meta.env.JWT_SECRET_KEY)); 
  console.log(import.meta.env.JWT_SECRET_KEY)
  console.log('required secrect -> ' + secret);
  if (!token) {
    return {
      status: "unauthorized",
      msg: "please pass a request token",
    } as const;
  }

  try {
    const jwtVerifyResult = await jwtVerify(token, secret);

    return {
      status: "authorized",
      payload: jwtVerifyResult.payload,
      msg: "successfully verified auth token",
    } as const;
  } catch (err) {
    if (err instanceof errors.JOSEError) {
      return { status: "error", msg: err.message } as const;
    }

    console.debug(err);
    return { status: "error", msg: "could not validate auth token" } as const;
  }
};

export const auth = defineMiddleware(async (context, next) => {
  // Ignore auth validation for public routes

  const basicAuth = context.request.headers.get("authorization");
  console.log(basicAuth)
  // Basic YWRtaW46YWRtaW4=
  if (basicAuth) {
    // Get the auth value from string "Basic authValue"
    const authValue = basicAuth.split(" ")[1] ?? "username:password";

    console.log(context.cookies);
    console.log(context.url.pathname);
    if (PUBLIC_ROUTES.includes(context.url.pathname)) {
      return next();
    }
    // alternative way to get token
    // const token = context.cookies.get(TOKEN)?.value;
    const token = authValue;
    console.log('this token -> ' + token);
    const validationResult = await verifyAuth(token);

    console.log(validationResult);

    switch (validationResult.status) {
      case "authorized":
        return next();

      case "error":
      case "unauthorized":
        if (context.url.pathname.startsWith("/api/")) {
          return new Response(
            JSON.stringify({ message: validationResult.msg }),
            {
              status: 401,
            }
          );
        }
        // otherwise, redirect to the root page for the user to login
        else {
          return Response.redirect(new URL("/", context.url));
        }

      default:
        return Response.redirect(new URL("/", context.url));
    }
  }
  
return new Response(JSON.stringify({ "message": 'unauthorized' }), {
  status: 401,
});
  /* 

  curl --location 'localhost:4321/api/hello' \
--header 'Content-Type: application/json' \
--header 'Cookie: start-time=31' \
--data '{ "a": 1 }'

{"message":"Hello, World!","receivedData":{"a":1}}

*/
});
