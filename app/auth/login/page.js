"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", { 
      email, 
      password, 
      redirect: false 
    });

    if (result.error) {
      alert("Invalid credentials");
      console.log(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div 
      className="flex justify-center items-center h-screen bg-[url('/images/bg.png')] bg-cover bg-center"
    >
      <form onSubmit={handleSubmit} className="p-6 bg-white bg-opacity-90 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-museo font-extrabold text-manasa-green mb-4">LOGIN</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
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
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}