'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);

      // Obavijesti navigaciju o promjeni statusa
      const event = new Event("login");
      window.dispatchEvent(event);
      router.push("/");
    } else {
      console.error("Login failed.");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
      <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
        Login
      </button>
    </form>
  );
}