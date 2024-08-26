import { useState } from "react";
import type { FormEvent } from "react";
import { signUp } from "../lib/auth";
export default function Form() {
  const [responseMessage, setResponseMessage] = useState("🍔");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const message = await signUp(name);
    const response = await fetch("/api/signup", {
      method: "POST",
      body: message,
    });
    const data = await response.json();
    console.log('received data: ')
    console.log(data)
    if (data!.receivedData!.credential!.id) {
      setResponseMessage(data.receivedData.credential.id);
    }
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" autoComplete="name" required />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
        />
      </label>
      <label htmlFor="message">
        Message
        <textarea id="message" name="message" autoComplete="off" required />
      </label>
      <button>Send</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}