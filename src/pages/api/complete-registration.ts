// src/pages/api/signup.ts
import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json(); // Get the JSON body from the request
    console.log("Received data:", body);

    return new Response(
      JSON.stringify({
        message: "Data received successfully",
        receivedData: body,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
