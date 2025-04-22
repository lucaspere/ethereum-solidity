// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import {Test, console} from "forge-std/Test.sol";

error DenyAccessOnlyOwner();
error DenyAccessOnlyAdmin();
error DenyAccessAdminOrOwner();

error AddressCannotBeZero();
error UserIsNotAdmin();
error UserAlreadyIsAdmin();

abstract contract BaseRegistry {
    address public owner;

    struct UserInfo {
        uint pontuation;
        bool isAdmin;
        uint updated_at;
    }

    mapping(address => UserInfo) public userInfos;


    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);


    event newPoints (
        address indexed inuser,
        uint points
    );


    constructor() {
         console.log("Test1",msg.sender);
        owner = msg.sender;
    }


    function addAdmin(address _newAdmin) public onlyOwner {
        require(_newAdmin != address(0), AddressCannotBeZero());

        UserInfo storage user = userInfos[_newAdmin];
        require(!user.isAdmin, UserAlreadyIsAdmin());

        user.isAdmin= true;
        user.updated_at = block.timestamp;

        emit AdminAdded(_newAdmin);
    }

    function removeAdmin(address _admin) public onlyOwner {
        require(_admin != address(0), AddressCannotBeZero());

        UserInfo storage user = userInfos[_admin];
        require(!user.isAdmin, UserIsNotAdmin());   

        user.isAdmin = false;
        user.updated_at = block.timestamp;

        emit AdminRemoved(_admin);
    }

    function definyPontuations(address _user, uint _points) public virtual onlyOwnerOrAdmin {
        require(_user != address(0), AddressCannotBeZero());
        UserInfo storage user = userInfos[_user];
        user.pontuation = _points;
        user.updated_at = block.timestamp;

        emit newPoints(_user, user.pontuation);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, DenyAccessOnlyOwner());
        _;
    }
    modifier onlyAdmin() {
        UserInfo storage user = userInfos[msg.sender];
        require(user.isAdmin, DenyAccessOnlyAdmin());
        _;
    }
    modifier onlyOwnerOrAdmin() {
        UserInfo storage user = userInfos[msg.sender];
        require(owner == msg.sender || user.isAdmin, DenyAccessAdminOrOwner());
        _;
    }

    function registryEvent(string memory _description) external virtual;

    function getRegistryType() internal virtual returns (string memory) {
        return "Base";
    }

}