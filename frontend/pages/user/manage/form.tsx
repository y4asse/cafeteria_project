'use client'

import { useState } from 'react'
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
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'

const Form1 = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
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
          <Input id="title" placeholder="タイトル" />
        </FormControl>
        

      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="contents" fontWeight={'normal'}>
          内容
        </FormLabel>
        <Input id="text" type="text" />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="university_name" fontWeight={'normal'}>
          大学名
        </FormLabel>
        <Input id="text" type="text" />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel>
          投稿写真
        </FormLabel>
        <Input id="file" type="file" />
      </FormControl>

    </>
  )
}


export default function Multistep() {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

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
       <Form1/>
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                w="7rem"
                onClick={() => {
                }}
                colorScheme="teal"
                variant="outline">
                投稿する
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}