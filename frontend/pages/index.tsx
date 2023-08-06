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
      <Container maxW={'7xl'} p="10">
        {/* スライドでいろんな学食風景を */}

        <Box
          paddingTop="40px"
          className="flex justify-center mb-10 overflow-hidden">
          <div className="d-demo">
            <div className="d-demo__wrap">
              <ul className="d-demo__list d-demo__list--left">
                {posts &&
                  posts.map((post: any) => (
                    <li className="mx-4 d-demo__item" key={post.id}>
                      <NextLink href={`/posts/${post.id}`}>
                        <Image src={post.picture} alt="準備中" />
                      </NextLink>
                    </li>
                  ))}
              </ul>
              <ul className="d-demo__list d-demo__list--left">
                {posts &&
                  posts.map((post: any) => (
                    <li className="mx-4 d-demo__item" key={post.id}>
                      <NextLink href={`/posts/${post.id}`}>
                        <Image src={post.profileImageUrl} alt="準備中" />
                      </NextLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Box>

        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <Heading className="my-8" as="h2">
            Cafeteria_Databaseとは
          </Heading>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
            pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
            imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque
            tortor, mattis nec lacus non, placerat congue elit.
          </Text>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
            pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
            imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque
            tortor, mattis nec lacus non, placerat congue elit.
          </Text>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
            pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
            imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque
            tortor, mattis nec lacus non, placerat congue elit.
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
                    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
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
                Blog article title
              </Text>
            </Heading>
            <Text as="p" marginTop="2" color={color} fontSize="lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
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
                      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
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
                  Some blog title
                </Text>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </Box>

            <Box className="mx-8" w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Box textDecoration="none" _hover={{textDecoration: 'none'}}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
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
                  Some blog title
                </Text>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </Box>

            <Box className="mx-8" w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Box textDecoration="none" _hover={{textDecoration: 'none'}}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
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
                  Some blog title
                </Text>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
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
              ' https://4.bp.blogspot.com/-UAUlgNA_l8A/VpjFt3OS0wI/AAAAAAAA3IA/m2WCxFCKSG0/s800/syokudou_student.png'
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
            pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
            imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque
            tortor, mattis nec lacus non, placerat congue elit.
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
                      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
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
                  Some blog title
                </Text>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
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
