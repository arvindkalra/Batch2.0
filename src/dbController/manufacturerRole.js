import {
  getJsonFromIPFS,
  harvestStates,
  makeManufacturerTransaction,
  makeStorageTransaction,
  packetStates,
  uploadJsonToIPFS
} from "./init";
import { OWN_ADDRESS } from "./Web3Connections";

export function setManufacturerDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeManufacturerTransaction("send", "setManufacturerDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getManufacturerDetails(address) {
  return new Promise((resolve, reject) => {
    makeManufacturerTransaction(
      "call",
      "getManufacturerDetails",
      address ? address : OWN_ADDRESS
    )
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function fetchHarvestUnitDetailsUsingUID(harvestUnitId) {
  return new Promise((resolve, reject) => {
    makeStorageTransaction("getHarvestUnit", harvestUnitId)
      .then(obj => {
        return handleObject(obj, harvestUnitId, true);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function fetchProductUnitDetailsUsingUID(productUnitId) {
  return new Promise((resolve, reject) => {
    makeStorageTransaction("getProductUnit", productUnitId)
      .then(obj => {
        return handleObject(obj, productUnitId, false);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function fetchHarvestUnitsByManufacturer(rowCallback) {
  makeManufacturerTransaction("call", "getHarvestUnits")
    .then(array => {
      array = array.valueOf();
      for (let i = 0; i < array.length; i++) {
        let val = parseInt(array[i]);
        makeStorageTransaction("getHarvestUnit", val)
          .then(x => {
            return handleObject(x, val, true);
          })
          .then(x => rowCallback(x, array.length))
          .catch(handleError);
      }
    })
    .catch(handleError);
}

function handleObject(obj, uid, isHarvest) {
  return new Promise((resolve, reject) => {
    obj = obj.valueOf();
    let currentOwner = obj[0];
    let latestHash = obj[1];
    let stateVariable = parseInt(obj[2]);
    getJsonFromIPFS(latestHash)
      .then(details => {
        resolve({
          uid,
          details,
          currentState: isHarvest
            ? harvestStates(stateVariable)
            : packetStates(stateVariable),
          currentOwner
        });
      })
      .catch(reject);
  });
}

function handleError(err) {
  throw err;
}

export function fetchPackagedUnitsByManufacturer(rowCallback) {
  makeManufacturerTransaction("call", "getProductUnits")
    .then(array => {
      array = array.valueOf();
      for (let i = 0; i < array.length; i++) {
        let val = parseInt(array[i]);
        makeStorageTransaction("getProductUnit", val)
          .then(x => {
            return handleObject(x, val, false);
          })
          .then(rowCallback)
          .catch(handleError);
      }
    })
    .catch(handleError);
}

export function packetsManufactured(
  harvestUnitId,
  harvestObjectDetailsUpdated,
  productObjectDetailsNew,
  signCallback
) {
  let harvestHash;
  let productHash;
  return uploadJsonToIPFS(harvestObjectDetailsUpdated)
    .then(hash => {
      harvestHash = hash;
      return uploadJsonToIPFS(productObjectDetailsNew);
    })
    .then(hash => {
      productHash = hash;
      return makeManufacturerTransaction(
        signCallback,
        "productsManufactured",
        harvestUnitId,
        harvestHash,
        productHash
      );
    });
}

export function sendProductToDistributor(
  productUid,
  distributorAddress,
  transporterAddress,
  details,
  signCallback
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeManufacturerTransaction(
      signCallback,
      "sendProductsManufacturedToDistributor",
      productUid,
      hash,
      distributorAddress,
      transporterAddress
    );
  });
}
