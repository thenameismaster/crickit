// src/lib/auth.ts
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // This is called at sign in
      if (account && profile) {
        token.id = profile.sub; // from Google user info
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Put the user's ID on the session object
        // so it's available on the client
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
