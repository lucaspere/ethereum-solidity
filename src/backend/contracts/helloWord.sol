// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract HelloWorld {
    string public message = "Hello, World!";
    uint public counter = 0;

    struct Task {
        string description;
        bool completed;
    }

    struct Student {
        uint id;
        string name;
        uint[] grades;
    }

    event StudentAdded(uint indexed _id, string _name);
    event GradeAdded(uint indexed _studentId, uint _grade);
    mapping (uint => Student) public students;

    Task[] public tasks;


    function addStudent(uint _id, string memory _name) public {
        Student memory newStudent = Student({
            id: _id,
            name: _name,
            grades: new uint[](0)
        });

        students[_id] = newStudent;
        emit StudentAdded(_id, _name);
    }

    function addGrade(uint _studentId, uint _grade) public {
        students[_studentId].grades.push(_grade);
        emit GradeAdded(_studentId, _grade);
    }

    function getStudent(uint _studentId) public view returns (Student memory) {
        return students[_studentId];
    }

    function addTask(string memory _description) public {
        Task memory newTask = Task({
            description: _description,
            completed: false
        });

        tasks.push(newTask);
    }

    function toggleTask(uint _index) public {
        tasks[_index].completed = !tasks[_index].completed;
    }

    function deleteTask(uint _index) public {
        require(_index < tasks.length, "Index out of bounds");
        
        tasks[_index] = tasks[tasks.length - 1];
        tasks.pop();
    }

    event TransactionHistory(address indexed _address, string _tx);

    mapping (address => uint) public balances;
    mapping (address => string) public whitelist;

    function  deposit() payable public {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        
        balances[msg.sender] -= _amount;
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "Failed to send Ether");

    }

    receive() external payable {}
    function addToWhitelist(string memory _name) external {
        whitelist[msg.sender] = _name;
    }

    function getWhitelist(address _address) external view returns (string memory) {
        return whitelist[_address];
    }

    function removeFromWhitelist() external {
        delete whitelist[msg.sender];
    }

    function increament() public {
        counter += 1;
    }

    function decrement() public {
        require(counter > 0, "Counter cannot be less than 0");
        counter -= 1;
    }

    function setMessage(string memory _message) public {
        message = _message;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function findIndex(uint[] memory arr, uint _id) external pure returns (int) {
        for (uint i = 0; i < arr.length; i++) {
            if (arr[i] == _id) {
                return int(i);
            }
        }
        return int(-1);
    }

    function removeByIndex(Task[] storage arr, uint _index) internal {
    require(_index < arr.length, "Index out of bounds");
    arr[_index] = arr[arr.length - 1];
    arr.pop();
}
}
