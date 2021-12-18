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
import { ethers } from 'ethers'
import Head from 'next/head'
import { useState } from 'react'
import { BiCoin, BiMessageRounded } from 'react-icons/bi'
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs'
import { GiWavyChains } from 'react-icons/gi'
import { MdOutlineAccountCircle } from 'react-icons/md'
import Token from '../artifacts/contracts/ReactToken.sol/ReactToken.json'
import useGreeting from '../hooks/useGreeting'
import styles from '../styles/Home.module.css'

const tokenAddress = '0xeF3f55D4C7e61094E18B455f742D06BC2F87f669'

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

  const [balance, setBalance] = useState('')
  const [isGettingBalance, setIsGettingBalance] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const [isSending, setIsSending] = useState(false)

  const { colorMode, toggleColorMode } = useColorMode()

  // get current user token balance
  async function getBalance() {
    if (!window.ethereum) return
    setIsGettingBalance(true)
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    console.log('Getting balance for account: ', account)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
    const balance = await contract.balanceOf(account)
    setBalance(balance.toString())
    setIsGettingBalance(false)
  }

  // send token to another user
  async function sendTokens() {
    if (!amount || !window.ethereum) return
    setIsSending(true)
    const wholeTokens = BigInt(amount * 10 ** 18)
    console.log(`Sending ${wholeTokens} tokens to account ${toAddress} ...`)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
    const transaction = await contract.transfer(toAddress, wholeTokens)
    await transaction.wait()
    console.log(`${wholeTokens} tokens sent to ${toAddress}`)
    setIsSending(false)
  }

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
          <IconButton
            icon={colorMode === 'light' ? <BsFillSunFill /> : <BsMoonFill />}
            onClick={toggleColorMode}
          />
        </Flex>
        <Stack spacing={4} width="100%" maxWidth="500px">
          <Stack
            borderWidth={1}
            p={4}
            borderRadius={12}
            spacing={4}
            _hover={{
              boxShadow: '0 5px 30px rgba(0,0,0,0.1)',
              transition: '0.3s',
            }}
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
          </Stack>
          <Stack
            borderWidth={1}
            p={4}
            spacing={4}
            borderRadius={12}
            _hover={{
              boxShadow: '0 5px 30px rgba(0,0,0,0.1)',
              transition: '0.3s',
            }}
          >
            <Heading
              size="md"
              p={4}
              textAlign={'center'}
              display="flex"
              justifyContent="space-between"
            >
              <Box>React tokens:</Box>
              <Box fontWeight="400">
                {balance ? (balance / 10 ** 18).toFixed(2) : 'Get balance 👇'}
              </Box>
            </Heading>
            <Button onClick={getBalance} isLoading={isGettingBalance}>
              Get balance
            </Button>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Box fontSize="1.3rem" opacity="0.3">
                  <MdOutlineAccountCircle />
                </Box>
              </InputLeftElement>
              <Input
                onChange={(e) => setToAddress(e.target.value)}
                placeholder="To account"
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
            </InputGroup>
            <Button
              onClick={sendTokens}
              isLoading={isSending}
              colorScheme="blue"
              variant={'outline'}
            >
              Send tokens
            </Button>
          </Stack>
        </Stack>
      </main>
    </div>
  )
}
