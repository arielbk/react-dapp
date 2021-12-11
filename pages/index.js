import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'
import Token from '../artifacts/contracts/Token.sol/Token.json'

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const tokenAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'

export default function Home() {
  const [greetingValue, setGreetingValue] = useState('')
  const [userAccount, setUserAccount] = useState('')
  const [amount, setAmount] = useState(0)

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      )
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greetingValue) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greetingValue)
      await transaction.wait()
      setGreetingValue('')
      fetchGreeting()
    }
  }

  // get current user token balance
  async function getBalance() {
    if (typeof window.ethereum === 'undefined') {
      return
    }
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
    const balance = await contract.balanceOf(account)
    console.log('Balance:', balance.toString())
  }

  // send token to another user
  async function sendTokens() {
    if (typeof window.ethereum === 'undefined') {
      return
    }
    console.log(`Sending ${amount} tokens to account ${userAccount} ...`)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
    const transaction = await contract.transfer(userAccount, amount)
    await transaction.wait()
    console.log(`${amount} tokens sent to ${userAccount}`)
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
        <h1>React dApp</h1>
        <button onClick={fetchGreeting}>Fetch greeting</button>
        <button onClick={setGreeting}>Set greeting</button>
        <input
          onClick={(e) => setGreetingValue(e.target.value)}
          placeholder="Greeting text"
        />
        <hr />
        <button onClick={getBalance}>Get balance</button>
        <input
          onClick={(e) => setUserAccount(e.target.value)}
          placeholder="User Account"
        />
        <input
          onClick={(e) => setAmount(e.target.value)}
          placeholder="Number of abk tokens"
        />
        <button onClick={sendTokens}>Send tokens</button>
      </main>
    </div>
  )
}
