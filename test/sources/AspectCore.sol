// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface AspectCore {
    struct KVPair {
        string key;
        string value;
    }

    struct AspectBoundInfo {
        address aspectId;
        uint256 priority;
    }

    function deploy(bytes calldata code, KVPair[] calldata properties) external;

    function bind(address aspectId, uint256 aspectVersion,
        address contractAddr, uint8 priority) external;

    function unbind(address aspectId, address contractAddr) external;

    function changeVersion(address aspectId, address contractAddr, uint256 version) external;

    function upgrade(address apsectId, bytes calldata code, KVPair[] calldata properties) external;

    function versionOf(address aspectId) external view returns (uint256);

    function aspectsOf(address contractAddr) external view returns (AspectBoundInfo[] memory);

    function contractsOf(address aspectId) external view returns (address[] memory);
}

contract AspectCoreMock is AspectCore {
    function deploy(bytes calldata code, KVPair[] calldata properties) external {

    }

    function bind(address aspectId, uint256 aspectVersion,
        address contractAddr, uint8 priority) external {

    }

    function unbind(address aspectId, address contractAddr) external {

    }

    function changeVersion(address aspectId, address contractAddr, uint256 version) external {

    }

    function upgrade(address apsectId, bytes calldata code, KVPair[] calldata properties) external {

    }

    function versionOf(address aspectId) external view returns (uint256) {
        return 1;
    }

    function aspectsOf(address contractAddr) external view returns (AspectBoundInfo[] memory aspects) {
    }

    function contractsOf(address aspectId) external view returns (address[] memory contracts) {
    }
}
