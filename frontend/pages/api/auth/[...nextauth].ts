import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/user/login',
  },

  callbacks: {
    async session({session, token}) {
      if (session.user != null && token.sub != null) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
