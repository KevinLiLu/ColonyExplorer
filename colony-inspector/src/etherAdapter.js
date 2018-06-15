const { providers, Wallet } = require('ethers');
const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');
const { default: ColonyNetworkClient } = require('@colony/colony-js-client');

const loader = new TrufflepigLoader();
const provider = new providers.JsonRpcProvider('http://localhost:8545/');

/*
* Creates an adapter given ganache account index to use.
*/
module.exports = createAdapter = async (accountIndex) => {
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
