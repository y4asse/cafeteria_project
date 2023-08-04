//ログインページ
import Layout from '../layout';
import NextLink from 'next/link';
import {Button, Center, Flex, Heading, Input} from '@chakra-ui/react';
import {signIn} from 'next-auth/react';
import {useState} from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    if (email === '') {
      alert('メールアドレスを入力してください');
      return;
    }
    if (password === '') {
      alert('パスワードを入力してください');
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
    }).catch((err) => {
      alert('通信に失敗しました');
      return null;
    });
    if (res === null) return;
    const data = await res!.json(); //user = { id: "asdfgjhkal;kdj", name: "J Smith", email: "jsmith@example.com" }
    if (data.statusCode === 404) {
      alert('ユーザが存在しません');
      return;
    }
    if (data.statusCode === 401) {
      alert('ユーザー名またはパスワードを確認してください');
      return;
    }
    if (data.id) {
      await signIn('credentials', {
        callbackUrl: '/',
        email: data.email,
        id: data.id,
        name: data.name,
        image: data.image,
        accessToken: data.accessToken,
      });
    }
  };
  return (
    <Layout>
      <Flex height="70vh" alignItems="center" justifyContent="center" mt={10}>
        <Flex direction="column" background="#FFFFEE" padding={12} rounded={6}>
          <Heading mb={6} textAlign="center">
            Log in
          </Heading>
          <Input
            placeholder="sample@sample.com"
            variant="filled"
            mb={3}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="********"
            variant="filled"
            mb={6}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button bg="orange.400" colorScheme="teal" onClick={login}>
            Log in
          </Button>
          <NextLink href="/user/register" className="my-5 text-center">
            新規追加はこちら
          </NextLink>
        </Flex>
      </Flex>
    </Layout>
  );
}
