import {
  batchStates,
  getJsonFromIPFS,
  makeDistributorTransaction,
  makeStorageTransaction,
  OWN_ADDRESS,
  packetStates,
  uploadJsonToIPFS
} from "./init";

export function setDistributorDetails(details) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeDistributorTransaction("setDistributorDetails", hash);
  });
}

export function getDistributorDetails(address) {
  return makeDistributorTransaction(
    "getDistributorDetails",
    address ? address : OWN_ADDRESS
  ).then(hash => {
    return getJsonFromIPFS(hash);
  });
}

function handleObject(obj, uid, isProduct) {
  return new Promise((resolve, reject) => {
    obj = obj.valueOf();
    let currentOwner = obj[0];
    let latestHash = obj[1];
    let stateVariable = obj[2].toNumber();
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
  makeDistributorTransaction("getProductUnits").then(array => {
    array = array.valueOf();
    for (let i = 0; i < array.length; i++) {
      let val = array[i].toNumber();
      // console.log(val);
      makeStorageTransaction("getProductUnit", val)
        .then(o => {
          return handleObject(o, val, true);
        })
        .then(rowCallback)
        .catch(handleError);
    }
  });
}

export function createBatchByDistributor(
  productUnitId,
  productDetailsUpdated,
  batchDetailsNew
) {
  let productHash;
  return uploadJsonToIPFS(productDetailsUpdated)
    .then(hash => {
      productHash = hash;
      return uploadJsonToIPFS(batchDetailsNew);
    })
    .then(batchHash => {
      return makeDistributorTransaction(
        "createBatch",
        productUnitId,
        productHash,
        batchHash
      );
    });
}

export function fetchBatchUnitsForDistributor(rowCallback) {
  makeDistributorTransaction("getBatchUnits").then(array => {
    array = array.valueOf();
    for (let i = array.length - 1; i >= 0; i--) {
      let val = array[i].toNumber();
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
  return uploadJsonToIPFS(details).then(hash => {
    return makeDistributorTransaction(
      "sendToRetailer",
      batchUnitId,
      hash,
      retailerAddress,
      transporterAddress
    );
  });
}
