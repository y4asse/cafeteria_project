'use client';

import {useState} from 'react';
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
} from '@chakra-ui/react';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';

const Form1 = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [universityName, setUniversityName] = useState('');

  // 投稿ボタンを押したときに呼び出される関数
  const handlePost = async () => {
    try {
      const data = {
        title: title,
        contents: contents,
      };
      await axios.post('http://localhost:3000/posts', {data});
      alert('成功しました');
    } catch (error) {
      console.error(error);
      alert('エラーが発生しました');
    }
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        あなたの学食は？？
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="title" fontWeight={'normal'}>
            タイトル
          </FormLabel>
          <Input
            id="title"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="contents" fontWeight={'normal'}>
          内容
        </FormLabel>
        <Input
          id="text"
          type="text"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="university_name" fontWeight={'normal'}>
          大学名
        </FormLabel>
        <Input
          id="text"
          type="text"
          value={universityName}
          onChange={(e) => setUniversityName(e.target.value)}
        />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel>投稿写真</FormLabel>
        <Input id="file" type="file" />
      </FormControl>
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            <Button
              w="7rem"
              onClick={handlePost}
              colorScheme="teal"
              variant="outline"
            >
              投稿する
            </Button>
          </Flex>
        </Flex>
      </ButtonGroup>
    </>
  );
};

export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Form1 />
      </Box>
    </>
  );
}
