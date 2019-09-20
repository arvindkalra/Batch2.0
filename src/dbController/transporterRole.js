import {
  batchStates,
  convertFromHex,
  convertToHex,
  getJsonFromIPFS,
  harvestStates,
  makeStorageTransaction,
  makeTransporterTransaction,
  packetStates,
  uploadJsonToIPFS
} from "./init";
import { OWN_ADDRESS } from "./Web3Connections";

export function setTransporterDetails(details, callback) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeTransporterTransaction(callback, "setTransporterDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getTransporterDetails(address) {
  return new Promise((resolve, reject) => {
    makeTransporterTransaction(
      "call",
      "getTransporterDetails",
      address ? address : OWN_ADDRESS
    )
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

function handleObject(object, uid, isHarvest, isBatch) {
  uid = convertToHex(uid);
  return new Promise((resolve, reject) => {
    object = object.valueOf();
    console.log("Here", object[1]);
    getJsonFromIPFS(object[1])
      .then(details => {
        resolve({
          currentOwner: object[0],
          uid,
          details,
          currentState: isHarvest
            ? harvestStates(parseInt(object[2]))
            : isBatch
            ? batchStates(parseInt(object[2]))
            : packetStates(parseInt(object[2]))
        });
      })
      .catch(reject);
  });
}

function handleError(err) {
  throw err;
}

export function getLabSampleConsignments(rowCallback) {
  return new Promise((resolve, reject) => {
    makeTransporterTransaction("call", "getFarmerToLabConsignments").then(
      array => {
        array = array.valueOf();
        for (let i = 0; i < array.length; i++) {
          let x = parseInt(array[i]);
          makeStorageTransaction("getHarvestUnit", x)
            .then(o => {
              return handleObject(o, x, true);
            })
            .then(x => {
              rowCallback(x, array.length);
              complete(i, array.length - 1);
            })
            .catch(handleError);
        }

        if (array.length === 0) {
          rowCallback(undefined, 0);
        }

        function complete(iteration, max) {
          if (iteration === max) {
            resolve();
          }
        }
      }
    );
  });
}

export function dispatchLabSampleConsignment(
  harvestUid,
  laboratoryAddress,
  details,
  signCallback
) {
  harvestUid = convertFromHex(harvestUid);
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      signCallback,
      "dispatchOrDeliverFarmerToLab",
      1,
      harvestUid,
      hash,
      laboratoryAddress
    );
  });
}

export function deliverLabSampleConsignment(
  harvestUid,
  laboratoryAddress,
  details,
  signCallback
) {
  harvestUid = convertFromHex(harvestUid);
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      signCallback,
      "dispatchOrDeliverFarmerToLab",
      0,
      harvestUid,
      hash,
      laboratoryAddress
    );
  });
}

export function getFarmToFactoryConsignments(rowCallback) {
  return new Promise((resolve, reject) => {
    makeTransporterTransaction("call", "getFarmerToFactoryConsignments").then(
      array => {
        array = array.valueOf();
        for (let i = 0; i < array.length; i++) {
          let x = parseInt(array[i]);
          makeStorageTransaction("getHarvestUnit", x)
            .then(o => {
              return handleObject(o, x, true);
            })
            .then(x => {
              rowCallback(x, array.length);
              completed(i, array.length - 1);
            })
            .catch(handleError);
        }

        if (array.length === 0) {
          rowCallback(undefined, 0);
        }

        function completed(iteration, max) {
          if (iteration === max) {
            resolve();
          }
        }
      }
    );
  });
}

export function dispatchFarmToFactoryConsignment(
  harvestUid,
  manufacturerAddress,
  details,
  signCallback
) {
  harvestUid = convertFromHex(harvestUid);
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      signCallback,
      "dispatchOrDeliverFarmerToFactory",
      1,
      harvestUid,
      hash,
      manufacturerAddress
    );
  });
}

export function deliverFarmToFactoryConsignment(
  harvestUid,
  manufacturerAddress,
  details,
  signCallback
) {
  harvestUid = convertFromHex(harvestUid);
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      signCallback,
      "dispatchOrDeliverFarmerToFactory",
      0,
      harvestUid,
      hash,
      manufacturerAddress
    );
  });
}

export function getFactoryToDistributorConsignments(rowCallback) {
  makeTransporterTransaction(
    "call",
    "getFactoryToDistributorConsignments"
  ).then(array => {
    array = array.valueOf();
    for (let i = 0; i < array.length; i++) {
      let x = parseInt(array[i]);
      makeStorageTransaction("getProductUnit", x)
        .then(o => {
          return handleObject(o, x);
        })
        .then(o => rowCallback(o, array.length))
        .catch(handleError);
    }
    if (array.length === 0) {
      rowCallback(undefined, 0);
    }
  });
}

export function dispatchFactoryToDistributorConsignment(
  productUnitId,
  distributorAddress,
  details,
  signCallback
) {
  productUnitId = convertFromHex(productUnitId);
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      signCallback,
      "dispatchOrDeliverFactoryToDistributor",
      1,
      productUnitId,
      hash,
      distributorAddress
    );
  });
}

export function deliverFactoryToDistributorConsignment(
  productUnitId,
  distributorAddress,
  details,
  signCallback
) {
  productUnitId = convertFromHex(productUnitId);
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      signCallback,
      "dispatchOrDeliverFactoryToDistributor",
      0,
      productUnitId,
      hash,
      distributorAddress
    );
  });
}

export function getDistributorToRetailerConsignments(rowCallback) {
  makeTransporterTransaction(
    "call",
    "getDistributorToRetailerConsignments"
  ).then(array => {
    array = array.valueOf();
    for (let i = 0; i < array.length; i++) {
      let x = parseInt(array[i]);
      makeStorageTransaction("getBatchUnit", x)
        .then(o => {
          return handleObject(o, x, false, true);
        })
        .then(o => rowCallback(o, array.length))
        .catch(handleError);
    }
    if (array.length === 0) {
      rowCallback(undefined, 0);
    }
  });
}

export function dispatchDistributorToShopConsignment(
  batchUnitId,
  retailerAddress,
  details,
  signCallback
) {
  batchUnitId = convertFromHex(batchUnitId);
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      signCallback,
      "dispatchOrDeliverDistributorToRetailer",
      1,
      batchUnitId,
      hash,
      retailerAddress
    );
  });
}

export function deliverDistributorToShopConsignment(
  batchUnitId,
  retailerAddress,
  details,
  signCallback
) {
  batchUnitId = convertFromHex(batchUnitId);
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      signCallback,
      "dispatchOrDeliverDistributorToRetailer",
      0,
      batchUnitId,
      hash,
      retailerAddress
    );
  });
}
