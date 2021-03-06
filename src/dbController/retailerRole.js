import {
  batchStates,
  convertFromHex,
  convertToHex,
  getJsonFromIPFS,
  makeRetailerTransaction,
  makeStorageTransaction,
  uploadJsonToIPFS
} from "./init";
import { OWN_ADDRESS } from "./Web3Connections";
import { fetchProductUnitsForDistributor } from "./distributorRole";
import { fetchProductUnitDetailsUsingUID } from "./manufacturerRole";

export function setRetailerDetails(details, callback) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeRetailerTransaction(callback, "setRetailerDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getRetailerDetails(address) {
  return new Promise((resolve, reject) => {
    makeRetailerTransaction(
      "call",
      "getRetailerDetails",
      address ? address : OWN_ADDRESS
    )
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function isConsumer(buyerAddress) {
  return makeRetailerTransaction("call", "isConsumer", buyerAddress);
}

// export function setConsumerDetails(buyerAddress, details, signCallback) {
//   return new Promise((resolve, reject) => {
//     uploadJsonToIPFS(details).then(hash => {
//       makeRetailerTransaction(signCallback, "setConsumerDetails", buyerAddress, hash)
//         .then(resolve)
//         .catch(reject);
//     });
//   });
// }

export function getConsumerDetails(buyerAddress) {
  return new Promise((resolve, reject) => {
    makeRetailerTransaction("call", "getConsumerDetails", buyerAddress)
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function sellPacketsToBuyer(
  batchUnitId,
  buyerAddress,
  sellerStockDetails,
  buyerPurchaseDetails,
  signCallback
) {
  batchUnitId = convertFromHex(batchUnitId);
  let sellerHash;
  return uploadJsonToIPFS(sellerStockDetails).then(hash => {
    sellerHash = hash;
    return uploadJsonToIPFS(buyerPurchaseDetails).then(hash => {
      return makeRetailerTransaction(
        signCallback,
        "sellToConsumer",
        batchUnitId,
        buyerAddress,
        hash,
        sellerHash
      );
    });
  });
}

export function getRowsForRetailer(rowCallbacks) {
  makeRetailerTransaction("call", "getBatchUnits")
    .then(array => {
      array = array.valueOf();
      for (let i = array.length - 1; i >= 0; i--) {
        let val = parseInt(array[i]);
        makeStorageTransaction("getBatchUnit", val)
          .then(x => handleObject(x, val))
          .then(x => rowCallbacks(x, array.length))
          .catch(handleError);
      }
      if (array.length === 0) {
        rowCallbacks();
      }
    })
    .catch(handleError);

  function handleObject(obj, uid) {
    uid = convertToHex(uid);
    return new Promise((resolve, reject) => {
      obj = obj.valueOf();
      getJsonFromIPFS(obj[1])
        .then(details => {
          resolve({
            details,
            batchUnitId: uid,
            currentState: batchStates(parseInt(obj[2])),
            currentOwner: obj[0]
          });
        })
        .catch(reject);
    });
  }
  function handleError(err) {
    throw err;
  }
}

export function fetchRowsForCreatingPurchaseOrder(
  distributorAddress,
  callback
) {
  makeRetailerTransaction(
    "call",
    "getProductUnitsForDistributor",
    distributorAddress
  ).then(array => {
    array = array.valueOf();
    for (let i = 0; i < array.length; i++) {
      let val = convertToHex(parseInt(array[i]));
      fetchProductUnitDetailsUsingUID(val).then(o => callback(o, array.length));
    }
    if (array.length === 0) {
      callback();
    }
  });
}
