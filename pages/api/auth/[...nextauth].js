

import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord"
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import jwt from "jsonwebtoken"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackUrl: "http://localhost:3000/auth/callback/discord",
      scope: "identify email",
    })
    // ...add more providers here
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
    callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      }
      return session
    }
  }
});

