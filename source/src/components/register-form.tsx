"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Token received after registration:", data.token); // Dodano za provjeru tokena
      localStorage.setItem("token", data.token);
      console.log("Token stored in localStorage:", localStorage.getItem("token")); // Dodano za provjeru tokena u localStorage

      // Obavijesti navigaciju o promjeni statusa
      const event = new Event("login");
      window.dispatchEvent(event);
      router.push("/");
    } else {
      console.error("Registration failed.");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded"
      >
        Register
      </button>
    </form>
  );
}