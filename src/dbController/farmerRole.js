import {
  getJsonFromIPFS,
  harvestStates,
  makeTransaction,
  OWN_ADDRESS,
  uploadJsonToIPFS
} from "./init";

export function setFarmerDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeTransaction("setFarmerDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getFarmerDetails(address) {
  return new Promise((resolve, reject) => {
    makeTransaction("getFarmerDetails", address ? address : OWN_ADDRESS)
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function seedSownByFarmer(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeTransaction("seedsSownByFarmer", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function locationMovedByFarmer(buid, details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeTransaction("movedLocationByFarmer", buid, hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function plantHarvestedByFarmer(
  amountHarvest,
  labAddress,
  buid,
  details
) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeTransaction(
        "plantHarvestedByFarmer",
        amountHarvest,
        labAddress,
        buid,
        hash
      )
        .then(resolve)
        .catch(reject);
    });
  });
}

export function sellHarvestByFarmer(
  buid,
  manufacturerAddress,
  transporterAddress,
  details
) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeTransaction(
        "sellHarvestByFarmer",
        buid,
        manufacturerAddress,
        transporterAddress,
        hash
      )
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getRowsForFarmer(rowObject) {
  makeTransaction("fetchSeedsForFarmer")
    .then(array => {
      array = array.valueOf();
      for (let i = 0; i < array.length; i++) {
        let uid = array[i].toNumber();
        makeTransaction("getSeedUnitDetails", uid)
          .then(x => handleObject(x, uid))
          .catch(handleError);
      }
    })
    .catch(handleError);

  function handleObject(object, uid) {
    object = object.valueOf();
    let addresses = object[0];
    let integers = object[1];
    let latestHash = object[2];

    getJsonFromIPFS(latestHash)
      .then(obj => {
        let rowObj = {
          uid,
          details: obj,
          farmerAddress: addresses[0],
          manufacturerAddress: addresses[1],
          laboratoryAddress: addresses[2],
          transporterAddress: addresses[3],
          amountHarvested: integers[0].toNumber(),
          currentState: harvestStates(integers[2].toNumber())
        };
        rowObject(rowObj);
      })
      .catch(handleError);
  }

  function handleError(err) {
    throw err;
  }
}
