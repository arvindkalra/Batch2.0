import config from "../config.js";
import IPFS from "ipfs-http-client";

export const ipfsNode = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

export let web3;
// export const NETWORK_NAME = config.NETWORK_NAME;
export let CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;
export let OWN_ADDRESS;
export let Contract_Abi = config.CONTRACT_ABI;
export let Contract_Instance;

export function connectToMetamask() {
  return new Promise((resolve, reject) => {
    if (window.ethereum) {
      window.ethereum
        .enable()
        .then(address => {
          OWN_ADDRESS = address[0];
          console.log(OWN_ADDRESS);
          web3 = window.web3;
          createContractInstance();
          resolve(true);
        })
        .catch(() => {
          reject();
        });
    } else if (!window.web3) {
      alert("Install Metamask");
      reject();
    } else if (window.web3.accounts[0].length !== 0) {
      web3 = window.web3;
      OWN_ADDRESS = web3.accounts[0];
      console.log(OWN_ADDRESS);
      createContractInstance();
      resolve(true);
    }
  });
}

function createContractInstance() {
  Contract_Instance = web3.eth.contract(Contract_Abi).at(CONTRACT_ADDRESS);
  console.log("Contract Instance", Contract_Instance);
}

export function makeTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
    Contract_Instance[functionName](
      ...args,
      { from: OWN_ADDRESS, gasPrice: web3.toWei(1000, "gwei") },
      function(err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

export function uploadJsonToIPFS(_json) {
  return new Promise((resolve, reject) => {
    let buffer = Buffer.from(JSON.stringify(_json));
    ipfsNode
      .add(buffer)
      .then(response => {
        resolve(response[0].path);
      })
      .catch(reject);
  });
}

export function getJsonFromIPFS(_path) {
  return new Promise((resolve, reject) => {
    ipfsNode
      .get("/ipfs/" + _path)
      .then(response => {
        let content = response[0].content;
        resolve(JSON.parse(content.toString()));
      })
      .catch(reject);
  });
}

export function hexToAscii(hex) {
  return web3.toAscii(hex).split("\0")[0];
}

export function harvestStates(id) {
  switch (id) {
    case 1:
      return "sown";

    case 2:
      return "moved";

    case 3:
      return "harvested";

    case 4:
      return "tested";

    case 5:
      return "sent";

    case 6:
      return "dispatched";

    case 7:
      return "delivered";

    default:
      return "discarded";
  }
}

export function packetStates(id) {
  switch (id) {
    case 1:
      return 'packed';

    case 2:
      return 'dispatched';

    case 3:
      return 'delivered';

    default:
      return 'lost';
  }
}
