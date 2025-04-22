// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import { BaseRegistry } from "./BaseRegistry.sol";

error MaximumPontuationExceeded();
error InvalidWithdrawalValue();
error InsufficientBalance(uint balance, uint value);
error FailTransferEther();
error MaximumPointsReached();

contract AdvancedRegistry is BaseRegistry {
    uint public eventsCounter;
    mapping(address => uint) public fundsToWithdrawl;

    event AdvancedRegistryEvent(uint indexed counter, string description);
    event DonationReceived(address indexed donor, uint value);
    event WithdrawlMade(address indexed destination, uint value);
    event WithdrawlRequested(address indexed solicitante, uint valor);

    function withdrawlBalance (address payable _destination, uint _value) public onlyOwner {
        require(_value > 0, "Value must be greater than zero.");
        uint currentBalance = address(this).balance;

        require(_value < currentBalance, InsufficientBalance(currentBalance, _value));
        require(_destination != address(0), "Inform a valid address.");

        (bool success,) = _destination.call{value: _value}("");

        if(!success) revert();

        emit WithdrawlMade(_destination, _value);

    }

    function requestWithdrawl( uint _value) public onlyOwner {
        require(_value > 0, "Value must be greater than zero.");
        uint currentBalance = address(this).balance;
        require(_value <= currentBalance, InsufficientBalance(currentBalance, _value));

        fundsToWithdrawl[msg.sender] += _value;

        emit WithdrawlRequested(msg.sender, _value);
        
    }

    function donate() external payable {
        require (msg.value > 0, "Donation value must be greater than zero.");

        emit DonationReceived(msg.sender, msg.value);
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function registryEvent(string memory _description) external override {
        eventsCounter++;
        emit AdvancedRegistryEvent(eventsCounter, _description);
    }

    function definyPontuations(address _user, uint _points) public virtual override onlyOwnerOrAdmin() {
        require(_points <= 1000, MaximumPointsReached());

        super.definyPontuations(_user, _points);
    }

    function getRegistryType() internal virtual  override view returns(string memory) {
        return "Advanced";
    }

    function getType() public view returns (string memory) {
        return getRegistryType();
    }
}