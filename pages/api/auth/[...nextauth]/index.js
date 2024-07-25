import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User'; // Adjust this import as needed
import connectDB from '@/db/connectdb';
import bcrypt from 'bcrypt';

connectDB();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error('No user found with the email');
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Password is incorrect');
          }

          // Return user object if authentication is successful
          return { email: user.email, name: user.name, id: user._id.toString() };
        } catch (error) {
          throw new Error('Error authorizing user: ' + error.message);
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Set the user ID in the session
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      // Set the user ID in the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
});
