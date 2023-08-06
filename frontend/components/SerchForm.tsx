import {useState} from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Heading,
  Input,
  Spinner,
  Flex,
  FormLabel,
  Text, // この行を追加
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
import NextLink from 'next/link';
import Post from '@/pages/posts/[id]';

export default function SearchForm() {
  const [title, setTitle] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState<Post[]>();
  const color = useColorModeValue('gray.600', 'gray.300');

  const handlePost = async () => {
    if (title === '' && universityName === '') {
      alert('タイトルか大学名を入力してください');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/search`,
        {
          title,
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
    <Box>
      <Box
        borderWidth="1px"
        rounded="lg"
        maxWidth={800}
        marginTop={200}
        p={6}
        m="10px auto"
        as="form">
        <Flex>
          <FormControl mr="5%">
            <FormLabel htmlFor="title" fontWeight={'normal'}>
              タイトルで検索
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
      <Box>
        {postData &&
          postData.map((post) => (
            <Box
              borderWidth="1px"
              rounded="lg"
              shadow="1px 1px 3px rgba(0,0,0,0.3)"
              maxWidth={800}
              p={6}
              m="10px auto"
              as="form"
              marginTop={{base: '1', sm: '5'}}
              display="flex"
              flexDirection={{base: 'column', sm: 'row'}}
              justifyContent="space-between"
              key={post.id}>
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
                  <NextLink href={`/posts/${post.id}`}>
                    <Box
                      textDecoration="none"
                      _hover={{textDecoration: 'none'}}>
                      <Image
                        borderRadius="lg"
                        src={post.picture}
                        alt="some good alt text"
                        objectFit="contain"
                      />
                    </Box>
                  </NextLink>
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
                marginTop={{base: '3', sm: '0'}}
                marginBottom={{base: '3', sm: '0'}} // 修正された部分
                key={post.id}>
                <Heading marginTop="1">
                  <Text textDecoration="none" _hover={{textDecoration: 'none'}}>
                    {post.title}
                  </Text>
                </Heading>
                <Text as="p" marginTop="2" color={color} fontSize="lg">
                  {post.description}
                </Text>
                <Text as="p" marginTop="2" color={color} fontSize="lg">
                  {post.university}
                </Text>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
