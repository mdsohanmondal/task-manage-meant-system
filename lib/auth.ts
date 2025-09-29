import prisma from '@/app/utils/prismaClient';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email or Password missing');
        }
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error('User not found');
          }
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'google') {
          const isExistUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });
          if (!isExistUser) {
            await prisma.user.create({
              data: {
                email: user.email!,
                username: user.name!,
                avatar: user.image,
              },
            });
          }
        }
        return true;
      } catch (er) {
        console.log(er);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  secret: process.env.NEXT_SECRET,

  pages: {
    signIn: '/',
    signOut: '/',
  },
};
