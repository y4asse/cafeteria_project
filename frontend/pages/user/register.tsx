//user登録ページ
import Layout from '../layout';
import NextLink from 'next/link';
import {Button, Flex, FormLabel, Heading, Img, Input} from '@chakra-ui/react';
import {useSession} from 'next-auth/react';
import {useRef, useState} from 'react';
import Image from 'next/image';
import {postImage} from '../api/upload';

export default function Login() {
  const {data: session, status} = useSession();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | undefined>(undefined);
  //stateに画像を保存する
  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };
  const uploadToServer = async () => {
    if (!image) return;
    const url = await postImage(image);
    console.log(url);
    setUrl(url);
  };

  const register = async () => {};
  return (
    <Layout>
      <Flex
        height="full"
        alignItems="center"
        justifyContent="center"
        flexDirection={'column'}
        gap={5}>
        <Heading className="text-center">新規登録</Heading>
        <Flex alignItems="center" justifyContent="center" gap={20}>
          <Flex direction={'column'} gap={5}>
            {createObjectURL ? (
              <img
                src={createObjectURL}
                alt="profile-img"
                width={200}
                height={200}
                className="rounded-full"
              />
            ) : (
              <Image
                src="/images/icon.png"
                alt="profile-img"
                width={200}
                height={200}
                className="rounded-full"
              />
            )}
            <input
              ref={fileInputRef}
              id="file-input"
              type="file"
              accept="image/*"
              name="myImage"
              className=" hidden"
              onChange={uploadToClient}
            />
            <Button
              onClick={() => {
                fileInputRef.current?.click();
              }}>
              プロフィール画像を追加
            </Button>
          </Flex>
          <Flex
            direction="column"
            background="#FFFFEE"
            padding={12}
            rounded={3}
            width={'100vh'}>
            <FormLabel>
              お名前
              <Input placeholder="お名前" variant="filled" mb={3} type="text" />
            </FormLabel>
            <FormLabel>
              メールアドレス
              <Input
                placeholder="メールアドレス"
                variant="filled"
                mb={3}
                type="email"
              />
            </FormLabel>
            <FormLabel>
              大学名
              <Input placeholder="大学名" variant="filled" mb={3} type="text" />
            </FormLabel>
            <FormLabel>
              パスワード
              <Input
                placeholder="パスワード"
                variant="filled"
                mb={3}
                type="password"
              />
            </FormLabel>
            <Button bg="orange.400" colorScheme="teal" onClick={register}>
              新規登録
            </Button>
            <NextLink href="/user/login" className="text-center mt-3 underline">
              ※ログインはこちら
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
