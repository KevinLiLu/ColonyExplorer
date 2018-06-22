import web3 from './web3';
const { default: NetworkLoader } = require('@colony/colony-js-contract-loader-network');

async function getColonyContract(colonyAddress) {
  const loader = new NetworkLoader({ network: 'rinkeby' });
  const { abi } = await loader.load({contractName: 'IColony'});
  const colonyContract = new web3.eth.Contract(
    abi,
    colonyAddress,
  );

  return colonyContract;
};

export default getColonyContract;
