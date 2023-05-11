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
    }

    struct Group {
        bytes32 id;
        string name;
    }

    struct Member {
        address member;
        string nickname;
    }

    mapping(bytes32 => Group) private groups;
    mapping(bytes32 => mapping(address => bool)) private groupMembers;
    mapping(address => Group[]) private memberGroups;

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
        groupMembers[groupId][msg.sender] = true;
        memberGroups[msg.sender].push(Group(groupId, groupName));

        emit GroupCreated(groupName, groupId);
    }

    function getGroup(bytes32 groupId) public view returns (Group memory) {
        return groups[groupId];
    }

    function isMember(
        bytes32 groupId,
        address member
    ) public view returns (bool) {
        return groupMembers[groupId][member];
    }

    function listGroupsForMember(
        address member
    ) public view returns (Group[] memory) {
        return memberGroups[member];
    }
}
