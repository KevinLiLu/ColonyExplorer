const { providers, Wallet } = require('ethers');
const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');
const { default: ColonyNetworkClient } = require('@colony/colony-js-client');
const ecp = require('./ecp');

const loader = new TrufflepigLoader();
const provider = new providers.JsonRpcProvider('http://localhost:8545/');

/*
* Creates an adapter given ganache account index to use.
*/
createAdapter = async (accountIndex) => {
  // Get the private key from the first account from the ganache-accounts
  // through trufflepig
  const { privateKey } = await loader.getAccount(accountIndex);

  // Create a wallet with the private key (so we have a balance we can use)
  const wallet = new Wallet(privateKey, provider);

  // Create an adapter (powered by ethers)
  return new EthersAdapter({
    loader,
    provider,
    wallet,
  });
}

/*
* Creates a new ERC20 token and returns the address.
*/
createToken = async (accountIndex, tokenName, tokenSymbol) => {
  const adapter = await createAdapter(accountIndex);

  // Connect to ColonyNetwork using adapter
  const networkClient = new ColonyNetworkClient({ adapter });
  await networkClient.init();

  // Create ERC20 token
  const tokenAddress = await networkClient.createToken({
    name: tokenName,
    symbol: tokenSymbol,
  });

  console.log(`Token address: ${tokenAddress}`);

  return tokenAddress;
}

/*
* Creates a colony given the token address.
*/
createColony = async (accountIndex, tokenAddress) => {
  const adapter = await createAdapter(accountIndex);

  // Connect to ColonyNetwork using adapter
  const networkClient = new ColonyNetworkClient({ adapter });
  await networkClient.init();

  // Create colony
  const {
    eventData: { colonyId, colonyAddress },
  } = await networkClient.createColony.send({ tokenAddress });

  console.log(`Colony ID: ${colonyId}`);
  console.log(`Colony address: ${colonyAddress}`);

  return {
    colonyId,
    colonyAddress,
  };
}

/*
* Creates a task.
*/
createTask = async (accountIndex, colonyId, domainId, title, description) => {
  const adapter = await createAdapter(accountIndex);

  // Connect to ColonyNetwork using adapter
  const networkClient = new ColonyNetworkClient({ adapter });
  await networkClient.init();
  const colonyClient = await networkClient.getColonyClient(colonyId);

  await ecp.init();

  const specificationHash = await ecp.saveTaskSpecification({ title, description });

  console.log('Specification hash', specificationHash);

  const { eventData: { taskId }} = await colonyClient.createTask.send({ specificationHash, domainId });

  const task = await colonyClient.getTask.call({ taskId })
  console.log(task);

  await ecp.stop();

  return specificationHash;
}

/*
* Gets a task specification given a IPFS hash.
*/
getTaskSpecification = async (hash) => {
  await ecp.init();

  const taskSpecification = await ecp.getTaskSpecification(hash);

  await ecp.stop();

  return taskSpecification;
}

setupDev = async () => {
  try {
    const tokenAddress = await createToken(0, 'Cologne', 'KOLN');
    const colonyDetails = await createColony(0, tokenAddress);
    const hash = await createTask(0, colonyDetails.colonyId, 1, 'Cool task', 'Create this cool thing.');
    const taskSpecification = await getTaskSpecification(hash);
    console.log(taskSpecification);
  } catch (err) {
    console.error(err);
  }
  process.exit();
}

setupDev();
