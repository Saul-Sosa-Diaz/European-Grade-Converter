import { MAX_AGE_SESSION } from '@/constants/session'
import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE_SESSION,
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
          const user = await databaseAdapter.verifyUser(credentials.username, credentials.password)
          return {
            id: user.userID,
            name: user.username,
            apiKey: user.apiKey,
            roleName: user.roleName,
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
