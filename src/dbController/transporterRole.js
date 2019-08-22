import {
  batchStates,
  getJsonFromIPFS,
  harvestStates,
  makeStorageTransaction,
  makeTransporterTransaction,
  packetStates,
  uploadJsonToIPFS
} from "./init";
import { OWN_ADDRESS } from "./Web3Connections";

export function setTransporterDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeTransporterTransaction("send", "setTransporterDetails", hash)
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
  return new Promise((resolve, reject) => {
    object = object.valueOf();
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
              rowCallback(x);
              complete(i, array.length - 1);
            })
            .catch(handleError);
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
        .then(rowCallback)
        .catch(handleError);
    }
  });
}

export function dispatchFactoryToDistributorConsignment(
  productUnitId,
  distributorAddress,
  details,
  signCallback
) {
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
        .then(rowCallback)
        .catch(handleError);
    }
  });
}

export function dispatchDistributorToShopConsignment(
  batchUnitId,
  retailerAddress,
  details,
  signCallback
) {
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

export function getTransportUnitDetails(isHarvest, rowCallback) {
  // let which = isHarvest ? 0 : 1;
  // makeChainTransaction("getTransportUnitsByTransporter", which)
  //   .then(array => {
  //     array = array.valueOf();
  //     array.forEach(x => {
  //       x = x.toNumber();
  //       makeChainTransaction("getTransportUnitDetails", x, which)
  //         .then(o => handleObject(o, x))
  //         .catch(handleError);
  //     });
  //   })
  //   .catch(handleError);
  //
  // function handleObject(obj, uid) {
  //   obj = obj.valueOf();
  //   getJsonFromIPFS(obj[3]).then(details => {
  //     rowCallback({
  //       uid,
  //       details,
  //       currentState: isHarvest
  //         ? harvestStates(obj[4].toNumber())
  //         : packetStates(obj[4].toNumber()),
  //       senderAddress: obj[0],
  //       receiverAddress: obj[1],
  //       amount: obj[2].toNumber()
  //     });
  //   });
  // }
  //
  // function handleError(err) {
  //   throw err;
  // }
}

export function deliverOrDispatchTransport(uid, isHarvest, details) {
  // return uploadJsonToIPFS(details).then(hash => {
  //   return makeChainTransaction(
  //     "deliverOrDispatchByTransporter",
  //     uid,
  //     hash,
  //     isHarvest ? 0 : 1
  //   );
  // });
}
