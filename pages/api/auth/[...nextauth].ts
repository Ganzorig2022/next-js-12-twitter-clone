import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, //! => non-null assertion
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, //non-null assertion
    }),
  ],

  //https://next-auth.js.org/configuration/pages
  //To add a custom login page, you can use the pages option:
  pages: {
    signIn: '/login',
  },

  //https://next-auth.js.org/configuration/options
  //https://next-auth.js.org/configuration/options#session
  session: {
    strategy: 'jwt' as const,
  },

  //https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // Send properties to the client, like an access_token and user id from a provider.
    // hereglegchiin ID-g shineer nemj ogohiin tuld callbacks ashiglaw.

    session: async ({ session, token }: any) => {
      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
