import {
  batchStates,
  convertFromHex,
  convertToHex,
  getJsonFromIPFS,
  makeDistributorTransaction,
  makeStorageTransaction,
  packetStates,
  uploadJsonToIPFS
} from "./init";
import { OWN_ADDRESS } from "./Web3Connections";

export function setDistributorDetails(details, callback) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeDistributorTransaction(callback, "setDistributorDetails", hash);
  });
}

export function getDistributorDetails(address) {
  return makeDistributorTransaction(
    "call",
    "getDistributorDetails",
    address ? address : OWN_ADDRESS
  ).then(hash => {
    return getJsonFromIPFS(hash);
  });
}

function handleObject(obj, uid, isProduct) {
  uid = convertToHex(uid);
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
          currentState: isProduct
            ? packetStates(stateVariable)
            : batchStates(stateVariable),
          currentOwner
        });
      })
      .catch(reject);
  });
}

function handleError(err) {
  throw err;
}

export function fetchProductUnitsForDistributor(rowCallback) {
  makeDistributorTransaction("call", "getProductUnits").then(array => {
    array = array.valueOf();
    for (let i = 0; i < array.length; i++) {
      let val = parseInt(array[i]);
      // console.log(val);
      makeStorageTransaction("getProductUnit", val)
        .then(o => {
          return handleObject(o, val, true);
        })
        .then(x => rowCallback(x, array.length))
        .catch(handleError);
    }
  });
}

export function createBatchByDistributor(
  productUnitId,
  productDetailsUpdated,
  batchDetailsNew,
  retailerAddress,
  transporterAddress,
  signCallback
) {
  productUnitId = convertFromHex(productUnitId);
  let productHash;
  return uploadJsonToIPFS(productDetailsUpdated)
    .then(hash => {
      productHash = hash;
      return uploadJsonToIPFS(batchDetailsNew);
    })
    .then(batchHash => {
      return makeDistributorTransaction(
        signCallback,
        "createBatch",
        productUnitId,
        productHash,
        batchHash,
        transporterAddress,
        retailerAddress
      );
    });
}

export function fetchBatchUnitsForDistributor(rowCallback) {
  makeDistributorTransaction("call", "getBatchUnits").then(array => {
    array = array.valueOf();
    for (let i = array.length - 1; i >= 0; i--) {
      let val = parseInt(array[i]);
      makeStorageTransaction("getBatchUnit", val)
        .then(o => {
          return handleObject(o, val, false);
        })
        .then(rowCallback)
        .catch(handleError);
    }
  });
}

export function fetchBatchUnitDetailsUsingUID(batchUnitId) {
  batchUnitId = convertFromHex(batchUnitId);
  return new Promise((resolve, reject) => {
    makeStorageTransaction("getBatchUnit", batchUnitId)
      .then(obj => {
        return handleObject(obj, batchUnitId, false);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function sendBatchToTheRetailer(
  batchUnitId,
  retailerAddress,
  transporterAddress,
  details
) {
  batchUnitId = convertFromHex(batchUnitId);
  return uploadJsonToIPFS(details).then(hash => {
    return makeDistributorTransaction(
      "send",
      "sendToRetailer",
      batchUnitId,
      hash,
      retailerAddress,
      transporterAddress
    );
  });
}
