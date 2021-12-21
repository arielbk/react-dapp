const hre = require('hardhat')

async function main() {
  // const Greeter = await hre.ethers.getContractFactory('Greeter')
  // const greeter = await Greeter.deploy('Hello, Hardhat!')
  // await greeter.deployed()
  // console.log('Greeter deployed to:', greeter.address)

  // const Token = await hre.ethers.getContractFactory('Token')
  // const token = await Token.deploy()
  // await token.deployed()
  // console.log('Token deployed to:', token.address)

  // new erc20 token
  // const ReactToken = await hre.ethers.getContractFactory('ReactToken')
  // const reactToken = await ReactToken.deploy()
  // await reactToken.deployed()
  // console.log('React Token deployed to:', reactToken.address)

  // survey
  const Survey = await hre.ethers.getContractFactory('Survey')
  const survey = await Survey.deploy()
  await survey.deployed()
  console.log('Survey deployed to:', survey.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
