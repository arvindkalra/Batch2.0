import { getJsonFromIPFS, makeTransaction, packetStates } from "./init";

export function getRowsForRetailer(rowCallback) {
  makeTransaction("getSellingUnits")
    .then(array => {
      array = array.valueOf();
      array.forEach(val => {
        val = val.toNumber();
        makeTransaction("getSellingUnitDetail", val)
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
