import {
  getJsonFromIPFS,
  harvestStates,
  makeFarmerTransaction,
  makeStorageTransaction,
  uploadJsonToIPFS
} from "./init";
import { OWN_ADDRESS } from "./Web3Connections";

export function setFarmerDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeFarmerTransaction("send", "setFarmerDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getFarmerDetails(address) {
  return new Promise((resolve, reject) => {
    makeFarmerTransaction(
      "call",
      "getFarmerDetails",
      address ? address : OWN_ADDRESS
    )
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function seedSownByFarmer(details, signCallback) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeFarmerTransaction(signCallback, "seedsSown", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function sendToLaboratory(
  harvestUnitId,
  labAddress,
  transporterAddress,
  details,
  signCallback
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeFarmerTransaction(
      signCallback,
      "sendToLabForTest",
      harvestUnitId,
      hash,
      labAddress,
      transporterAddress
    );
  });
}

export function locationMovedByFarmer(harvestUnitId, currentState, details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeFarmerTransaction(
        "send",
        "moveLocation",
        harvestUnitId,
        hash,
        currentState
      )
        .then(resolve)
        .catch(reject);
    });
  });
}

export function plantDestroyedByFarmer(harvestUnitId, details, signCallback) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeFarmerTransaction(
      signCallback,
      "destroyCrop",
      harvestUnitId,
      hash
    );
  });
}

export function plantHarvestedByFarmer(harvestUnitId, details, signCallback) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeFarmerTransaction(signCallback, "plantHarvest", harvestUnitId, hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function sellHarvestByFarmer(
  harvestUnitId,
  manufacturerAddress,
  transporterAddress,
  details,
  signCallback
) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeFarmerTransaction(
        signCallback,
        "packForDelivery",
        harvestUnitId,
        hash,
        transporterAddress,
        manufacturerAddress
      )
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getSeedUnitDetails(harvestUnitId) {
  return new Promise((resolve, reject) => {
    return makeStorageTransaction("getHarvestUnit", harvestUnitId).then(
      object => {
        object = object.valueOf();
        let currentOwner = object[0];
        let latestHash = object[1];
        let currentState = parseInt(object[2]);

        getJsonFromIPFS(latestHash).then(obj => {
          let rowObj = {
            harvestUnitId: harvestUnitId,
            currentOwner,
            details: obj,
            currentState: harvestStates(currentState)
          };
          resolve(rowObj);
        });
      }
    );
  });
}

export function getRowsForFarmer(rowObject) {
  makeFarmerTransaction("call", "fetchSeeds")
    .then(array => {
      array = array.valueOf();
      for (let i = array.length - 1; i >= 0; i--) {
        let uid = array[i];
        makeStorageTransaction("getHarvestUnit", uid)
          .then(x => handleObject(x, uid))
          .catch(handleError);
      }
    })
    .catch(handleError);

  function handleObject(object, uid) {
    object = object.valueOf();
    let currentOwner = object[0];
    let latestHash = object[1];
    let currentState = parseInt(object[2]);

    getJsonFromIPFS(latestHash)
      .then(obj => {
        let rowObj = {
          harvestUnitId: uid,
          currentOwner,
          details: obj,
          currentState: harvestStates(currentState)
        };
        rowObject(rowObj);
      })
      .catch(handleError);
  }

  function handleError(err) {
    throw err;
  }
}
