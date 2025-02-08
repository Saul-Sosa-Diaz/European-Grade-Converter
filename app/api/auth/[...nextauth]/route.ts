import { MAX_AGE_SESSION } from '@/constants/session'
import { Role } from '@/domain/auth/auth'
import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    role: Role
  }
  interface User {
    id: string
    name: string
    role: string
  }
}

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE_SESSION,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.name = token.name as string
      session.role = token.role as Role
      return session
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const databaseAdapter = createDatabaseAdapter()
          const user = await databaseAdapter.verifyUser(
            credentials.username.toLowerCase(),
            credentials.password,
          )
          return {
            id: user.id,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error(error)
          return null
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
