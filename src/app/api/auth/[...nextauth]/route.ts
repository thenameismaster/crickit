// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// NextAuth is a request handler (like any other API route).
// We export it as GET and POST so all NextAuth routes work.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
