//user登録ページ
import Layout from '../layout';
import NextLink from 'next/link';
import {Button, Flex, FormLabel, Heading, Img, Input} from '@chakra-ui/react';
import {signIn, useSession} from 'next-auth/react';
import {useRef, useState} from 'react';
import {postImage} from '../api/upload';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import {useRouter} from 'next/router';
import {BsFillPersonFill} from 'react-icons/bs';

export default function Login() {
  const {data: session, status} = useSession();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [password, setPassword] = useState('');
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const router = useRouter();
  //stateに画像を保存する
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

  const register = async () => {
    const url = await uploadToServer();
    if (image && !url) {
      alert('画像のアップロードに失敗しました');
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        university,
        profileImageUrl: url ? url : '',
        username: name,
      }),
    }).catch((error) => {
      alert(error);
      return null;
    });
    if (res === null) return;
    const data = await res.json();
    if (!res.ok) {
      switch (data.message[0]) {
        case 'username should not be empty':
          alert('ユーザー名を入力してください');
          break;
        case 'email must be an email':
          alert('メールアドレスの形式が正しくありません');
          break;
        case 'password should not be empty':
          alert('パスワードを入力してください');
          break;
        case 'password must be longer than or equal to 6 characters':
          alert('パスワードは6文字以上で入力してください');
          break;
        default:
          alert(data.message);
      }
      return;
    }
    await signIn('credentials', {
      callbackUrl: '/',
      email: data.email,
      id: data.id,
      name: data.name,
      image: data.image,
      accessToken: data.accessToken,
    });
  };
  return (
    <Layout>
      <Flex
        height="full"
        alignItems="center"
        justifyContent="center"
        flexDirection={'column'}
        gap={5}
      >
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
              <BsFillPersonFill style={{fontSize: '200px'}} />
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
              }}
            >
              プロフィール画像を追加
            </Button>
          </Flex>
          <Flex
            direction="column"
            background="#FFFFEE"
            padding={12}
            rounded={3}
            width={'100vh'}
          >
            <FormLabel>
              お名前
              <Input
                value={name}
                placeholder="たろう"
                variant="filled"
                mb={3}
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormLabel>
            <FormLabel>
              メールアドレス
              <Input
                value={email}
                placeholder="example@example.com"
                variant="filled"
                mb={3}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormLabel>
            <FormLabel>
              大学名(任意)
              <Input
                value={university}
                placeholder="ひよこ大学"
                variant="filled"
                mb={3}
                type="text"
                onChange={(e) => {
                  setUniversity(e.target.value);
                }}
              />
            </FormLabel>
            <FormLabel>
              パスワード
              <div className="relative">
                <Input
                  value={password}
                  placeholder="6文字以上"
                  variant="filled"
                  mb={3}
                  type={isRevealPassword ? 'text' : 'password'}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <span className="absolute right-3 top-1/4">
                  {isRevealPassword ? (
                    <FaEye
                      onClick={() => setIsRevealPassword(false)}
                      className=" cursor-pointer"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setIsRevealPassword(true)}
                      className=" cursor-pointer"
                    />
                  )}
                </span>
              </div>
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
