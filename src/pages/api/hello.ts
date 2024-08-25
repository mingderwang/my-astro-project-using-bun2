import type { APIContext, APIRoute } from "astro";
export const POST: APIRoute = async (context: APIContext) => {
  // Extract data from the request body
  const body = await context.request.json();
  context.cookies.set('start-time', '31', { path: '/' });
  // Simple response
  const responseBody = {
    message: "Hello, World!",
    receivedData: body,
  };
  return new Response(JSON.stringify(responseBody), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};