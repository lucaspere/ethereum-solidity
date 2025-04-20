// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {SimplyRegistryDeploy} from "../script/SimplyRegistry.s.sol";
import {SimplyRegistry} from "../src/SimplyRegistry.sol";

contract SimplyRegistryDeployTest is Test {
    SimplyRegistryDeploy deployScript;

    address expectedOwner = address(this);
    string expectedMessage = "Starting my first deployement on Anvil";


    function setUp() public {
        deployScript = new SimplyRegistryDeploy();
    }


function test_Script_DeployAndCheckInitialState() public {
        address deployedAddr = deployScript.run();

        assertNotEq(deployedAddr, address(0), "SCRIPT_RETURNED_ZERO_ADDRESS");

        SimplyRegistry deployedRegistry = SimplyRegistry(payable(deployedAddr));

        // assertEq(deployedRegistry.owner(), expectedOwner, "OWNER_MISMATCH");

        assertEq(deployedRegistry.currentMessage(), expectedMessage, "INITIAL_MESSAGE_MISMATCH");

         if (address(deployedRegistry).code.length > 0) {
             (uint pontuation, bool isAdmin, )= deployedRegistry.userInfos(expectedOwner);
             assertEq(pontuation, 0, "Initial score should be 0");
             assertFalse(isAdmin, "Initial admin status should be false");
         }
    }
}