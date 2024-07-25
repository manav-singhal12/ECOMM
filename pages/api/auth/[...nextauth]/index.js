// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/db/connectdb';
import User from '@/models/User';
import { verifyPassword } from '@/db/auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error('No user found with the email');
          }

          const isValid = await verifyPassword(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Invalid password');
          }

          return { email: user.email, name: user.name };
        } catch (error) {
          console.error('Authorize error:', error);
          throw new Error('Authorization error');
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newAccount: '/auth/new-account'
  },
  secret: process.env.NEXTAUTH_SECRET,
});
