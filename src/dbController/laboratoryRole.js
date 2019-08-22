import {
  getJsonFromIPFS,
  harvestStates,
  makeLaboratoryTransaction,
  makeStorageTransaction,
  uploadJsonToIPFS
} from "./init";
import { OWN_ADDRESS } from "./Web3Connections";

export function setLaboratoryDetails(details) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details).then(hash => {
      makeLaboratoryTransaction("send", "setLaboratoryDetails", hash)
        .then(resolve)
        .catch(reject);
    });
  });
}

export function getLaboratoryDetails(address) {
  return new Promise((resolve, reject) => {
    makeLaboratoryTransaction(
      "call",
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
  isApproved,
  signCallback
) {
  return new Promise((resolve, reject) => {
    uploadJsonToIPFS(details)
      .then(hash => {
        makeLaboratoryTransaction(
          signCallback,
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
        currentState: harvestStates(parseInt(obj[2]))
      });
    });
  };
  let handleError = () => {};
  makeLaboratoryTransaction("call", "fetchReportRequests")
    .then(array => {
      array = array.valueOf();
      array.forEach(val => {
        val = parseInt(val);
        makeStorageTransaction("getHarvestUnit", val)
          .then(x => handleRow(x, val))
          .catch(handleError);
      });
    })
    .catch(handleError);
}
