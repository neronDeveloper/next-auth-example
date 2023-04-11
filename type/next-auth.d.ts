import { DefaultAdapter } from "next-auth/adapters";
import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {
    interface Session {
        supabaseAccessToken? : string;
        user : {
            adress: string
        } & DefaultSession["user"];
    }
}