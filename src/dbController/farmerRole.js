import {
    getJsonFromIPFS,
    harvestStates,
    makeFarmerTransaction,
    makeStorageTransaction,
    OWN_ADDRESS,
    uploadJsonToIPFS
} from "./init";

export function setFarmerDetails(details) {
    return new Promise((resolve, reject) => {
        uploadJsonToIPFS(details).then(hash => {
            makeFarmerTransaction("setFarmerDetails", hash)
                .then(resolve)
                .catch(reject);
        });
    });
}

export function getFarmerDetails(address) {
    return new Promise((resolve, reject) => {
        makeFarmerTransaction("getFarmerDetails", address ? address : OWN_ADDRESS)
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
            makeFarmerTransaction("seedsSown", hash)
                .then(resolve)
                .catch(reject);
        });
    });
}

export function sendToLaboratory(
    harvestUnitId,
    labAddress,
    transporterAddress,
    details
) {
    return uploadJsonToIPFS(details).then(hash => {
        return makeFarmerTransaction(
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
            makeFarmerTransaction("moveLocation", harvestUnitId, hash, currentState)
                .then(resolve)
                .catch(reject);
        });
    });
}

export function plantDestroyedByFarmer(harvestUnitId, details) {
    return uploadJsonToIPFS(details).then(hash => {
        return makeFarmerTransaction("destroyCrop", harvestUnitId, hash);
    });
}

export function plantHarvestedByFarmer(harvestUnitId, details) {
    return new Promise((resolve, reject) => {
        uploadJsonToIPFS(details).then(hash => {
            makeFarmerTransaction("plantHarvest", harvestUnitId, hash)
                .then(resolve)
                .catch(reject);
        });
    });
}

export function sellHarvestByFarmer(
    harvestUnitId,
    manufacturerAddress,
    transporterAddress,
    details
) {
    return new Promise((resolve, reject) => {
        uploadJsonToIPFS(details).then(hash => {
            makeFarmerTransaction(
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
                let currentState = object[2].toNumber();

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
    makeFarmerTransaction("fetchSeeds")
        .then(array => {
            array = array.valueOf();
            for (let i = array.length - 1; i >= 0; i--) {
                let uid = array[i].toNumber();
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
        let currentState = object[2].toNumber();

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
