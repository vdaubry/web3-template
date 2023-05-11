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

    describe("createGroup", function () {
      it("should emit GroupCreated event", async function () {
        const groupName = "Test Group";
        const tx = await beer4crypto.createGroup(groupName);
        const receipt = await tx.wait();
        const event = receipt.events?.find(
          (event) => event.event === "GroupCreated"
        );

        expect(event?.args?.name).to.equal(groupName);
        expect(event?.args?.id).to.exist;
      });

      it("should allow group with existing name", async function () {
        const groupName = "My Group";
        await beer4crypto.createGroup(groupName);
        await expect(beer4crypto.createGroup(groupName)).to.not.be.reverted;
      });
    });

    describe("getGroup", function () {
      it("should set the group name", async function () {
        const groupName = "Test Group";
        const tx = await beer4crypto.createGroup(groupName);
        const groupId = await getGroupIdFromTx(tx);

        const group = await beer4crypto.getGroup(groupId);
        expect(group.name).to.equal(groupName);
      });
    });

    describe("isMember", function () {
      it("should add the creator to the group members", async function () {
        const groupName = "Test Group";
        const tx = await beer4crypto.createGroup(groupName);
        const groupId = await getGroupIdFromTx(tx);

        const isMember = await beer4crypto.isMember(groupId, deployer);
        expect(isMember).to.equal(true);
      });
    });

    describe("ListGroupsForMember", function () {
      it("should return the group ids", async function () {
        const groupName = "Test Group";
        const tx = await beer4crypto.createGroup(groupName);
        const groupId = await getGroupIdFromTx(tx);

        const groupIds = await beer4crypto.listGroupsForMember(deployer);
        expect(groupIds[0].id).to.equal(groupId);
        expect(groupIds[0].name).to.equal(groupName);
      });
    });
  });
}
