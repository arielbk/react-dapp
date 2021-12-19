import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorMode,
} from '@chakra-ui/react'
import Head from 'next/head'
import { BiCoin, BiMessageRounded } from 'react-icons/bi'
import { BsFillSunFill, BsGithub, BsMoonFill } from 'react-icons/bs'
import { GiWavyChains } from 'react-icons/gi'
import { MdOutlineAccountCircle } from 'react-icons/md'
import useGreeting from '../hooks/useGreeting'
import useReactToken from '../hooks/useReactToken'
import styles from '../styles/Home.module.css'

export default function Home() {
  const {
    chainGreeting,
    fetchGreeting,
    greetingValue,
    setGreetingValue,
    isFetchingGreeting,
    setGreeting,
    isSettingGreeting,
  } = useGreeting()

  const {
    getBalance,
    balance,
    isFetchingBalance,
    toAddress,
    setToAddress,
    amount,
    setAmount,
    isSending,
    sendTokens,
    claimTokens,
    isClaiming,
  } = useReactToken()

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div className={styles.container}>
      <Head>
        <title>React dApp</title>
        <meta
          name="description"
          content="Testing out a fullstack React dApp workflow"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={8}
          width="100%"
          maxWidth="500px"
        >
          <Heading>
            <Box display="inline-block" mr="4" color="blue.400">
              <GiWavyChains />
            </Box>
            React dApp
          </Heading>
          <Box>
            <a href="https://github.com/arielbk/react-dapp">
              <IconButton icon={<BsGithub />} aria-label="Github" mr={4} />
            </a>
            <IconButton
              icon={colorMode === 'light' ? <BsFillSunFill /> : <BsMoonFill />}
              onClick={toggleColorMode}
              aria-label="Toggle dark mode"
            />
          </Box>
        </Flex>

        <Stack spacing={4} width="100%" maxWidth="500px">
          {/* <Stack
            borderWidth={1}
            p={4}
            borderRadius={12}
            spacing={4}
            boxShadow={`0 0px 1px rgba(${
              colorMode === 'light' ? '0,0,0' : '255,255,255'
            },0.1)`}
            _hover={{
              boxShadow: `0 5px 30px rgba(${
                colorMode === 'light' ? '0,0,0' : '255,255,255'
              },0.1)`,
            }}
            transition="0.3s"
          >
            <Heading
              size="md"
              p={4}
              textAlign={'center'}
              display="flex"
              justifyContent="space-between"
            >
              <Box>Greeting:</Box>
              <Box fontWeight="400">{chainGreeting}</Box>
            </Heading>
            <Button onClick={fetchGreeting} isLoading={isFetchingGreeting}>
              Fetch greeting
            </Button>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Box fontSize="1.3rem" opacity="0.3">
                  <BiMessageRounded />
                </Box>
              </InputLeftElement>
              <Input
                onChange={(e) => setGreetingValue(e.target.value)}
                value={greetingValue}
                placeholder="Greeting text"
                disabled={isSettingGreeting}
              />
            </InputGroup>
            <Button
              onClick={setGreeting}
              isLoading={isSettingGreeting}
              colorScheme={'blue'}
              variant={'outline'}
            >
              Set greeting
            </Button>
          </Stack> */}
          <Stack
            borderWidth={1}
            p={4}
            spacing={4}
            borderRadius={12}
            boxShadow={`0 0px 1px rgba(${
              colorMode === 'light' ? '0,0,0' : '255,255,255'
            },0.1)`}
            _hover={{
              boxShadow: `0 5px 30px rgba(${
                colorMode === 'light' ? '0,0,0' : '255,255,255'
              },0.1)`,
            }}
            transition="0.3s"
          >
            <Heading
              size="md"
              p={4}
              textAlign={'center'}
              display="flex"
              justifyContent="space-between"
            >
              <Box>React tokens:</Box>
              <Box fontWeight="400">{balance || 'Get balance 👇'}</Box>
            </Heading>
            <Button onClick={getBalance} isLoading={isFetchingBalance}>
              Get balance
            </Button>
            {/* <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Box fontSize="1.3rem" opacity="0.3">
                  <MdOutlineAccountCircle />
                </Box>
              </InputLeftElement>
              <Input
                onChange={(e) => setToAddress(e.target.value)}
                placeholder="To account"
                value={toAddress}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Box fontSize="1.3rem" opacity="0.3">
                  <BiCoin />
                </Box>
              </InputLeftElement>
              <Input
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Number of react tokens"
                value={amount}
              />
            </InputGroup> */}
            <Button
              onClick={claimTokens}
              isLoading={isClaiming}
              colorScheme="blue"
              variant={'outline'}
            >
              Claim tokens
            </Button>
          </Stack>
        </Stack>
      </main>
    </div>
  )
}
