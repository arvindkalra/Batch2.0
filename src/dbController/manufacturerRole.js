import {
  getJsonFromIPFS,
  harvestStates,
  makeManufacturerTransaction,
  makeStorageTransaction,
  OWN_ADDRESS,
  packetStates,
  uploadJsonToIPFS
} from "./init";

export function setManufacturerDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeManufacturerTransaction("setManufacturerDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getManufacturerDetails(address) {
  return new Promise((resolve, reject) => {
    makeManufacturerTransaction(
      "getManufacturerDetails",
      address ? address : OWN_ADDRESS
    )
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function fetchHarvestUnitDetailsUsingUID(harvestUnitId) {
  return new Promise((resolve, reject) => {
    makeManufacturerTransaction("getHarvestUnit", harvestUnitId)
      .then(obj => {
        return handleObject(obj, harvestUnitId, true);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function fetchProductUnitDetailsUsingUID(productUnitId) {
  return new Promise((resolve, reject) => {
    makeManufacturerTransaction("getProductUnit", productUnitId)
      .then(obj => {
        return handleObject(obj, productUnitId, false);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function fetchHarvestUnitsByManufacturer(rowCallback) {
  makeManufacturerTransaction("getHarvestUnits")
    .then(array => {
      array = array.valueOf();
      for (let i = 0; i < array.length; i++) {
        let val = array[i].toNumber();
        makeStorageTransaction("getHarvestUnit", val)
          .then(x => {
            return handleObject(x, val, true);
          })
          .then(rowCallback)
          .catch(handleError);
      }
    })
    .catch(handleError);
}

function handleObject(obj, uid, isHarvest) {
  return new Promise((resolve, reject) => {
    obj = obj.valueOf();
    let currentOwner = obj[0];
    let latestHash = obj[1];
    let stateVariable = obj[2];
    getJsonFromIPFS(latestHash)
      .then(details => {
        resolve({
          uid,
          details,
          currentState: isHarvest ? harvestStates(stateVariable): packetStates(stateVariable),
          currentOwner
        });
      })
      .catch(reject);
  });
}

function handleError(err) {
  throw err;
}

export function fetchPackagedUnitsByManufacturer(rowCallback) {
  makeManufacturerTransaction("getProductUnits")
    .then(array => {
      array = array.valueOf();
      for (let i = 0; i < array.length; i++) {
        let val = array[i].toNumber();
        makeStorageTransaction("getProductUnit", val)
          .then(x => {
            return handleObject(x, val, false);
          })
          .then(rowCallback)
          .catch(handleError);
      }
    })
    .catch(handleError);
}

export function packetsManufactured(
  harvestUnitId,
  harvestObjectDetailsUpdated,
  productObjectDetailsNew
) {
  let harvestHash;
  let productHash;
  return uploadJsonToIPFS(harvestObjectdetailsUpdated)
    .then(hash => {
      harvestHash = hash;
      return uploadJsonToIPFS(productObjectDetailsNew);
    })
    .then(hash => {
      productHash = hash;
      return makeManufacturerTransaction(
        "productsManufactured",
        harvestUnitId,
        harvestHash,
        productHash
      );
    });
}

export function sendProductToDistributor(
  productUid,
  distributorAddress,
  transporterAddress,
  details
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeManufacturerTransaction(
      "sendProductsManufacturedToDistributor",
      productUid,
      hash,
      distributorAddress,
      transporterAddress
    );
  });
}
