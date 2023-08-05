//user登録ページ
import Layout from '../layout';
import NextLink from 'next/link';
import {signIn, useSession} from 'next-auth/react';
import {postImage} from '../api/upload';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import {useRouter} from 'next/router';
import {BsFillPersonFill} from 'react-icons/bs';
import {useRef, useState} from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import SearchForm from '@/components/SerchForm';

export default function Search() {

  return (
    <Layout>
        <SearchForm/>
        <div className="flex justify-center my-10">
          <Button
            as={NextLink}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="orange.400"
            href="/"
            _hover={{
              bg: 'orange.300',
            }}
            className="w-1/3">
            トップページへ
          </Button>
        </div>
    </Layout>
  );
}
