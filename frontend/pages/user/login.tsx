//ログインページ
import Layout from '../layout';
import NextLink from 'next/link';
import {Button, Center, Flex, Heading, Input} from '@chakra-ui/react';
import {useSession, signIn, signOut} from 'next-auth/react';
import Image from 'next/image';

export default function Login() {
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
          />
          <Input
            placeholder="********"
            variant="filled"
            mb={6}
            type="password"
          />
          <Button bg="orange.400" colorScheme="teal" onClick={() => signIn()}>
            Log in
          </Button>
          <NextLink href="/user/register" className="my-5 text-center">
            新規追加はこちら
          </NextLink>
          <hr className="h-1 mb-3 bg-gray-100 border-0 rounded dark:bg-gray-700 " />
          <Button
            onClick={() => signIn('github', {callbackUrl: '/'})}
            bg="orange.400"
            colorScheme="teal"
            className="mb-1">
            <Image
              src={`/icons/github.svg`}
              width={24}
              height={24}
              alt="service-icon"
              className="mr-2"
            />
            Sign in with GitHub
          </Button>
          <Button
            onClick={() => signIn('google', {callbackUrl: '/'})}
            bg="orange.400"
            colorScheme="teal">
            <Image
              src={`/icons/google.svg`}
              width={24}
              height={24}
              alt="service-icon"
              className="mr-2"
            />
            Sign in with Google
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
}
