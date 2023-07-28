import { Box, Flex, Heading, Button } from "./Common";
import NextLink from "next/link";
import "../styles/header.css";

console.log("Have a good day 😄");
export default function Header() {
  return (
    <header className="header_body">
        <Box as="header">
        <Flex
            bg="white"
            color="gray.600"
            minH={"60px"}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle="solid"
            borderColor="gray.200"
            align="center"
            backgroundColor="#FBCF86"
        >
            <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
            <Heading as="h1" size="lg">
                <NextLink href="/">Cafeteria_Database</NextLink>
            </Heading>

            {/* ログインボタンとマイページボタンを作る */}
            <Button
                as={NextLink}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="orange.400"
                href="/user/login"
                _hover={{
                bg: "orange.300",
                }}
            >
                ログイン
            </Button>
            </Flex>
        </Flex>
        </Box>
    </header>
  );
}