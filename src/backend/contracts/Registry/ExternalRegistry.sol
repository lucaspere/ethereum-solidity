// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./IRegistryReader.sol";

contract ExternalReader {
    IRegistryReader public registryReader;
    constructor(address _registryReader) {
        require(_registryReader != address(0), "Registry reader address should not be zero");
        registryReader = IRegistryReader(_registryReader);
    }

    function currentMessage() external view returns (string memory) {
        return registryReader.currentMessage();
    }

    function readOwnerRegistry() public view returns(address) {
        return registryReader.owner();
    }


}