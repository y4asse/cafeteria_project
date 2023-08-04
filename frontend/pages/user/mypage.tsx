'use client';

//user登録ページ
import {Button, Flex, FormLabel, Heading, Input} from '@chakra-ui/react';
import Layout from '../layout';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {BsFillPersonFill} from 'react-icons/bs';
import NextLink from 'next/link';

export default function Mypage() {
  const {data: session} = useSession();
  const router = useRouter();
  if (session == null) {
    return (
      <Layout>
        <Flex
          height="full"
          alignItems="center"
          justifyContent="center"
          flexDirection={'column'}
          gap={5}>
          <Heading className="text-center">ログインしていません</Heading>
          <Button bg="orange.400" colorScheme="teal" as={NextLink} href="login">
            ログイン
          </Button>
        </Flex>
      </Layout>
    );
  }
  return (
    <Layout>
      <Flex
        height="full"
        alignItems="center"
        justifyContent="center"
        flexDirection={'column'}
        gap={5}>
        <Heading className="text-center">マイページ</Heading>
        <Flex alignItems="center" justifyContent="center" gap={20}>
          <Flex direction={'column'} gap={5}>
            {session.user.image != (null || undefined || '') ? (
              <img
                src={session.user.image!}
                alt="profile-img"
                width={200}
                height={200}
                className="rounded-full"
              />
            ) : (
              <BsFillPersonFill style={{fontSize: '200px'}} />
            )}
          </Flex>
          <Flex
            direction="column"
            background="#FFFFEE"
            padding={12}
            rounded={3}
            width={'100vh'}>
            <table className="w-4/5">
              <tr>
                <th className=" text-start">お名前:</th>
                <td>{session.user.name}</td>
              </tr>
              <tr>
                <th className=" text-start">メールアドレス:</th>
                <td>{session.user.email}</td>
              </tr>
              <tr>
                <th className=" text-start">大学名:</th>
                <td>{session.user.university ?? '未設定'}</td>
              </tr>
            </table>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
