import {
  getJsonFromIPFS,
  harvestStates,
  makeTransaction,
  OWN_ADDRESS,
  uploadJsonToIPFS
} from "./init";

export function setManufacturerDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeTransaction("setManufacturerDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getManufacturerDetails(address) {
  return new Promise((resolve, reject) => {
    makeTransaction("getManufacturerDetails", address ? address : OWN_ADDRESS)
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function fetchHarvestUnitsByManufacturer(rowCallback) {
  makeTransaction("getHarvestsByManufacturer")
    .then(array => {
      array = array.valueOf();
      array.forEach(val => {
        val = val.toNumber();
        makeTransaction("getHarvestDetailsByManufacturer", val)
          .then(x => handleObject(x, val))
          .catch(handleError);
      });
    })
    .catch(handleError);

  function handleObject(obj, uid) {
    obj = obj.valueOf();
    let integers = obj[0];
    let addresses = obj[1];
    let latestHash = obj[2];
    getJsonFromIPFS(latestHash)
      .then(details => {
        rowCallback({
          uid,
          details,
          amountCreated: integers[0].toNumber(),
          amountAlreadyUsed: integers[1].toNumber(),
          currentState: harvestStates(integers[2].toNumber()),
          farmerAddress: addresses[0],
          transporterAddress: addresses[1]
        });
      })
      .catch(handleError);
  }

  function handleError(err) {
    throw err;
  }
}

export function fetchPackagedUnitsByManufacturer(rowCallback) {
  makeTransaction("getPacketsByManufacturer")
    .then(array => {
      array = array.valueOf();
      array.forEach(val => {
        val = val.toNumber();
        makeTransaction("getPacketDetailsByManufacturer", val)
          .then(x => handleObject(x, val))
          .catch(handleError);
      });
    })
    .catch(handleError);

  function handleObject(obj, uid) {
    obj = obj.valueOf();
    let integers = obj[0];
    let addresses = obj[1];
    let latestHash = obj[2];
    getJsonFromIPFS(latestHash)
      .then(details => {
        rowCallback({
          uid,
          details,
          amountCreated: integers[0].toNumber(),
          amountAlreadyUsed: integers[1].toNumber(),
          currentState: harvestStates(integers[2].toNumber()),
          retailerAddress: addresses[0],
          transporterAddress: addresses[1]
        });
      })
      .catch(handleError);
  }

  function handleError(err) {
    throw err;
  }
}

export function packetsManufactured(
  harvestUnitId,
  numberOfPackets,
  harvestUsed,
  retailerAddress,
  transporterAddress,
  details
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransaction(
      "packetsManufactured",
      harvestUnitId,
      numberOfPackets,
      harvestUsed,
      retailerAddress,
      transporterAddress,
      hash
    );
  });
}
