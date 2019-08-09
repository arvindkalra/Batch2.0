import {
  getJsonFromIPFS,
  harvestStates,
  makeLaboratoryTransaction,
  makeStorageTransaction,
  OWN_ADDRESS,
  uploadJsonToIPFS
} from "./init";

export function setLaboratoryDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeLaboratoryTransaction("setLaboratoryDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getLaboratoryDetails(address) {
  return new Promise((resolve, reject) => {
    makeLaboratoryTransaction(
      "getLaboratoryDetails",
      address ? address : OWN_ADDRESS
    )
      .then(hash => {
        return getJsonFromIPFS(hash);
      })
      .then(resolve)
      .catch(reject);
  });
}

export function uploadReport(
  harvestUnitId,
  farmerAddress,
  details,
  isApproved
) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details)
      .then(hash => {
        makeLaboratoryTransaction(
          "uploadReport",
          harvestUnitId,
          hash,
          isApproved ? 1 : 0,
          farmerAddress
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
    getJsonFromIPFS(obj[1]).then(details => {
      rowCallback({
        uid,
        details,
        currentOwner: obj[0],
        currentState: harvestStates(obj[2].toNumber())
      });
    });
  };
  let handleError = () => {};
  makeLaboratoryTransaction("fetchReportRequests")
    .then(array => {
      array = array.valueOf();
      array.forEach(val => {
        val = val.toNumber();
        makeStorageTransaction("getHarvestUnit", val)
          .then(x => handleRow(x, val))
          .catch(handleError);
      });
    })
    .catch(handleError);
}
