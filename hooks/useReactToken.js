import { ethers } from 'ethers'
import { useState } from 'react'
import Token from '../artifacts/contracts/Token.sol/Token.json'

const tokenAddress = '0xd6021EEFA6acFaEFEaC7F735fFBAeB5D2E70084D'

export default function useReactToken() {
  const [balance, setBalance] = useState('')
  const [isFetchingBalance, setIsFetchingBalance] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)

  // get current user token balance
  async function getBalance() {
    if (!window.ethereum) return
    setIsFetchingBalance(true)
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    console.log('Getting balance for account: ', account)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
    const balance = await contract.balanceOf(account)
    setBalance(balance.toString())
    setIsFetchingBalance(false)
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

  async function claimTokens() {
    if (!window.ethereum) return
    setIsClaiming(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      console.log(`Sending tokens to account ${signer} ...`)
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      const transaction = await contract.claimTokens()
      await transaction.wait()
      console.log('Tokens claimed')
    } catch (err) {
      console.error(err)
    }
    setIsClaiming(false)
  }

  return {
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
  }
}
