import { Elysia, t } from "elysia";
import { Fido2Lib } from "fido2-lib";

// could also use one or more of the options below,
// which just makes the options calls easier later on:
const f2l = new Fido2Lib({
  timeout: 42,
  rpId: "localhost",
  rpName: "ACME",
  rpIcon: "https://localhost/logo.png",
  challengeSize: 128,
  attestation: "none",
  cryptoParams: [-7, -257],
  authenticatorAttachment: "platform",
  authenticatorRequireResidentKey: false,
  authenticatorUserVerification: "preferred",
});
export const authenticateOptions = new Elysia().get(
  "/authenticate/options",
  async ({ body, error }) => {
    const challenge = await f2l.assertionOptions();
    const registrationOptions = {
      ...challenge,
      challenge: Buffer.from(challenge.challenge).toString("base64"),
      allowCredentials: [
        {
          id: Buffer.from("credentialId").toString("base64"),
          type: "public-key",
          transports: ["hybrid", "internal", "usb", "nfc", "ble"],
        },
      ],
    };
    console.log(registrationOptions);
    return registrationOptions;
  }
);
