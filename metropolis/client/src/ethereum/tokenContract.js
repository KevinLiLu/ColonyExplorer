import web3 from './web3';
const { default: NetworkLoader } = require('@colony/colony-js-contract-loader-network');

async function getTokenContract() {
  const loader = new NetworkLoader({ network: 'rinkeby' });

  let { abi, bytecode } = await loader.load({contractName: 'Token'});
  let tokenContract = new web3.eth.Contract(abi);

  return {
    tokenContract,
    bytecode,
  };
};

export default getTokenContract;
