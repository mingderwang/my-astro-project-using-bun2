// Function to generate a challenge
export function generateChallenge() {
    return new Promise((resolve, reject) => {
        const challenge = crypto.getRandomValues(new Uint8Array(32))
        resolve(challenge.toString()) 
      })
  }