//ログインページ
import Layout from '../layout';
import NextLink from 'next/link';

export default function Login() {
  return (
    <Layout>
      <div>
        <h1> ログインページ</h1>
      </div>

      <NextLink href="/user/register">新規追加はこちら</NextLink>
    </Layout>
  );
}
