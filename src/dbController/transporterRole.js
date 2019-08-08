import {
  getJsonFromIPFS,
  harvestStates,
  makeStorageTransaction,
  makeTransporterTransaction,
  OWN_ADDRESS,
  uploadJsonToIPFS
} from "./init";

export function setTransporterDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeTransporterTransaction("setTransporterDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getTransporterDetails(address) {
  return new Promise((resolve, reject) => {
    makeTransporterTransaction(
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

function handleObject(object, uid) {
  return new Promise((resolve, reject) => {
    object = object.valueOf();
    getJsonFromIPFS(object[1])
      .then(details => {
        resolve({
          currentOwner: object[0],
          harvestUnitId: uid,
          details,
          currentState: harvestStates(object[2].toNumber())
        });
      })
      .catch(reject);
  });
}

function handleError(err) {
  throw err;
}

export function getLabSampleConsignments(rowCallback) {
  makeTransporterTransaction("getFarmerToLabConsignments").then(array => {
    array = array.valueOf();
    for (let i = 0; i < array.length; i++) {
      let x = array[i].toNumber();
      makeStorageTransaction("getHarvestUnit", x)
        .then(o => {
          return handleObject(o, x);
        })
        .then(rowCallback)
        .catch(handleError);
    }
  });
}

export function dispatchLabSampleConsignment(
  harvestUid,
  laboratoryAddress,
  details
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
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
  details
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      "dispatchOrDeliverFarmerToLab",
      0,
      harvestUid,
      hash,
      laboratoryAddress
    );
  });
}

export function getFarmToFactoryConsignments(rowCallback) {
  makeTransporterTransaction("getFarmerToFactoryConsignments").then(array => {
    array = array.valueOf();
    for (let i = 0; i < array.length; i++) {
      let x = array[i].toNumber();
      makeStorageTransaction("getHarvestUnit", x)
        .then(o => {
          return handleObject(o, x);
        })
        .then(rowCallback)
        .catch(handleError);
    }
  });
}

export function dispatchFarmToFactoryConsignment(
  harvestUid,
  manufacturerAddress,
  details
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
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
  details
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      "dispatchOrDeliverFarmerToFactory",
      0,
      harvestUid,
      hash,
      manufacturerAddress
    );
  });
}

export function getFactoryToDistributorConsignments(rowCallback) {
  makeTransporterTransaction("getFactoryToDistributorConsignments").then(
    array => {
      array = array.valueOf();
      for (let i = 0; i < array.length; i++) {
        let x = array[i].toNumber();
        makeStorageTransaction("getProductUnit", x)
          .then(o => {
            return handleObject(o, x);
          })
          .then(rowCallback)
          .catch(handleError);
      }
    }
  );
}

export function dispatchFactoryToDistributorConsignment(
  productUnitId,
  distributorAddress,
  details
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
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
  details
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
      "dispatchOrDeliverFactoryToDistributor",
      0,
      productUnitId,
      hash,
      distributorAddress
    );
  });
}

export function getDistributorToRetailerConsignments(rowCallback) {
  makeTransporterTransaction("getDistributorToRetailerConsignments").then(
    array => {
      array = array.valueOf();
      for (let i = 0; i < array.length; i++) {
        let x = array[i].toNumber();
        makeStorageTransaction("getBatchUnit")
          .then(o => {
            return handleObject(o, x);
          })
          .then(rowCallback)
          .catch(handleError);
      }
    }
  );
}

export function dispatchDistributorToShopConsignment(
  batchUnitId,
  retailerAddress,
  details
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
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
  details
) {
  return uploadJsonToIPFS(details).then(hash => {
    return makeTransporterTransaction(
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
