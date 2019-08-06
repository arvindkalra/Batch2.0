import {
  getJsonFromIPFS,
  makeChainTransaction,
  makeLabTransaction,
  OWN_ADDRESS,
  packetStates,
  uploadJsonToIPFS
} from "./init";

export function setRetailerDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeChainTransaction("setRetailerDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getRetailerDetails(address) {
  return new Promise((resolve, reject) => {
    makeChainTransaction("getRetailerDetails", address ? address : OWN_ADDRESS)
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function setConsumerDetails(buyerAddress, details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeLabTransaction("setConsumerDetails", buyerAddress, hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getConsumerDetails(buyerAddress) {
  return new Promise((resolve, reject) => {
    makeLabTransaction("getConsumerDetails", buyerAddress)
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function sellPacketsToBuyer(puid, buyerAddress, amount, details) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeChainTransaction(
      "sellToConsumer",
      puid,
      buyerAddress,
      amount,
      hash
    );
  });
}

export function getPacketUnitDetailsForRetailer(puid) {
  return new Promise((resolve, reject) => {
    makeChainTransaction("getSellingUnitDetail", puid).then((obj) => {
      obj = obj.valueOf();
      getJsonFromIPFS(obj[3]).then(details => {
        resolve({
          details,
          uid: puid,
          totalPackets: obj[0].toNumber(),
          packetsSold: obj[1].toNumber(),
          currentState: packetStates(obj[2].toNumber())
        });
      });
    }).catch(reject);
  });
}

export function getRowsForRetailer(rowCallback) {
  makeChainTransaction("getSellingUnits")
    .then(array => {
      array = array.valueOf();
      array.forEach(val => {
        val = val.toNumber();
        makeChainTransaction("getSellingUnitDetail", val)
          .then(x => handleObject(x, val))
          .catch(handleError);
      });
    })
    .catch(handleError);

  function handleObject(obj, uid) {
    obj = obj.valueOf();
    getJsonFromIPFS(obj[3]).then(details => {
      rowCallback({
        details,
        uid,
        totalPackets: obj[0].toNumber(),
        packetsSold: obj[1].toNumber(),
        currentState: packetStates(obj[2].toNumber())
      });
    });
  }
  function handleError(err) {
    throw err;
  }
}
