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

      it("should set the group name", async function () {
        const groupName = "Test Group";
        const tx = await beer4crypto.createGroup(groupName);
        const groupId = await getGroupIdFromTx(tx);

        const actualGroupName = await beer4crypto.getGroupName(groupId);
        expect(actualGroupName).to.equal(groupName);
      });

      it("should add the creator to the group members", async function () {
        const groupName = "Test Group";
        const tx = await beer4crypto.createGroup(groupName);
        const groupId = await getGroupIdFromTx(tx);

        const isMember = await beer4crypto.isMember(groupId, deployer);
        expect(isMember).to.equal(true);
      });

      it("should allow group with existing name", async function () {
        const groupName = "My Group";
        await beer4crypto.createGroup(groupName);
        await expect(beer4crypto.createGroup(groupName)).to.not.be.reverted;
      });
    });
  });
}
