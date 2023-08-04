//ログインページ
import Layout from '../layout';
import NextLink from 'next/link';
import {
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import {signIn} from 'next-auth/react';
import {useState} from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

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
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  return (
    <Layout>
      <Flex height="70vh" alignItems="center" justifyContent="center" mt={10}>
        <Flex direction="column" background="#FFFFEE" padding={12} rounded={6}>
          <Heading mb={6} textAlign="center">
            ログイン
          </Heading>
          <FormLabel>
            メールアドレス
            <Input
              value={email}
              placeholder="example@example.com"
              variant="filled"
              mb={3}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormLabel>
          <FormLabel>
            パスワード
            <div className="relative">
              <Input
                value={password}
                placeholder="6文字以上"
                variant="filled"
                mb={3}
                type={isRevealPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span className="absolute right-3 top-1/4">
                {isRevealPassword ? (
                  <FaEye
                    onClick={() => setIsRevealPassword(false)}
                    className=" cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setIsRevealPassword(true)}
                    className=" cursor-pointer"
                  />
                )}
              </span>
            </div>
          </FormLabel>
          <Button bg="orange.400" colorScheme="teal" onClick={login}>
            ログイン
          </Button>
          <NextLink
            href="/user/register"
            className="my-5 text-center underline">
            ※新規追加はこちら
          </NextLink>
        </Flex>
      </Flex>
    </Layout>
  );
}
