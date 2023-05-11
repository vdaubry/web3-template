// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract Beer4Crypto {
    struct Bet {
        address creator;
        uint256 closingDate;
        uint256 deposit;
        bool ended;
        bytes32 groupid;
    }

    struct Group {
        bytes32 id;
        string name;
    }

    struct Member {
        address memberAddress;
        string nickname;
    }

    mapping(bytes32 => Member[]) private groupMembers;
    mapping(address => Group[]) private memberGroups;

    event GroupCreated(string name, bytes32 id);
    event MemberInvited(
        bytes32 groupId,
        address memberAddress,
        string nickname
    );

    modifier onlyMember(bytes32 groupId) {
        require(
            isMember(groupId, msg.sender),
            "Only members can call this function"
        );
        _;
    }

    function createGroup(
        string memory groupName,
        string memory nickname
    ) public {
        bytes32 groupId = keccak256(
            abi.encodePacked(
                groupName,
                block.timestamp,
                blockhash(block.number)
            )
        );
        Group memory group = Group(groupId, groupName);
        Member memory member = Member(msg.sender, nickname);

        memberGroups[msg.sender].push(group);
        groupMembers[groupId].push(member);

        emit GroupCreated(groupName, groupId);
    }

    function isMember(
        bytes32 groupId,
        address member
    ) public view returns (bool) {
        Member[] memory members = groupMembers[groupId];

        for (uint256 i = 0; i < members.length; i++) {
            if (members[i].memberAddress == member) {
                return true;
            }
        }

        return false;
    }

    function listGroupsForMember(
        address member
    ) public view returns (Group[] memory) {
        return memberGroups[member];
    }

    function listMembersForGroup(
        bytes32 id
    ) public view returns (Member[] memory) {
        return groupMembers[id];
    }

    function inviteMember(
        address memberAddress,
        string memory memberNickname,
        bytes32 groupId
    ) public onlyMember(groupId) {
        Member memory member = Member(memberAddress, memberNickname);
        groupMembers[groupId].push(member);

        emit MemberInvited(groupId, memberAddress, memberNickname);
    }
}
