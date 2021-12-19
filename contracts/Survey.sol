//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Token.sol";
import "hardhat/console.sol";

contract Survey is Token {
    uint violetVotes = 0;
    uint blueVotes = 0;

    function vote(uint color) public {
        require(balances[msg.sender] > 0, "You don't have any tokens to vote");
        balances[msg.sender] -= 1;
        if (color == 1) {
            violetVotes++;
        } else {
            blueVotes++;
        }
    }
}