import {
  batchStates,
  getJsonFromIPFS,
  makeRetailerTransaction,
  makeStorageTransaction,
  uploadJsonToIPFS
} from "./init";
import { OWN_ADDRESS } from "./Web3Connections";

export function setRetailerDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeRetailerTransaction("send", "setRetailerDetails", hash)
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
    })
    .catch(handleError);

  function handleObject(obj, uid) {
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
