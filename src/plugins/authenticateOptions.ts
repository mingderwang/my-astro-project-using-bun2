import { Elysia, t } from "elysia";
import { Fido2Lib } from "fido2-lib";

// could also use one or more of the options below,
// which just makes the options calls easier later on:
const f2l = new Fido2Lib({
  timeout: 42,
  rpId: "example.com",
  rpName: "ACME",
  rpIcon: "https://example.com/logo.png",
  challengeSize: 128,
  attestation: "none",
  cryptoParams: [-7, -257],
  authenticatorAttachment: "platform",
  authenticatorRequireResidentKey: false,
  authenticatorUserVerification: "required",
});
export const authenticateOptions = new Elysia().get(
  "/authenticate/options",
  async ({ body, error }) => {
    const registrationOptions = await f2l.assertionOptions()
    console.log(registrationOptions);
    return registrationOptions;
  }
);
