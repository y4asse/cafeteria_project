import {useSession} from 'next-auth/react';
import {Box, Flex, Heading, Button} from './Common';
import NextLink from 'next/link';
import {ChevronDownIcon} from '@chakra-ui/icons';
import {useEffect, useState} from 'react';
import Link from 'next/link';

console.log('Have a good day 😄');
export default function Header() {
  const {data: session, status} = useSession();
  const [isShowProfile, setIsShowProfile] = useState(false);
  const toggleIsShowProfile = () => setIsShowProfile(!isShowProfile);
  const myprofileDropdownList = [
    {title: 'マイページ', link: '/user/mypage'},
    {title: 'ログアウト', link: '/user/logout'},
  ];

  //ドロップダウンを閉じる
  useEffect(() => {
    const handleClickToCloseDropdown = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      setIsShowProfile(false);
    };
    window.addEventListener('click', handleClickToCloseDropdown, true);
    return () => {
      window.removeEventListener('click', handleClickToCloseDropdown, true);
    };
  });
  return (
    <header className="">
      <Box as="header">
        <Flex
          bg="white"
          color="gray.600"
          minH={'60px'}
          py={{base: 2}}
          px={{base: 4}}
          borderBottom={1}
          borderStyle="solid"
          borderColor="gray.200"
          align="center"
          backgroundColor="#FBCF86">
          <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
            <Heading as="h1" size="lg">
              <NextLink href="/">Cafeteria_Database</NextLink>
            </Heading>

            {/* ログインボタンとマイページボタンを作る */}
            {session ? (
              <div className="flex gap-1 items-center relative">
                <button onClick={toggleIsShowProfile}>
                  <img
                    src={session.user.image!}
                    alt="profile-img"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
                <button onClick={toggleIsShowProfile}>
                  <ChevronDownIcon className=" text-2xl" />
                </button>
                {isShowProfile && (
                  <div className="flex-col absolute top-full w-28 mt-2 bg-amber-100 text-center rounded-xl shadow-xl">
                    {myprofileDropdownList.map((list, index) => {
                      return (
                        <div className=" hover:text-gray-400 py-1">
                          <Link prefetch={true} href={list.link}>
                            {list.title}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Button
                as={NextLink}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="orange.400"
                href="/user/login"
                _hover={{
                  bg: 'orange.300',
                }}>
                ログイン
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}
