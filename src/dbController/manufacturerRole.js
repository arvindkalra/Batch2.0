import {
  getJsonFromIPFS,
  harvestStates, makeChainTransaction,
  makeTransaction,
  OWN_ADDRESS, packetStates,
  uploadJsonToIPFS
} from "./init";

export function setManufacturerDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeChainTransaction("setManufacturerDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getManufacturerDetails(address) {
  return new Promise((resolve, reject) => {
    makeChainTransaction("getManufacturerDetails", address ? address : OWN_ADDRESS)
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function fetchHarvestUnitsByManufacturer(rowCallback) {
  makeChainTransaction("getHarvestsByManufacturer")
    .then(array => {
      array = array.valueOf();
      array.forEach(val => {
        val = val.toNumber();
        makeChainTransaction("getHarvestDetailsByManufacturer", val)
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
  makeChainTransaction("getPacketsByManufacturer")
    .then(array => {
      array = array.valueOf();
      array.forEach(val => {
        val = val.toNumber();
        makeChainTransaction("getPacketDetailsByManufacturer", val)
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
          currentState: packetStates(integers[2].toNumber()),
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
    return makeChainTransaction(
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
