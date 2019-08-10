import {
  batchStates,
  getJsonFromIPFS,
  makeRetailerTransaction,
  makeStorageTransaction,
  OWN_ADDRESS,
  uploadJsonToIPFS
} from "./init";

export function setRetailerDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeRetailerTransaction("setRetailerDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getRetailerDetails(address) {
  return new Promise((resolve, reject) => {
    makeRetailerTransaction(
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
  return makeRetailerTransaction("isConsumer", buyerAddress);
}

export function setConsumerDetails(buyerAddress, details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeRetailerTransaction("setConsumerDetails", buyerAddress, hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getConsumerDetails(buyerAddress) {
  return new Promise((resolve, reject) => {
    makeRetailerTransaction("getConsumerDetails", buyerAddress)
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
  buyerPurchaseDetails
) {
  let sellerHash;
  return uploadJsonToIPFS(sellerStockDetails).then(hash => {
    sellerHash = hash;
    return uploadJsonToIPFS(buyerPurchaseDetails).then(hash => {
      return makeRetailerTransaction(
        "sellToConsumer",
        batchUnitId,
        buyerAddress,
        hash,
        sellerHash
      );
    });
  });
}

export function getRowsForRetailer(rowCallback, rowsLimit) {
  makeRetailerTransaction("getBatchUnits")
    .then(array => {
      array = array.valueOf();
      let limit = rowsLimit ? array.length - rowsLimit : 0;
      for (let i = array.length - 1; i >= limit && i >= 0; i--) {
        let val = array[i].toNumber();
        makeStorageTransaction("getBatchUnit", val)
          .then(x => handleObject(x, val))
          .catch(handleError);
      }
    })
    .catch(handleError);

  function handleObject(obj, uid) {
    obj = obj.valueOf();
    getJsonFromIPFS(obj[1]).then(details => {
      rowCallback({
        details,
        batchUnitId: uid,
        currentState: batchStates(obj[2].toNumber()),
        currentOwner: obj[0]
      });
    });
  }
  function handleError(err) {
    throw err;
  }
}
