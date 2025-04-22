// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import {Test, console} from "forge-std/Test.sol";
import {AdvancedRegistry, InsufficientBalance, MaximumPointsReached} from "../src/backend/contracts/Registry/AdvancedRegistry.sol";
import {BaseRegistry, DenyAccessAdminOrOwner} from "../src/backend/contracts/Registry/BaseRegistry.sol";

contract AdvancedRegistryTest is Test {
    AdvancedRegistry registry;
    address owner = address(0xDEADBEEF);
    address user = address(0xCEADBEEB);
    address payable payableUser = payable(address(0xFEADBEED));

    function setUp() public {
        vm.prank(owner);
        registry = new AdvancedRegistry();
    }

    function test_InitialOwner() public view {
        assertEq(registry.owner(), owner, "Wrong initial owner");
    }

    function test_GetType() public view {
        assertEq(registry.getType(), "Advanced", "Wrong type returned");
    }

    function test_definyPontuation_AsOwner() public {
        vm.prank(owner);

        registry.definyPontuations(user, 100);

        (uint pontuation, , ) = registry.userInfos(user);

        assertEq(pontuation, 100, "User pontuation was not correctly defined");
    }

    function testRevert_DefinyPontuation_WithCommumUser() public {
        vm.prank(user);

        vm.expectRevert(DenyAccessAdminOrOwner.selector);

        registry.definyPontuations(user, 50);
    }

    function test_AddAdmin_and_DefinyPontuation_WithAdmin() public {
        vm.prank(owner);

        registry.addAdmin(user);

        vm.prank(user);
        registry.definyPontuations(user, 200);
        (uint pontuation, bool isAdmin, ) = registry.userInfos(user);

        assertEq(pontuation, 200);
        assertTrue(isAdmin);
    }

    function testFuzz_definyPontuation_LimitBehavior(uint256 _points) public {
        vm.prank(owner);

        if (_points <= 1000) {
            registry.definyPontuations(user, _points);

            (uint pontuation, , ) = registry.userInfos(user);

            assertEq(pontuation, _points);
        } else {
            vm.expectRevert(
                abi.encodeWithSelector(
                    MaximumPointsReached.selector,
                    1000,
                    _points
                )
            );

            registry.definyPontuations(user, _points);
        }
    }
}
