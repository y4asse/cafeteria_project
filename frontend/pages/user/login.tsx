//ログインページ
import Layout from '../layout'; 
import NextLink from "next/link";
import { Button, Flex, Heading, Input, } from "@chakra-ui/react";

export default function Login() {
  return (
    <Layout>

     <Flex height="70vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="#FFFFEE" padding={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input placeholder="sample@sample.com" variant="filled" mb={3} type="email" />
        <Input placeholder="********" variant="filled" mb={6} type="password" />
        <Button  bg="orange.400" colorScheme="teal">Log in</Button>
        <NextLink href='/user/register'>
          新規追加はこちら
        </NextLink>
      </Flex>
    </Flex>
   
    </Layout>
  )
}