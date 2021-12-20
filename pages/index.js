import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  useColorMode,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { BiNetworkChart } from 'react-icons/bi'
import { BsFillSunFill, BsGithub, BsMoonFill } from 'react-icons/bs'
import { GiWavyChains } from 'react-icons/gi'
import Error from '../components/Error'
import useReactToken from '../hooks/useReactToken'
import styles from '../styles/Home.module.css'

const VoteButton = ({ onClick, color, text }) => {
  return (
    <Button onClick={onClick} _hover={{ color }}>
      {text}
    </Button>
  )
}

export default function Home() {
  const {
    getBalance,
    balance,
    isFetchingBalance,
    claimTokens,
    isClaiming,
    getVotes,
    castVote,
  } = useReactToken()

  const { colorMode, toggleColorMode } = useColorMode()
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(true)

  const checkNetwork = useCallback(async () => {
    if (!window.ethereum) return
    console.log('checks network')
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const { name } = await provider.getNetwork()
      if (name === 'ropsten') {
        setIsCorrectNetwork(true)
      } else {
        setIsCorrectNetwork(false)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    checkNetwork()
    const networkChecker = setInterval(checkNetwork, 5000)
    return () => clearInterval(networkChecker)
  }, [checkNetwork])

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
        {!isCorrectNetwork && (
          <Error>
            <BiNetworkChart />
            <Box ml={4}>You must connect to the Ropsten network</Box>
          </Error>
        )}

        <Stack spacing={4} width="100%" maxWidth="500px">
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
            <Button
              onClick={getBalance}
              isLoading={isFetchingBalance}
              disabled={!isCorrectNetwork || isFetchingBalance}
            >
              Get balance
            </Button>
            <Button
              onClick={claimTokens}
              isLoading={isClaiming}
              colorScheme="blue"
              variant={'outline'}
              disabled={!isCorrectNetwork || isClaiming}
            >
              Claim tokens
            </Button>
          </Stack>
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
            display="flex"
            justifyContent="space-between"
          >
            <Flex justifyContent={'space-around'}>
              <VoteButton onClick={() => castVote(0)} text="ultraviolet" />
              <VoteButton onClick={() => castVote(1)} text="neonblue" />
            </Flex>
            <Button onClick={getVotes}>Get votes</Button>
          </Stack>
        </Stack>
      </main>
    </div>
  )
}
