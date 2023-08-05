//user登録ページ
import Layout from '../layout';
import NextLink from 'next/link';
import {signIn, useSession} from 'next-auth/react';
import {postImage} from '../api/upload';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import {useRouter} from 'next/router';
import {BsFillPersonFill} from 'react-icons/bs';
import {useRef, useState} from 'react';
import {useEffect} from 'react';
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

export default function Search() {
  const [universityName, setUniversityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState([]);

  useEffect(() => {}, [postData]);

  const handlePost = async () => {
    if (universityName === '') {
      alert('大学名を入力してください');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/today`,
        {
          university: universityName,
        }
      );
      setPostData(response.data);
    } catch (error) {
      console.error(error);
      alert('エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Box rounded="lg" p={6} m="10px auto" as="form">
        <FormControl mt="2%">
          <FormLabel htmlFor="university_name" fontWeight={'normal'}>
            大学名で検索
          </FormLabel>
          <Input
            id="university_name"
            placeholder="大学名"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
          />
        </FormControl>
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Button
              w="7rem"
              onClick={handlePost}
              colorScheme="teal"
              variant="outline"
              className={`${isLoading && 'cursor-not-allowed'}`}>
              {isLoading ? <Spinner /> : '検索する'}
            </Button>
          </Flex>
        </ButtonGroup>
      </Box>

      {postData.length > 0 ? (
        postData.map((post) => (
          <div
            className="border-2 border-black p-5 flex gap-3 shadow-lg my-5 mb-10 mx-24 rounded-xl"
            key={post.id}>
            {/* ひよこに変える */}
            <img
              className="w-20 h-20 rounded-full"
              src={'/images/icon.png'}
              alt="hogehoge"
            />
            <div className="rounded">
              <p className="font-bold">{post.title}</p>
            </div>
            <br />
            <NextLink href={`/posts/${post.id}`}>
              <p className="font-bold">ここから詳細を見る</p>
            </NextLink>
          </div>
        ))
      ) : (
        <p></p>
      )}
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
