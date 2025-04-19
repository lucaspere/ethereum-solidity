// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import {Test, console} from "forge-std/Test.sol";
import "../src/StringUtils.sol";


contract StringUtilsTest is Test {
    using StringUtils for string;

    function test_StringsAreEquals() public pure {
        string memory str1 = "Hello my man";
        string memory str2 = "Hello my man";
        assert(str1.equals(str2));
    }

    function test_StringsAreNotEquals() public pure {
        string memory str1 = "Hello my man";
        string memory str2 = "My name is Lucas";
        assert(!str1.equals(str2));
    }
}
