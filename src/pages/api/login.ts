
// src/pages/api/login.ts 

import { nanoid } from "nanoid";
import { SignJWT } from "jose";
import type { APIRoute } from "astro";
import { TOKEN } from "../../constant";

// The token secret. Note the environment variable "JWT_SECRET_KEY
// @see https://docs.astro.build/en/guides/environment-variables/
const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);

export const POST: APIRoute = async (ctx) => {
  try {
    // Create the token 
    // @see https://github.com/panva/jose
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    // set JWT as a cookie 
    ctx.cookies.set(TOKEN, token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours in seconds
    });

    // return a successful response
    return new Response(
      JSON.stringify({
        message: "You're logged in!",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.debug(error);

    return new Response(
      JSON.stringify({
        message: "Login failed",
      }),
      {
        status: 500,
      }
    );
  }
};