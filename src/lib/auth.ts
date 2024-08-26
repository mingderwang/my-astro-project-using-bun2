export async function signUp(username: string) {
    // should be handled in server - start
    // recommend minimum 16 bytes
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    // should be handled in server - end
    var message = ''
    const publicKeyCredential = await navigator.credentials
      .create({
        // publicKey = Web Authentication API
        publicKey: {
          rp: { name: "Passkey Demo" },
          user: {
            id: crypto.getRandomValues(new Uint8Array(32)),
            name: username,
            displayName: username,
          },
          pubKeyCredParams: [
            {
              alg: -7,
              type: "public-key",
            },
            {
              alg: -257,
              type: "public-key",
            },
          ],
          challenge,
        },
      })
      .then((credential) => {
        const result = JSON.stringify({
          status: "OK",
          credential: {
            id: credential!.id,
            rawId: Array.from(new Uint8Array(credential!.rawId)),
            response: {
              attestationObject: new Uint8Array(
                credential!.response.attestationObject
              ),
              clientDataJSON: new Uint8Array(credential!.response.clientDataJSON),
            },
            type: credential!.type,
            transports: credential!.response.getTransports(),
          },
        });
        console.log("Credential created successfully:", credential);
        console.log(result);
        message = result;
        if (!(credential!.response instanceof AuthenticatorAttestationResponse)) {
          throw new TypeError("Unexpected attestation response");
        }
      })
      .catch((err) => {
        console.error("Error creating credential:", err);
        message = "Error from auth.ts";
      });
      return message
  }