import { useState } from 'react'
import { ethers } from 'ethers'
import Token from '../artifacts/contracts/ReactToken.sol/ReactToken.json'

const tokenAddress = '0xeF3f55D4C7e61094E18B455f742D06BC2F87f669'

export default function useReactToken() {
  const [balance, setBalance] = useState('')
  const [isFetchingBalance, setIsFetchingBalance] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const [isSending, setIsSending] = useState(false)

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
  }
}
