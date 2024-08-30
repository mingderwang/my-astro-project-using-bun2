import { Elysia, t } from "elysia";
import { Fido2Lib } from "fido2-lib";
import { generateChallenge } from "../lib/helper";

// could also use one or more of the options below,
// which just makes the options calls easier later on:
const f2l = new Fido2Lib({
  timeout: 60000,
  rpId: "localhost",
  rpName: "Your Company",
  rpIcon: "https://example.com/icon.png",
  challengeSize: 32,
  attestation: "direct",
  cryptoParams: [-7, -257],
  authenticatorAttachment: "cross-platform",
  authenticatorRequireResidentKey: false,
  authenticatorUserVerification: "preferred",
});
export const registerOptions = new Elysia().get(
  "/register/options",
  async ({ body, error }) => {
    const user = {
      id: "JEAmCUIsCNo5sdfKZ8CdlqShia18Ing",
      name: "userasdasdffasd@localhost",
      displayName: "asdf",
    }; // Example user data
    const options = await f2l.attestationOptions({});
    const registrationOptions = {
      ...options,
      user,
      challenge: Buffer.from(options.challenge).toString("base64"),
    };
    console.log(registrationOptions);
    return registrationOptions;
  }
);
