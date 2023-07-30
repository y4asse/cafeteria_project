import React from 'react';
import Layout from '../layout';
import {signOut} from 'next-auth/react';
import {Button, Flex, Heading} from '@chakra-ui/react';

const Logout = () => {
  return (
    <Layout>
      <Flex height="70vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="#FFFFEE" padding={12} rounded={6}>
          <Heading mb={6} textAlign="center">
            Are you sure you want to sign out?
          </Heading>
          <Button
            bg="orange.400"
            colorScheme="teal"
            onClick={() => signOut({callbackUrl: '/'})}
            margin={5}>
            Sign out
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Logout;
