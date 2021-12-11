import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export default function Home() {
  const [greetingValue, setGreetingValue] = useState('')

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
      </main>
    </div>
  )
}
