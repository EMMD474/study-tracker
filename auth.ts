import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"
import { signInSchema } from "@/lib/zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        try {
          await prisma.user.upsert({
            where: { email: user.email },
            update: { providerId: account.providerAccountId },
            create: { email: user.email, providerId: account.providerAccountId },
          })
        } catch (err) {
          console.error("[auth] failed to upsert Google user:", err)
          return false
        }
      }
      return true
    },
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.password) return null

        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) return null

        return { id: user.id, email: user.email }
      },
    }),
  ],
})
