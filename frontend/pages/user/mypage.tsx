//user登録ページ
import Layout from '../layout';
import NextLink from 'next/link';
import {Button, Flex, Heading, Input} from '@chakra-ui/react';
import {signOut} from 'next-auth/react';

export default function Mypage() {
  return (
    <Layout>
      <div>
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
