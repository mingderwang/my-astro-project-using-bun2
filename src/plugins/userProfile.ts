import { Elysia, t } from "elysia";

export const userProfile = new Elysia().post(
  "/user/profile",
  ({ body, error }) => {
    if (body.age < 18) return error(400, "Oh no");

    if (body.name === "Nagisa") return error(418);

    return body;
  },
  {
    body: t.Object({
      name: t.String(),
      age: t.Number(),
    }),
  }
);
