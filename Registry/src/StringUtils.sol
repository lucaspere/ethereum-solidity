// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

library StringUtils {
    function equals(string memory st1, string memory st2) internal pure returns (bool) {
        
        return keccak256(abi.encodePacked(st1)) == keccak256(abi.encodePacked(st2));
    }
}