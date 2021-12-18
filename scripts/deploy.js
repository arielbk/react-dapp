const hre = require('hardhat')

async function main() {
  const Greeter = await hre.ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy('Hello, Hardhat!')
  await greeter.deployed()
  console.log('Greeter deployed to:', greeter.address)

  const Token = await hre.ethers.getContractFactory('Token')
  const token = await Token.deploy()
  await greeter.deployed()
  console.log('Token deployed to:', token.address)

  const ReactToken = await hre.ethers.getContractFactory('ReactToken')
  const reactToken = await ReactToken.deploy()
  await reactToken.deployed()
  console.log('React Token deployed to:', token.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
