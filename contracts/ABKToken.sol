//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ABKToken is ERC20 {
  constructor() ERC20("ABK Token", "ABKT") {
    _mint(msg.sender, 100000 * 10**18);
  }
}