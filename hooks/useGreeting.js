import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'

const greeterAddress = '0x8Cdb2Ab9C7F6019787ed1878EB05D1467E48Ab83'

export default function useGreeting() {
  const [chainGreeting, setChainGreeting] = useState('')
  const [isFetchingGreeting, setIsFetchingGreeting] = useState(false)
  const [greetingValue, setGreetingValue] = useState('')
  const [isSettingGreeting, setIsSettingGreeting] = useState(false)

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

  // fetch initial greeting on load
  useEffect(() => {
    fetchGreeting()
  }, [])

  return {
    chainGreeting,
    fetchGreeting,
    greetingValue,
    setGreetingValue,
    isFetchingGreeting,
    setGreeting,
    isSettingGreeting,
  }
}
