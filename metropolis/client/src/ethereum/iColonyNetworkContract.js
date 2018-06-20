import web3 from './web3';
const { default: NetworkLoader } = require('@colony/colony-js-contract-loader-network');

async function getColonyNetworkContract() {
  const loader = new NetworkLoader({ network: 'rinkeby' });
  const { abi } = await loader.load({contractName: 'IColonyNetwork'});
  const colonyNetworkContract = new web3.eth.Contract(
    abi,
    '0xD4C145EbdC7f072d10a07b8ea4515AF996EE437c',
  );

  return colonyNetworkContract;
};

export default getColonyNetworkContract;
