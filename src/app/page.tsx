"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome to <span className="text-blue-600">Crickit</span>
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign in to explore the cricket world!
        </p>
        <button
          onClick={handleSignIn}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring focus:ring-blue-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
