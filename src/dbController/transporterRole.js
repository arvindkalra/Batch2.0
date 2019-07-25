import {
  getJsonFromIPFS,
  harvestStates,
  makeTransaction,
  uploadJsonToIPFS
} from "./init";

export function getTransportUnitDetails(isHarvest, rowCallback) {
  let which = isHarvest ? 0 : 1;
  makeTransaction("getTransportUnitsByTransporter", which)
    .then(array => {
      array = array.valueOf();
      array.forEach(x => {
        x = x.toNumber();
        makeTransaction("getTransportUnitDetails", x, which)
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
        currentState: harvestStates(obj[4].toNumber()),
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
  return uploadJsonToIPFS(details)
    .then(hash => {
      return makeTransaction(
        "deliverOrDispatchByTransporter",
        uid,
        hash,
        isHarvest ? 0 : 1
      );
    });
}
