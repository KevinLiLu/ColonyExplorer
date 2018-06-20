import Web3 from 'web3';

let web3;

if (!web3 && window && window.web3) {
  // User's browser has metamask!
  web3 = new Web3(window.web3.currentProvider);
}

export default web3;
