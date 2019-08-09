import config from "../config.js";
import IPFS from "ipfs-http-client";

const URL = "http://localhost:5001/add";

// export const ipfsNode = new IPFS("ipfs.infura.io", "5001", {
//   protocol: "https",
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": '["PUT", "POST", "GET"]'
//   }
// });

export let web3;
// export const NETWORK_NAME = config.NETWORK_NAME;
export let OWN_ADDRESS;

let STORAGE;
let FARMER;
let LABORATORY;
let TRANSPORTER;
let MANUFACTURER;
let RETAILER;
let DISTRIBUTOR;

export function makeChainTransaction() {
  //
}

export function makeLabTransaction() {
  //
}

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
  STORAGE = web3.eth.contract(config.STORAGE).at(config.STORAGE_ADDRESS);
  FARMER = web3.eth.contract(config.FARMER).at(config.FARMER_ADDRESS);
  LABORATORY = web3.eth
    .contract(config.LABORATORY)
    .at(config.LABORATORY_ADDRESS);
  TRANSPORTER = web3.eth
    .contract(config.TRANSPORTER)
    .at(config.TRANSPORTER_ADDRESS);
  MANUFACTURER = web3.eth
    .contract(config.MANUFACTURER)
    .at(config.MANUFACTURER_ADDRESS);
  RETAILER = web3.eth.contract(config.RETAILER).at(config.RETAILER_ADDRESS);
  DISTRIBUTOR = web3.eth
    .contract(config.DISTRIBUTOR)
    .at(config.DISTRIBUTOR_ADDRESS);
}

export function makeStorageTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
    STORAGE[functionName](...args, { from: OWN_ADDRESS }, function(
      err,
      result
    ) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export function makeFarmerTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
    FARMER[functionName](...args, { from: OWN_ADDRESS }, function(err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export function makeLaboratoryTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
    LABORATORY[functionName](...args, { from: OWN_ADDRESS }, function(
      err,
      result
    ) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export function makeTransporterTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
    TRANSPORTER[functionName](...args, { from: OWN_ADDRESS }, function(
      err,
      result
    ) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export function makeManufacturerTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
    MANUFACTURER[functionName](...args, { from: OWN_ADDRESS }, function(
      err,
      result
    ) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export function makeDistributorTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
    DISTRIBUTOR[functionName](...args, { from: OWN_ADDRESS }, function(
      err,
      result
    ) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export function makeRetailerTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
    RETAILER[functionName](...args, { from: OWN_ADDRESS }, function(
      err,
      result
    ) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export function fetchEntireChain(buid) {
  return new Promise((resolve, reject) => {
    let packetsHash = "";
    let harvestHash = "";
    let addresses = [];
    let rv = {};
    makeChainTransaction("fetchEntireChain", buid)
      .then(data => {
        data = data.valueOf();
        packetsHash = data[0];
        harvestHash = data[1];
        addresses = data[2];
        rv = {
          farmerAddress: addresses[0],
          laboratoryAddress: addresses[1],
          manufacturerAddress: addresses[2],
          farmerToManufacturerTransporterAddress: addresses[3],
          retailerAddress: addresses[4],
          manufacturerToRetailerTransporter: addresses[5]
        };
        return getJsonFromIPFS(packetsHash);
      })
      .then(details => {
        let packetsDispatchTime = details.dispatchTime;
        let packetsDeliveryTime = details.deliveryTime;
        delete details["dispatchTime"];
        delete details["deliveryTime"];
        rv = { ...rv, ...details, packetsDeliveryTime, packetsDispatchTime };
        return getJsonFromIPFS(harvestHash);
      })
      .then(details => {
        let harvestDispatchTime = details.dispatchTime;
        let harvestDeliveryTime = details.deliveryTime;
        delete details["dispatchTime"];
        delete details["deliveryTime"];
        rv = { ...rv, ...details, harvestDeliveryTime, harvestDispatchTime };
        resolve(rv);
      })
      .catch(reject);
  });
}

// TODO upload ipfs to change for ipfs
export function uploadJsonToIPFS(_json) {
  console.log("Uploading");
  return new Promise((resolve, reject) => {
    // let buffer = Buffer.from(JSON.stringify(_json));
    // ipfsNode
    //   .add(buffer)
    //   .then(response => {
    //     console.log("uplaoded");
    //     resolve(response[0].path);
    //   })
    //   .catch(reject);
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ object: _json })
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        resolve(result.hash);
      });
  });
}

export function getJsonFromIPFS(_path) {
  return new Promise((resolve, reject) => {
    // ipfsNode
    //   .get("/ipfs/" + _path)
    //   .then(response => {
    //     let content = response[0].content;
    //     resolve(JSON.parse(content.toString()));
    //   })
    //   .catch(reject);
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ hash: _path })
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        resolve(result.object);
      });
  });
}

export function hexToAscii(hex) {
  return web3.toAscii(hex).split("\0")[0];
}

export function harvestStates(id) {
  let rv = {
    value: id
  };
  switch (id) {
    case 1:
      rv.status = "Sown";
      return rv;

    case 2:
      rv.status = "Harvested";
      return rv;

    case 3:
      rv.status = "Sent to Lab";
      return rv;

    case 4:
      rv.status = "Sample Dispatched for Laboratory";
      return rv;

    case 5:
      rv.status = "Sample Delivered to Laboratory";
      return rv;

    case 6:
      rv.status = "Test Approved";
      return rv;

    case 7:
      rv.status = "Packed to be sent to Manufacturer";
      return rv;

    case 8:
      rv.status = "Harvest Dispatched to Manufacturer";
      return rv;

    case 9:
      rv.status = "Harvest Delivered to Manufacturer";
      return rv;

    case 10:
      rv.status = "Test Failed";
      return rv;

    case 11:
      rv.status = "Crop Destroyed by Farmer";
      return rv;

    default:
      return "discarded";
  }
}

export function packetStates(id) {
  let rv = {
    value: id
  };
  switch (id) {
    case 1:
      rv.status = "Packed By Manufacturer";
      return rv;

    case 2:
      rv.status = "Allotted to Distributor and Transporter";
      return rv;

    case 3:
      rv.status = "Dispatched by Transporter";
      return rv;

    case 4:
      rv.status = "Delivered by Transporter";
      return rv;

    default:
      rv.status = "Lost in Transit";
      return rv;
  }
}

export const checkMined = (txHash, cb) => {
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
  }, 500);
};
