// SPDX-License-Identifier: GNU

pragma solidity ^0.8.13;

contract Greeter {
	uint256 counter;
	string private greeting;

	event GREETING_CHANGING(string from, string to);
	event GREETING_CHANGED(string greeting);

	constructor(string memory _greeting) {
		greeting = _greeting;
		counter = 0;
	}

	function greet() public view returns (string memory) {
		return greeting;
	}

	function setGreeting(string memory _greeting) public returns (bool, string memory) {
		emit GREETING_CHANGING(greeting, _greeting);
		greeting = _greeting;
		emit GREETING_CHANGED(greeting);
		return (true, greeting);
	}

	function increment() public {
		counter = counter + 1;
	}
}
