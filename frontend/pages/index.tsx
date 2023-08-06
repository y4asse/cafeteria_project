'use client';

import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react';

import Layout from './layout';
import {Button} from '@chakra-ui/react';
import NextLink from 'next/link';
import {getAllPosts} from '../utils/api';
import {BiSearch} from 'react-icons/bi';
import Post from './posts/[id]';

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

interface Props {
  marginTop?: number;
  tags: any[];
}

function shuffleArray(array: any) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const BlogTags = (props: Props) => {
  const {marginTop = 0, tags} = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

export async function getServerSideProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

// とってきたデータをforloopで処理する
const Home = (props: {posts: Post[] | null}) => {
  const {posts} = props;
  const randomPosts = shuffleArray(posts).slice(0, 5);
  const randomPosts1 = shuffleArray(posts).slice(0, 1);
  const color = useColorModeValue('gray.700', 'gray.200');
  return (
    <Layout>
      <div className="bg-[url('/cafe.jpg')] bg-cover h-96 bg-fixed bg-center">
        <Box>
          <h1 className="text-center mt-20 text-6xl text-white">
            Welcome to Cafeteria Database !!
          </h1>
        </Box>
        <div className="flex justify-center mt-20">
          <Button
            as={NextLink}
            fontWeight={600}
            color="white"
            bg="orange.400"
            href="/user/search"
            _hover={{
              bg: 'orange.300',
            }}
            className="w-1/3">
            検索する
            <BiSearch className="text-xl ml-3" />
          </Button>
        </div>
      </div>

      {/* スライドでいろんな学食風景を */}
      <Box
        paddingTop="40px"
        className="flex justify-center m-10 overflow-hidden">
        <div className="d-demo">
          <div className="d-demo__wrap">
            <ul className="d-demo__list d-demo__list--left">
              {posts &&
                posts.map((post: any) => (
                  <li className="mx-4 d-demo__item" key={post.id}>
                    <NextLink href={`/posts/${post.id}`}>
                      <Image width={200} src={post.picture} alt="準備中" />
                      <span className="text-xl">{post.title}</span>
                    </NextLink>
                  </li>
                ))}
            </ul>
            <ul className="d-demo__list d-demo__list--left">
              {posts &&
                posts.map((post: any) => (
                  <li className="mx-4 d-demo__item" key={post.id}>
                    <NextLink href={`/posts/${post.id}`}>
                      <Image width={200} src={post.picture} alt="準備中" />
                      <span>{post.title}</span>
                    </NextLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Box>

      {/* 説明 */}
      <Container maxW={'7xl'} px="10">
        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <Heading className="my-8" as="h2">
            Cafeteria_Databaseとは
          </Heading>
          <Text as="p" fontSize="lg">
            Cafeteria_Databaseとは学生が今日食べたご飯を気軽に共有できるアプリケーションです。
            学校の学食や学校の近所の美味しいラーメン屋、安くて美味しい定食など「自分が食べたごはんを投稿して食べる喜びを共有しよう」というコンセプトのアプリケーションです。
          </Text>
          <Text as="p" fontSize="lg">
            アプリの主なターゲットユーザー日本に住む大学生や専門学生、高校生などです。美味しくて安いごはんを食べたいという方に向けたアプリケーションです。
            アプリの主な機能は、投稿機能やリアクション機能、検索機能などユーザー同士でのコミュニケーション機能などが挙げられます。
          </Text>
        </VStack>

        <Box
          marginTop={{base: '1', sm: '5'}}
          display="flex"
          flexDirection={{base: 'column', sm: 'row'}}
          justifyContent="space-between">
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center">
            <Box
              width={{base: '100%', sm: '85%'}}
              zIndex="2"
              marginLeft={{base: '0', sm: '5%'}}
              marginTop="5%">
              <Box textDecoration="none" _hover={{textDecoration: 'none'}}>
                <Image
                  borderRadius="lg"
                  src={
                    posts
                      ? posts[0].picture
                      : 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                  }
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Box>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box backgroundSize="20px 20px" opacity="0.4" height="100%" />
            </Box>
          </Box>

          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{base: '3', sm: '0'}}>
            <BlogTags tags={['Engineering', 'Product']} />
            <Heading marginTop="1">
              <Text textDecoration="none" _hover={{textDecoration: 'none'}}>
                {posts && posts[0].title}
              </Text>
            </Heading>
            <Text as="p" marginTop="2" color={color} fontSize="lg">
              {posts && posts[0].description}
            </Text>
          </Box>
        </Box>

        <Heading paddingTop="80px" as="h2" marginTop="5">
          ランキング
        </Heading>
        <Divider marginTop="5" />
        <Wrap spacing="30px" marginTop="5">
          <WrapItem width={{base: '100%', sm: '45%', md: '45%', lg: '30%'}}>
            <Box className="mx-8" w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Box textDecoration="none" _hover={{textDecoration: 'none'}}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://www.eco.nihon-u.ac.jp/wp-content/uploads/2023/06/gakusyoku1.jpg'
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Box>
              </Box>
              <BlogTags tags={['卵かけご飯']} marginTop={3} />
              <Heading fontSize="xl" marginTop="2">
                <Text textDecoration="none" _hover={{textDecoration: 'none'}}>
                  卵かけご飯
                </Text>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                卵かけご飯です。美味しいです。
              </Text>
            </Box>

            <Box className="mx-8" w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Box textDecoration="none" _hover={{textDecoration: 'none'}}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://www.sirogohan.com/_files/recipe/images/cha-han/cha-han9324.JPG'
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Box>
              </Box>
              <BlogTags tags={['炒飯']} marginTop={3} />
              <Heading fontSize="xl" marginTop="2">
                <Text textDecoration="none" _hover={{textDecoration: 'none'}}>
                  チャーハン
                </Text>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
               シンプルな炒飯です
              </Text>
            </Box>

            <Box className="mx-8" w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Box textDecoration="none" _hover={{textDecoration: 'none'}}>
                  <Image
                    transform="scale(1.0)"
                    src={
                     'https://www.kamada.co.jp/storage/images/cfiles/121/mX8THkcauOjgn9HLGxPRyafYI0tO1IqmMySlcaTe_1024.jpg'
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Box>
              </Box>
              <BlogTags tags={['ラーメン']} marginTop={3} />
              <Heading fontSize="xl" marginTop="2">
                <Text textDecoration="none" _hover={{textDecoration: 'none'}}>
                  ラーメン
                </Text>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                美味しいラーメン
              </Text>
            </Box>
          </WrapItem>
        </Wrap>
        <div className="flex justify-center my-10">
          <Button
            as={NextLink}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="orange.400"
            href="/user/ranking"
            _hover={{
              bg: 'orange.300',
            }}
            className="w-1/3">
            ランキングへ
          </Button>
        </div>

        <Heading paddingTop="80px" as="h2" marginTop="5">
          今日の学食
        </Heading>
        <Divider marginTop="5" />
        <Wrap spacing="30px" marginTop="5">
          <WrapItem width={{base: '100%', md: '45%', lg: '30%'}}></WrapItem>
          <Image
            transform="scale(1.0)"
            src={
              'https://firebasestorage.googleapis.com/v0/b/cafeteria-fa0bf.appspot.com/o/%E3%82%B9%E3%82%AF[…]?alt=media&token=e8f5da2e-bb7d-41ba-8831-36dce3b3ed9a'
            }
            alt="some text"
            objectFit="contain"
            width="30%"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
            }}
          />
          <Text as="p" fontSize="lg">
            今日食べたいものを検索
          </Text>
        </Wrap>
        <div className="flex justify-center my-10">
          <Button
            as={NextLink}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="orange.400"
            href="/user/today_lunch"
            _hover={{
              bg: 'orange.300',
            }}
            className="w-1/3">
            今日の学食へ
          </Button>
        </div>

        <Heading paddingTop="80px" as="h2" marginTop="5">
          自分の投稿
        </Heading>
        <Divider marginTop="5" />
        <Wrap spacing="30px" marginTop="5">
          <WrapItem width={{base: '100%', sm: '45%', md: '45%', lg: '30%'}}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Box textDecoration="none" _hover={{textDecoration: 'none'}}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://cdn.sbfoods.co.jp/recipes/05225_l.jpg'
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Box>
              </Box>
              <BlogTags tags={['Engineering', 'Product']} marginTop={3} />
              <Heading fontSize="xl" marginTop="2">
                <Text textDecoration="none" _hover={{textDecoration: 'none'}}>
                  キムチラーメン
                </Text>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                日本大学のキムチラーメンです
              </Text>
            </Box>
          </WrapItem>
        </Wrap>

        <div className="flex justify-center my-10">
          <Button
            as={NextLink}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="orange.400"
            href="/user/search"
            _hover={{
              bg: 'orange.300',
            }}
            className="w-1/3">
            検索する
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
