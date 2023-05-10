// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

contract Beer4Crypto {
    struct Bet {
        address creator;
        uint256 closingDate;
        uint256 deposit;
        bool ended;
        mapping(address => uint256) predictions;
        address[] participants;
    }

    mapping(bytes32 => Group) private groups;

    struct Group {
        bytes32 id;
        string name;
        mapping(address => bool) members;
        Bet[] bets;
    }

    event GroupCreated(string name, bytes32 id);

    function createGroup(string memory groupName) public {
        bytes32 groupId = keccak256(
            abi.encodePacked(
                groupName,
                block.timestamp,
                blockhash(block.number)
            )
        );
        Group storage group = groups[groupId];

        group.id = groupId;
        group.name = groupName;
        group.members[msg.sender] = true;

        emit GroupCreated(groupName, groupId);
    }

    function getGroupName(bytes32 groupId) public view returns (string memory) {
        return groups[groupId].name;
    }

    function isMember(
        bytes32 groupId,
        address member
    ) public view returns (bool) {
        return groups[groupId].members[member];
    }
}
