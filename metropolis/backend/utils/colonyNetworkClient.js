const { providers, Wallet } = require('ethers');
const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
const { default: NetworkLoader } = require('@colony/colony-js-contract-loader-network');

const { default: ColonyNetworkClient } = require('@colony/colony-js-client');

const config = require('../config.json').ethereum;
const PRIVATE_KEY = config.privateKey;
const NETWORK = config.network;

// Ethers default provider with Colony NetworkLoader
const provider = providers.getDefaultProvider(NETWORK);
const wallet = new Wallet(PRIVATE_KEY, provider);
const loader = new NetworkLoader({ network: NETWORK });
const adapter = new EthersAdapter({
    loader,
    provider,
    wallet,
  });

// Re-use ColonyNetworkClient object so it is only created once at start of daemon
let networkClient;

async function getNetworkClient() {
  if (!networkClient) {
    // Initialize ColonyNetworkClient
    networkClient = new ColonyNetworkClient({ adapter });
    await networkClient.init();
    console.log(`ColonyNetworkClient initialized for ${NETWORK} network!`);
  }
  return networkClient;
};

export default getNetworkClient;
