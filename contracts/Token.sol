//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
  string public name = "arielbk token";
  string public symbol = "ABKT";
  uint public totalSupply = 1000;
  mapping (address => uint) balances;

  constructor() {
    balances[msg.sender] = totalSupply;
  }

  function transfer(address to, uint amount) external {
    console.log("transfer", to, amount);
    require(balances[msg.sender] >= amount, "Not enough tokens");
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }

  function balanceOf(address account) external view returns (uint) {
    console.log("balanceOf", account);
    return balances[account];
  }
}
