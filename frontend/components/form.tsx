'use client';

import {useRef, useState} from 'react';
import {BsFillPersonFill} from 'react-icons/bs';
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
import {postImage} from '@/pages/api/upload';
import {ClassNames} from '@emotion/react';
import {useSession} from 'next-auth/react';

const Form1 = () => {
  const {data: session, status} = useSession();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [universityName, setUniversityName] = useState(
    session?.user.university
  );

  console.log(session?.user.university);
  //画像
  const [image, setImage] = useState<File | undefined>(undefined);
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };
  const uploadToServer = async (): Promise<string | undefined> => {
    if (!image) return;
    const url = await postImage(image);
    return url;
  };

  // 投稿ボタンを押したときに呼び出される関数
  const handlePost = async () => {
    var description = contents;
    var university = universityName;
    const url = await uploadToServer();
    if (image && !url) {
      alert('画像のアップロードに失敗しました');
      return;
    }
    try {
      const postData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts`,
        {
          title,
          description,
          university,
          image: url,
          uid: session?.user.id,
        }
      );
      console.log(postData.data.id);

      //aiにコメントを書いてもらう
      const {data} = await axios.post(
        `${process.env.NEXT_PUBLIC_FRONT_URL}/api/ai`,
        {
          title,
          description,
          university,
          name: session?.user.name,
        }
      );
      const {responseText} = data;
      const commentData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/create`,
        {
          pid: postData.data.id,
          uid: `${process.env.NEXT_PUBLIC_HIYOKO_ID}`,
          content: responseText,
        }
      );

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
          value={universityName!}
          onChange={(e) => setUniversityName(e.target.value)}
        />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel>投稿写真</FormLabel>
        {createObjectURL && (
          <img
            src={createObjectURL}
            alt="profile-img"
            width={200}
            height={200}
            className="mb-3"
          />
        )}
        <Button
          onClick={() => {
            fileInputRef.current?.click();
          }}>
          投稿画像を追加
        </Button>
        <input
          ref={fileInputRef}
          id="file-input"
          type="file"
          accept="image/*"
          name="myImage"
          className=" hidden"
          onChange={uploadToClient}
        />
      </FormControl>
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            <Button
              w="7rem"
              onClick={handlePost}
              colorScheme="teal"
              variant="outline">
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
        as="form">
        <Form1 />
      </Box>
    </>
  );
}
