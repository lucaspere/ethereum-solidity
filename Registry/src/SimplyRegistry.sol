// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import {BaseRegistry} from "./BaseRegistry.sol";
import "./StringUtils.sol";

contract SimplyRegistry is BaseRegistry {
    using StringUtils for string;
    string public currentMessage;


    event MessageUpdated (
        string newMessage
    );

    event SimplyEventRegistred(string description);

    function registryEvent(string memory _description) external override {

    }


    constructor(string memory _initialMessage) {
        currentMessage = _initialMessage;
    }

    function updateMessage(string memory _message) public {
        if(!currentMessage.equals(_message)) {
            currentMessage = _message;

            emit MessageUpdated(currentMessage);
        } else {
            revert("New message equal to the current one");
        }
    }

    function myPontuation() public view returns(uint) {
        UserInfo storage user = userInfos[msg.sender];
        return user.pontuation;
    }

    function getRegistryType() internal virtual override view returns (string memory) {
        return "Simple";
    }

    function getType() public view returns (string memory) {
        return getRegistryType();
    }
}

