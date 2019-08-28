import config from "../config.js";
import Web3 from "web3";
import { fetchBatchUnitDetailsUsingUID } from "./distributorRole";
import {
  fetchHarvestUnitDetailsUsingUID,
  fetchProductUnitDetailsUsingUID
} from "./manufacturerRole";
import {
  callDistributorContract,
  callFarmerContract,
  callLaboratoryContract,
  callManufacturerContract,
  callRetailerContract,
  callStorageContract,
  callTransporterContract,
  initialSetup,
  OWN_ADDRESS,
  sendDistributorContract,
  sendFarmerContract,
  sendLaboratoryContract,
  sendManufacturerContract,
  sendRetailerContract,
  sendTransporterContract
} from "./Web3Connections";

const URL = config.SERVER_URL;

export const web3 = new Web3(new Web3.providers.HttpProvider(config.RPC_URL));

/*
// IPFS Setup Functionality
export const ipfsNode = new IPFS("ipfs.infura.io", "5001", {
  protocol: "https",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": '["PUT", "POST", "GET"]'
  }
});
export const NETWORK_NAME = config.NETWORK_NAME;
*/

export function connectToMetamask() {
  return new Promise((resolve, reject) => {
    initialSetup(resolve, reject);
  });
}

export function makeStorageTransaction(functionName, ...args) {
  return new Promise((resolve, reject) => {
    callStorageContract(functionName, resolve, reject, ...args);
  });
}

export function makeFarmerTransaction(type, functionName, ...args) {
  return new Promise((resolve, reject) => {
    if (type === "call") {
      callFarmerContract(functionName, resolve, reject, ...args);
    } else {
      sendFarmerContract(functionName, resolve, reject, type, ...args);
    }
  });
}

export function makeLaboratoryTransaction(type, functionName, ...args) {
  return new Promise((resolve, reject) => {
    if (type === "call") {
      callLaboratoryContract(functionName, resolve, reject, ...args);
    } else {
      sendLaboratoryContract(functionName, resolve, reject, type, ...args);
    }
  });
}

export function makeTransporterTransaction(type, functionName, ...args) {
  return new Promise((resolve, reject) => {
    if (type === "call") {
      callTransporterContract(functionName, resolve, reject, ...args);
    } else {
      sendTransporterContract(functionName, resolve, reject, type, ...args);
    }
  });
}

export function makeManufacturerTransaction(type, functionName, ...args) {
  return new Promise((resolve, reject) => {
    if (type === "call") {
      callManufacturerContract(functionName, resolve, reject, ...args);
    } else {
      sendManufacturerContract(functionName, resolve, reject, type, ...args);
    }
  });
}

export function makeDistributorTransaction(type, functionName, ...args) {
  return new Promise((resolve, reject) => {
    if (type === "call") {
      callDistributorContract(functionName, resolve, reject, ...args);
    } else {
      sendDistributorContract(functionName, resolve, reject, type, ...args);
    }
  });
}

export function makeRetailerTransaction(type, functionName, ...args) {
  return new Promise((resolve, reject) => {
    if (type === "call") {
      callRetailerContract(functionName, resolve, reject, ...args);
    } else {
      sendRetailerContract(functionName, resolve, reject, type, ...args);
    }
  });
}

// TODO upload ipfs to change for ipfs
export function uploadJsonToIPFS(_json) {
  console.log("Uploading");
  return new Promise((resolve, reject) => {
/*
    let buffer = Buffer.from(JSON.stringify(_json));
    ipfsNode
      .add(buffer)
      .then(response => {
        console.log("uplaoded");
        resolve(response[0].path);
      })
      .catch(reject);
*/
    fetch(URL + "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
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
/*
    ipfsNode
      .get("/ipfs/" + _path)
      .then(response => {
        let content = response[0].content;
        resolve(JSON.parse(content.toString()));
      })
      .catch(reject);
*/
    fetch(URL + "/get", {
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
      rv.status = "Discarded";
      return rv;
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

export function batchStates(id) {
  let rv = {
    value: id
  };
  switch (id) {
    case 1:
      rv.status = "Batch Created By Distributor";
      return rv;

    case 2:
      rv.status = "Allotted to Retailer and Transporter";
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

export const authneticateUser = role => {
  return new Promise((resolve, reject) => {
    switch (role) {
      case "farmer":
        makeFarmerTransaction("call", "isFarmer", OWN_ADDRESS).then(bool => {
          resolve(bool);
        });
        return;
      case "laboratory":
        makeLaboratoryTransaction("call", "isLaboratory", OWN_ADDRESS).then(
          bool => {
            resolve(bool);
          }
        );
        return;
      case "manufacturer":
        makeManufacturerTransaction("call", "isManufacturer", OWN_ADDRESS).then(
          bool => {
            resolve(bool);
          }
        );
        return;
      case "distributor":
        makeDistributorTransaction("call", "isDistributor", OWN_ADDRESS).then(
          bool => {
            resolve(bool);
          }
        );
        return;
      case "retailer":
        makeRetailerTransaction("call", "isRetailer", OWN_ADDRESS).then(
          bool => {
            resolve(bool);
          }
        );
        return;
      case "transporter":
        makeTransporterTransaction("call", "isTransporter", OWN_ADDRESS).then(
          resolve
        );
        return;
      default:
        resolve(false);
        return;
    }
  });
};

export const fetchEntireJourney = buid => {
  return new Promise((resolve, reject) => {
    let objToReturn = {};
    fetchBatchUnitDetailsUsingUID(buid)
      .then(obj => {
        objToReturn = obj.details;
        return fetchProductUnitDetailsUsingUID(
          obj.details.productUnitId
        );
      })
      .then(obj => {
        objToReturn = { ...objToReturn, ...obj.details };
        return fetchHarvestUnitDetailsUsingUID(
          obj.details.harvestUnitId
        );
      })
      .then(obj => {
        objToReturn = { ...objToReturn, ...obj.details };
        resolve(objToReturn);
      })
      .catch(reject);
  });
};

export function convertFromHex(hex) {
  return parseInt(hex, 16);
}

export function convertToHex(uid) {
  uid = parseInt(uid);
  return ("000000" + uid.toString(16)).substr(-6);
}
