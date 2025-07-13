"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });

    if (response.ok) {
      alert("Registration successful! Please log in.");
      router.push("/auth/login");
    } else {
      const error = await response.json();
      alert(error.error);
    }
  };

  return (
    <div 
      className="flex justify-center items-center h-screen bg-[url('/images/bg.png')] bg-cover bg-center"
    >
      <form onSubmit={handleRegister} className="p-6 bg-white bg-opacity-90 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-museo font-extrabold text-manasa-green mb-4">SIGNUP</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-2" 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2" 
          required 
        />
        <input 
          type="text" 
          placeholder="Phone Number" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded mb-2" 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4" 
          required 
        />
        <button 
          type="submit" 
          className="w-full bg-manasa-green text-white p-2 rounded hover:bg-manasa-red"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}