import {
  getJsonFromIPFS,
  harvestStates,
  makeChainTransaction,
  OWN_ADDRESS,
  uploadJsonToIPFS
} from "./init";

export function setFarmerDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeChainTransaction("setFarmerDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getFarmerDetails(address) {
  return new Promise((resolve, reject) => {
    makeChainTransaction("getFarmerDetails", address ? address : OWN_ADDRESS)
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
      makeChainTransaction("seedsSownByFarmer", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function sendToLaboratory(buid, labAddress, details) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeChainTransaction("sendToLab", buid, labAddress, hash);
  });
}

export function locationMovedByFarmer(buid, details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeChainTransaction("movedLocationByFarmer", buid, hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function plantHarvestedByFarmer(
  amountHarvest,
  buid,
  details
) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeChainTransaction(
        "plantHarvestedByFarmer",
        amountHarvest,
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
      makeChainTransaction(
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

export function getSeedUnitDetais(buid) {
  return new Promise((resolve, reject) => {
    return makeChainTransaction("getSeedUnitDetails", buid).then(object => {
      object = object.valueOf();
      let addresses = object[0];
      let integers = object[1];
      let latestHash = object[2];
      console.log(addresses, integers, latestHash );

      getJsonFromIPFS(latestHash).then(obj => {
        let rowObj = {
          buid: buid,
          details: obj,
          farmerAddress: addresses[0],
          manufacturerAddress: addresses[1],
          laboratoryAddress: addresses[2],
          transporterAddress: addresses[3],
          amountHarvested: integers[0].toNumber(),
          currentState: harvestStates(integers[2].toNumber())
        };
        resolve(rowObj);
      });
    });
  });
}

export function getRowsForFarmer(rowObject) {
  makeChainTransaction("fetchSeedsForFarmer")
    .then(array => {
      array = array.valueOf();
      for (let i = 0; i < array.length; i++) {
        let uid = array[i].toNumber();
        makeChainTransaction("getSeedUnitDetails", uid)
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
