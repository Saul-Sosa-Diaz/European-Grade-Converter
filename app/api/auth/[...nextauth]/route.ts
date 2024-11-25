import { MAX_AGE_SESSION } from '@/constants/session'
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
        console.log(credentials)
        if (credentials.password === '1234') {
          return { id: '1', name: 'saul' }
        } else {
          return null
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
