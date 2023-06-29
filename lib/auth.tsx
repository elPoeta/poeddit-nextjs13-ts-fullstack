import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from "./prisma";
import GithubProvider from 'next-auth/providers/github'
import { nanoid } from "nanoid";
import { findUserByEmail, updateUserById } from "@/db/user";

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID! as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! as string, 
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }

      return session
    },

    async jwt({ token, user }) {
      const dbUser = await findUserByEmail(token.email); 
      // await db.user.findFirst({
      //   where: {
      //     email: token.email,
      //   },
      // })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      if (!dbUser.username) {
        await updateUserById(dbUser.id, { username: nanoid(10)});
        // await db.user.update({
        //   where: {
        //     id: dbUser.id,
        //   },
        //   data: {
        //     username: nanoid(10),
        //   },
        // })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      }
    },
    redirect() {
      return '/'
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)