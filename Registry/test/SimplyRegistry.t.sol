// Em: test/SimplyRegistryDeploy.t.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {SimplyRegistryDeploy} from "../script/SimplyRegistry.s.sol";
import {SimplyRegistry} from "../src/SimplyRegistry.sol";
import {BaseRegistry} from "../src/BaseRegistry.sol";

contract SimplyRegistryDeployTest is Test {

    SimplyRegistryDeploy deployedScript;

    address expectedOwner = address(this);

    string expectedMessage = "Starting my frist deployement on Anvil";

    function setUp() public {
        deployedScript = new SimplyRegistryDeploy();
    }

    function test_Script_DeployAndCheckInitialState() public {
        address deployedAddr = deployedScript.run();

        assertNotEq(deployedAddr, address(0));
        
        SimplyRegistry deployedRegistry = SimplyRegistry(payable(deployedAddr));

        assertEq(deployedRegistry.owner(), expectedOwner);
        assertEq(deployedRegistry.currentMessage(), expectedMessage);
    }

}