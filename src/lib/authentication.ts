// authentication.ts
export async function authenticateUser() {
    // Fetch authentication options from your server
    const response = await fetch('/authenticate/options', { method: 'POST' });
    const options = await response.json();

    // Convert options from JSON to the WebAuthn format
    const publicKey: PublicKeyCredentialRequestOptions = {
        challenge: Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0)),
        rpId: options.rpId,
        allowCredentials: options.allowCredentials.map((cred: any) => ({
            type: cred.type,
            id: Uint8Array.from(atob(cred.id), c => c.charCodeAt(0))
        })),
        timeout: options.timeout,
        userVerification: options.userVerification
    };

    // Call the WebAuthn API
    const credential = await navigator.credentials.get({ publicKey });

    // Send the credential to the server for authentication completion
    const credentialData = {
        id: credential.id,
        rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
        response: {
            authenticatorData: btoa(String.fromCharCode(...new Uint8Array(credential.response.authenticatorData))),
            clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON))),
            signature: btoa(String.fromCharCode(...new Uint8Array(credential.response.signature)))
        },
        type: credential.type
    };

    await fetch('/api/authenticate/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentialData)
    });
}
