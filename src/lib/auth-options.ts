import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { hasGoogleProviderConfig, serverEnv } from "@/lib/env.server";
import { verifyCredentialsWithFirebase } from "@/services/auth/credentials.service";
import { syncUserProfileFromAuth } from "@/services/firebase/user-admin.service";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      return verifyCredentialsWithFirebase({
        email: credentials.email,
        password: credentials.password,
      });
    },
  }),
];

if (hasGoogleProviderConfig()) {
  providers.push(
    GoogleProvider({
      clientId: serverEnv.googleClientId,
      clientSecret: serverEnv.googleClientSecret,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  secret: serverEnv.nextAuthSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      await syncUserProfileFromAuth({
        id: user.id ?? "",
        email: user.email ?? "",
        name: user.name ?? "",
        image: user.image ?? null,
        provider: account?.provider ?? "credentials",
      });

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
        token.picture = user.image;
        token.role = "owner";
        token.provider = account?.provider ?? "credentials";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as string | undefined) ?? "owner";
        session.user.provider =
          (token.provider as string | undefined) ?? "credentials";
        session.user.image = (token.picture as string | null | undefined) ?? null;
      }

      return session;
    },
  },
};
