import {
    getJsonFromIPFS,
    harvestStates, makeChainTransaction,
    OWN_ADDRESS,
    packetStates,
    uploadJsonToIPFS
} from "./init";

export function setTransporterDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeChainTransaction("setTransporterDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getTransporterDetails(address) {
  return new Promise((resolve, reject) => {
    makeChainTransaction("getTransporterDetails", address ? address : OWN_ADDRESS)
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function getTransportUnitDetails(isHarvest, rowCallback) {
  let which = isHarvest ? 0 : 1;
  makeChainTransaction("getTransportUnitsByTransporter", which)
    .then(array => {
      array = array.valueOf();
      array.forEach(x => {
        x = x.toNumber();
        makeChainTransaction("getTransportUnitDetails", x, which)
          .then(o => handleObject(o, x))
          .catch(handleError);
      });
    })
    .catch(handleError);

  function handleObject(obj, uid) {
    obj = obj.valueOf();
    getJsonFromIPFS(obj[3]).then(details => {
      rowCallback({
        uid,
        details,
        currentState: isHarvest
          ? harvestStates(obj[4].toNumber())
          : packetStates(obj[4].toNumber()),
        senderAddress: obj[0],
        receiverAddress: obj[1],
        amount: obj[2].toNumber()
      });
    });
  }

  function handleError(err) {
    throw err;
  }
}

export function deliverOrDispatchTransport(uid, isHarvest, details) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeChainTransaction(
      "deliverOrDispatchByTransporter",
      uid,
      hash,
      isHarvest ? 0 : 1
    );
  });
}