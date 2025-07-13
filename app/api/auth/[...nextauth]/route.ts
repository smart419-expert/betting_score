import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';image.pngimage.png
import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';

export const authOptions = {
  // adapter: PrismaAdapter(prisma), // Uncomment and configure for database
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Implement email/password sign up & login logic
        // Example: Find user in DB and verify password
        // If valid, return user object; else return null
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
    verifyRequest: '/verify-email',
    newUser: '/dashboard',
  },
  callbacks: {
    async session({ session, token }) {
      // Attach user info to session
      session.user.id = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 