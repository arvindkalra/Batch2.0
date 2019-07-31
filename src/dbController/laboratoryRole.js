import {
  getJsonFromIPFS,
  harvestStates, makeChainTransaction, makeLabTransaction,
  OWN_ADDRESS,
  uploadJsonToIPFS
} from "./init";

export function setLaboratoryDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeLabTransaction("setLaboratoryDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getLaboratoryDetails(address) {
  return new Promise((resolve, reject) => {
    makeLabTransaction("getLaboratoryDetails", address ? address : OWN_ADDRESS)
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function uploadReport(buid, details, isApproved) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details)
      .then(hash => {
        console.log(buid, hash, isApproved);
        makeChainTransaction(
          "plantAcceptedByLaboratory",
          buid,
          hash,
          isApproved ? 1 : 0
        )
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
}

export function getRowsForLaboratory(rowCallback) {
  let handleRow = (obj, uid) => {
    obj = obj.valueOf();
    // console.log(obj);
    getJsonFromIPFS(obj[3]).then(details => {
      rowCallback({
        uid,
        details,
        currentState: harvestStates(obj[1].toNumber()),
        harvestAmount: obj[2].toNumber(),
        farmerAddress: obj[0]
      });
    });
  };
  let handleError = () => {};
  makeChainTransaction("fetchReportsForLaboratory")
    .then(array => {
      array = array.valueOf();
      array.forEach(val => {
        val = val.toNumber();
        makeChainTransaction("fetchReportDetails", val)
          .then(x => handleRow(x, val))
          .catch(handleError);
      });
    })
    .catch(handleError);
}
