// registration.ts
export async function registerUser() {
  // Fetch registration options from your server
  const response = await fetch("/register/options", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "ming" }),
  });
  const registrationOptions = await response.json();
  const publicKeyOptions = {
    challenge: new Uint8Array([/* challenge bytes from the server */]),
    rp: {
      name: "Example Corporation", // The name of your organization or service
      id: "localhost"           // The domain of your website
    },
    user: {
      id: new Uint8Array([/* user ID bytes */]), // Unique user ID
      name: "user@localhost", // User's email or username
      displayName: "John Doe"   // User's display name
    },
    pubKeyCredParams: [
      {
        type: "public-key",
        alg: -7 // ES256 algorithm identifier
      }
    ],
    timeout: 60000, // Optional: Timeout for the operation
    attestation: "direct" // Optional: Attestation conveyance preference
  };
  // Call the WebAuthn API
  const credential = await navigator.credentials.create({ publicKey: registrationOptions })
  console.log(credential);
  // Send the credential to the server for registration completion
  /*
  const credentialData = {
    id: credential.id,
    rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
    response: {
      attestationObject: btoa(
        String.fromCharCode(
          ...new Uint8Array(credential.response.attestationObject)
        )
      ),
      clientDataJSON: btoa(
        String.fromCharCode(
          ...new Uint8Array(credential.response.clientDataJSON)
        )
      ),
    },
    type: credential.type,
  };

  await fetch("/api/register/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentialData),
  });
  */
}
