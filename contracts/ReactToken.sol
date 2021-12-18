//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ReactToken is ERC20 {
  constructor() ERC20("React Token", "RCT") {
    _mint(msg.sender, 100000 * 10**18);
  }
}