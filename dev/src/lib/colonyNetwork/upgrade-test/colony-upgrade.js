/* globals artifacts */
import { hexToUtf8 } from "web3-utils";
import { getTokenArgs } from "../helpers/test-helper";
import { setupColonyVersionResolver } from "../helpers/upgradable-contracts";

const IColonyNetwork = artifacts.require("IColonyNetwork");
const EtherRouter = artifacts.require("EtherRouter");
const Resolver = artifacts.require("Resolver");
const IColony = artifacts.require("IColony");
const ColonyTask = artifacts.require("ColonyTask");
const ColonyFunding = artifacts.require("ColonyFunding");
const UpdatedColony = artifacts.require("UpdatedColony");
const IUpdatedColony = artifacts.require("IUpdatedColony");
const Authority = artifacts.require("Authority");
const Token = artifacts.require("Token");

contract("Colony contract upgrade", accounts => {
  const ACCOUNT_TWO = accounts[1];
  // The base58 decoded, bytes32 converted value of the task ipfsHash
  const specificationHash = "9bb76d8e6c89b524d34a454b3140df28";
  const newSpecificationHash = "9bb76d8e6c89b524d34a454b3140df29";

  let colony;
  let colonyTask;
  let colonyFunding;
  let authority;
  let token;
  let colonyNetwork;
  let updatedColony;
  let updatedColonyVersion;

  before(async () => {
    const etherRouterColonyNetwork = await EtherRouter.deployed();
    colonyNetwork = await IColonyNetwork.at(etherRouterColonyNetwork.address);

    const tokenArgs = getTokenArgs();
    const colonyToken = await Token.new(...tokenArgs);
    const { logs } = await colonyNetwork.createColony(colonyToken.address);
    const { colonyId, colonyAddress } = logs[0].args;
    colony = await IColony.at(colonyAddress);
    colonyTask = await ColonyTask.new();
    colonyFunding = await ColonyFunding.new();
    const authorityAddress = await colony.authority.call();
    authority = await Authority.at(authorityAddress);
    const tokenAddress = await colony.getToken.call();
    token = await Token.at(tokenAddress);

    await authority.setUserRole(ACCOUNT_TWO, 0, true);
    await colony.makeTask(specificationHash, 1);
    await colony.makeTask(newSpecificationHash, 1);
    // Setup new Colony contract version on the Network
    const updatedColonyContract = await UpdatedColony.new();
    const resolver = await Resolver.new();
    await resolver.register("isUpdated()", updatedColonyContract.address);
    await setupColonyVersionResolver(updatedColonyContract, colonyTask, colonyFunding, resolver, colonyNetwork);
    // Check new Colony contract version is registered successfully
    updatedColonyVersion = await colonyNetwork.getCurrentColonyVersion.call();

    // Upgrade our existing colony
    await colonyNetwork.upgradeColony(colonyId, updatedColonyVersion.toNumber());
    updatedColony = await IUpdatedColony.at(colonyAddress);
  });

  describe("when upgrading Colony contract", () => {
    it("should have updated the version number", async () => {
      const newVersion = await updatedColony.version.call();
      assert.equal(newVersion.toNumber(), updatedColonyVersion.toNumber());
    });

    it("should be able to lookup newly registered function on Colony", async () => {
      const y = await updatedColony.isUpdated.call();
      assert.isTrue(y);
    });

    it("should return correct total number of tasks", async () => {
      const updatedTaskCount = await updatedColony.getTaskCount.call();
      assert.equal(2, updatedTaskCount.toNumber());
    });

    it("should return correct tasks", async () => {
      const task1 = await updatedColony.getTask.call(1);
      assert.equal(hexToUtf8(task1[0]), specificationHash);
      assert.isFalse(task1[2]);
      assert.isFalse(task1[3]);
      assert.equal(task1[4].toNumber(), 0);
      assert.equal(task1[5].toNumber(), 0);

      const task2 = await updatedColony.getTask.call(2);
      assert.equal(hexToUtf8(task2[0]), newSpecificationHash);
      assert.isFalse(task2[2]);
      assert.isFalse(task2[3]);
      assert.equal(task2[4].toNumber(), 0);
      assert.equal(task2[5].toNumber(), 0);
    });

    it("should return correct permissions", async () => {
      const owner = await authority.hasUserRole.call(ACCOUNT_TWO, 0);
      assert.isTrue(owner);
    });

    it("should return correct token address", async () => {
      const tokenAddress = await updatedColony.getToken.call();
      assert.equal(token.address, tokenAddress);
    });
  });
});
