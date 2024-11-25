import { MongoClient, ServerApiVersion } from 'mongodb'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const client = new MongoClient(process.env.MONGODB_URI, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            },
          })
          await client.connect()
          const user = await client
            .db('Users')
            .collection('admin')
            .find({ username: credentials.username, password: credentials.password })
            .toArray()
          if (user.length > 0) {
            return { id: user[0]._id.toString(), name: user[0].username }
          } else {
            return null
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
