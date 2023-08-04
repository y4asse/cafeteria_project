import type {DefaultUser} from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      university?: string | null;
      accessToken?: string | null;
    } & DefaultUser;
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    university?: string | null;
    accessToken?: string | null;
  }
}

declare module 'next-auth/jwt' {
  // "jwt"コールバックのtokenパラメータに任意のプロパティを追加します。
  interface JWT {
    university?: string | null;
    accessToken?: string | null;
  }
}
