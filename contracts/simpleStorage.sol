// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 Data Localtions:
 - Storage: State variables
 - Memory: Function parameters, local variables, return values
 - Calldata: Function parameters
 - Stack: Local variables in functions
 */

struct Person {
    uint256 favoriteNumber;
    string favoriteString;
}

contract SimpleStorage {
    uint256 favoriteNumber;
    string favoriteString;
    address payable owner;
    bool isOpen;

    enum Status {
        Open,
        Closed,
        Pending
    }

    Status status;
    Status constant defaultStatus = Status.Open;

    mapping(string => Person) public nameToPerson;
    
    string[] public listOfPeople;
    
    function store(uint256 _favoriteNumber) public {
        Person storage person = nameToPerson["John"];
        person.favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function setStatus(Status _status) external returns (Status) {
        status = _status;
        return status;
    }

    function send() external payable {
        owner.transfer(msg.value);
    }
}
