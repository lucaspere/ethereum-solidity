// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./safeMath.sol";

contract Owner {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner!");

        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
}

contract MyToken is Owner {
        using SafeMath for uint;
    mapping(address => uint) balances;

    function mint(address to, uint amount) public onlyOwner {
        balances[to] = amount;
    }
 }