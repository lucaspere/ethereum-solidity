// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


library SafeMath {
    function addSafe(uint a, uint b) public pure returns(uint) {
        uint c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
}