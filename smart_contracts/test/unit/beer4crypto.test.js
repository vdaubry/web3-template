const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

if (!developmentChains.includes(network.name)) {
  describe.skip;
} else {
  describe("beer4crypto", () => {
    let deployer, provider;

    beforeEach(async () => {
      await deployments.fixture(["all"]);
      deployer = (await getNamedAccounts()).deployer;
      provider = ethers.provider;

      beer4crypto = await ethers.getContract("Beer4Crypto", deployer);
    });

    const getGroupIdFromTx = async (tx) => {
      const receipt = await tx.wait();
      const event = receipt.events?.find(
        (event) => event.event === "GroupCreated"
      );
      return event?.args?.id;
    };

    const createGroup = async (
      groupName = "Test Group",
      userNickname = "Test User"
    ) => {
      const tx = await beer4crypto.createGroup(groupName, userNickname);
      const groupId = await getGroupIdFromTx(tx);
      return groupId;
    };

    describe("createGroup", function () {
      it("should emit GroupCreated event", async function () {
        const tx = await beer4crypto.createGroup("foo", "bar");
        const receipt = await tx.wait();
        const event = receipt.events?.find(
          (event) => event.event === "GroupCreated"
        );

        expect(event?.args?.name).to.equal("foo");
        expect(event?.args?.id).to.exist;
      });

      it("should allow group with existing name", async function () {
        const groupName = "My Group";
        await beer4crypto.createGroup(groupName, "foo");
        await expect(beer4crypto.createGroup(groupName, "foo")).to.not.be
          .reverted;
      });
    });

    describe("isMember", function () {
      it("should add the creator to the group members", async function () {
        const groupId = await createGroup();

        const isMember = await beer4crypto.isMember(groupId, deployer);
        expect(isMember).to.equal(true);
      });
    });

    describe("ListGroupsForMember", function () {
      it("should return the group ids", async function () {
        const groupId = await createGroup("MyGroup");

        const groupIds = await beer4crypto.listGroupsForMember(deployer);
        expect(groupIds[0].id).to.equal(groupId);
        expect(groupIds[0].name).to.equal("MyGroup");
      });
    });

    describe("ListMembersForgroup", function () {
      it("should return the members for a group", async function () {
        const groupId = await createGroup("MyGroup", "DeployerNickname");

        const members = await beer4crypto.listMembersForGroup(groupId);
        expect(members[0].memberAddress).to.equal(deployer);
        expect(members[0].nickname).to.equal("DeployerNickname");
      });
    });
  });
}
