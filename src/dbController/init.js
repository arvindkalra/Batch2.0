import config from "../config.js";
import IPFS from "ipfs-http-client";

export const ipfsNode = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

export let web3;
// export const NETWORK_NAME = config.NETWORK_NAME;
export let CHAIN_ADDRESS = config.CHAIN_ADDRESS;
export let LAB_ADDRESS = config.LAB_ADDRESS;
export let OWN_ADDRESS;
export let Chain_Abi = config.CHAIN_ABI;
export let Chain_Instance;
export let Lab_Abi = config.LAB_ABI;
export let Lab_Instance;

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
        .catch(err => {
          reject(err);
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
  Chain_Instance = web3.eth.contract(Chain_Abi).at(CHAIN_ADDRESS);
  Lab_Instance = web3.eth.contract(Lab_Abi).at(LAB_ADDRESS);
  console.log("Contract Instance", Chain_Instance, Lab_Instance);
}

export function makeChainTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
  console.log("inside make chain transaction");
    Chain_Instance[functionName](
      ...args,
      { from: OWN_ADDRESS, gasPrice: web3.toWei(1000, "gwei") },
      function(err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

export function makeLabTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
    Lab_Instance[functionName](
      ...args,
      { from: OWN_ADDRESS, gasPrice: web3.toWei(1000, "gwei") },
      function(err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
}

export function fetchEntireChain(buid) {
  return new Promise((resolve, reject) => {
    let packetsHash = "";
    let harvestHash = "";
    let rv = {};
    makeChainTransaction("fetchEntireChain", buid)
      .then(data => {
        data = data.valueOf();
        packetsHash = data[0];
        harvestHash = data[1];
        return getJsonFromIPFS(packetsHash);
      })
      .then(details => {
        rv = { ...rv, ...details };
        return getJsonFromIPFS(harvestHash);
      })
      .then(details => {
        rv = { ...rv, ...details };
        resolve(rv);
      })
      .catch(reject);
  });
}

export function uploadJsonToIPFS(_json) {
  console.log("Uploading");
  return new Promise((resolve, reject) => {
    let buffer = Buffer.from(JSON.stringify(_json));
    ipfsNode
      .add(buffer)
      .then(response => {
        console.log("uplaoded");
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
      return "Sent to Lab";

    case 5:
      return "Lab Test Approved";

    case 6:
      return "sent";

    case 7:
      return "dispatched";

    case 8:
      return "delivered";

    default:
      return "discarded";
  }
}

export function packetStates(id) {
  switch (id) {
    case 1:
      return "packed";

    case 2:
      return "dispatched";

    case 3:
      return "delivered";

    default:
      return "lost";
  }
}

export function setNewObjectOfUsers(object) {
  return uploadJsonToIPFS(object).then(hash => {
    makeLabTransaction("setUserHash", hash);
  });
}

export function getUsersObject() {
  return makeLabTransaction("getUsersHash").then(hash => {
    return getJsonFromIPFS(hash);
  });
}


export const checkMined = (txHash , cb) => {
  let interval = setInterval(() => {
    web3.eth.getTransactionReceipt(txHash, function(err, receipt) {
      if (err) throw err;
      console.log("Checked");
      if (receipt !== null) {
        console.log("Mined");
        clearInterval(interval);
        cb();

      }
    });

  },500)

};
