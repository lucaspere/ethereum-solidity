// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import {console} from "forge-std/Test.sol";
import {Script} from "forge-std/Script.sol";
import {SimplyRegistry} from "../src/SimplyRegistry.sol";

contract SimplyRegistryDeploy is Script {
    SimplyRegistry public registry;

    function run() public returns (address deployedAddress) {
        vm.startBroadcast();
        SimplyRegistry registry = new SimplyRegistry("Starting my first deployement on Anvil");

        vm.stopBroadcast();
        deployedAddress = address(registry);
    }
}