import {
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  useTheme,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Button, Box } from '@chakra-ui/react'
import { useColorMode, InputLeftElement, InputGroup } from '@chakra-ui/react'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'
import Token from '../artifacts/contracts/Token.sol/Token.json'
import styles from '../styles/Home.module.css'
import { BsMoonFill, BsFillSunFill } from 'react-icons/bs'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { BiCoin, BiMessageRounded } from 'react-icons/bi'
import { GiWavyChains } from 'react-icons/gi'

const greeterAddress = '0x8Cdb2Ab9C7F6019787ed1878EB05D1467E48Ab83'
const tokenAddress = '0xbb0c8942e03542E2eB28F49F1763412caC0C50f3'

export default function Home() {
  const [chainGreeting, setChainGreeting] = useState('')
  const [isFetchingGreeting, setIsFetchingGreeting] = useState(false)
  const [greetingValue, setGreetingValue] = useState('')
  const [isSettingGreeting, setIsSettingGreeting] = useState(false)

  const [balance, setBalance] = useState('')
  const [isGettingBalance, setIsGettingBalance] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const [isSending, setIsSending] = useState(false)

  const { colorMode, toggleColorMode } = useColorMode()
  const chakraTheme = useTheme()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (!window.ethereum) return
    setIsFetchingGreeting(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
    try {
      const data = await contract.greet()
      setChainGreeting(data)
      setIsFetchingGreeting(false)
    } catch (err) {
      console.log('Error: ', err)
      setIsFetchingGreeting(false)
    }
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greetingValue || !window.ethereum) return
    setIsSettingGreeting(true)
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
    const transaction = await contract.setGreeting(greetingValue)
    await transaction.wait()
    setGreetingValue('')
    setIsSettingGreeting(false)
  }

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
    console.log(`Sending ${amount} tokens to account ${toAddress} ...`)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
    const transaction = await contract.transfer(toAddress, amount)
    await transaction.wait()
    console.log(`${amount} tokens sent to ${toAddress}`)
    setIsSending(false)
  }

  // fetch initial greeting on load
  useEffect(() => {
    fetchGreeting()
  }, [])

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
              justifyContent="space-around"
            >
              <Box>Contract greeting:</Box>
              <Box textDecoration={'underline'}>{chainGreeting}</Box>
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
                placeholder="Greeting text"
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
              py={4}
              textAlign={'center'}
              display="flex"
              justifyContent="space-around"
            >
              <Box>Token balance:</Box>
              <Box textDecoration={'underline'}>
                {balance || 'Get balance 👇'}
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
                placeholder="Number of abk tokens"
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
