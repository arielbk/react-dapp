//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
  string public name = "react token";
  string public symbol = "RCT";
  mapping (address => uint) balances;

  constructor() {
    balances[msg.sender] = 100;
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

  function claimTokens() external {
    console.log("claimTokens");
    require(balances[msg.sender] == 0, "No tokens to claim");
    balances[msg.sender] = 100;
  }
}
