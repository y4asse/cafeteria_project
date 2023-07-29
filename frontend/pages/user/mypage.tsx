//user登録ページ
import Layout from '../layout';
import {Button} from '@chakra-ui/react';
import {signOut, useSession} from 'next-auth/react';

export default function Mypage() {
  const {data: session} = useSession();
  return (
    <Layout>
      <div>
        <div>{session?.user.name}</div>
        <div>{session?.user.email}</div>
        <div>{session?.user.image}</div>
        <div>{session?.expires}</div>
        {/* 画像を表示 */}

        <Button
          fontSize="sm"
          fontWeight={600}
          color="white"
          bg="orange.400"
          onClick={() => signOut()}
          _hover={{
            bg: 'orange.300',
          }}>
          サインアウト
        </Button>
      </div>
    </Layout>
  );
}
