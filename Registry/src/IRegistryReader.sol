// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface IRegistryReader {
    function currentMessage() external view returns (string memory);

    function owner() external view returns (address);

    function pontuations(address _user) external view returns (uint);
}