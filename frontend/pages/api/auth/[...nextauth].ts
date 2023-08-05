import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {label: 'メールアドレス', type: 'email', placeholder: ''},
        password: {label: 'パスワード', type: 'password'},
        id: {label: 'ID', type: 'text'},
        image: {label: 'プロフィール画像', type: 'text'},
        name: {label: 'ユーザ名', type: 'text'},
        university: {label: '大学名', type: 'text'},
        accessToken: {label: 'アクセストークン', type: 'text'},
      },
      async authorize(credentials, req) {
        if (credentials == undefined) return null;
        return credentials;
      },
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/user/login',
  },

  callbacks: {
    jwt: async ({token, user, account}) => {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.sub = user.id;
        token.picture = user.image;
        token.accessToken = user.accessToken;
        token.university = user.university;
      }
      return token;
    },
    async session({session, token}) {
      if (token) {
        session.user.id = token.sub!;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.accessToken = token.accessToken;
        session.user.university = token.university;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
