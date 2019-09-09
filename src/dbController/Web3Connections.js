import Web3 from "web3";
import config from "../config";

export const web3 = new Web3(new Web3.providers.HttpProvider(config.RPC_URL));

let STORAGE;
let FARMER;
let LABORATORY;
let TRANSPORTER;
let MANUFACTURER;
let RETAILER;
let DISTRIBUTOR;

let PRIVATE_KEY = config.OWN_PRIVATE_KEY;
export let OWN_ADDRESS;
let SIGN_TRANSACTION;

export function initialSetup(resolve, reject) {
    if (sessionStorage.getItem("pkey")) {
        PRIVATE_KEY = JSON.parse(sessionStorage.getItem("pkey"));
        let obj = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
        OWN_ADDRESS = obj.address;
        SIGN_TRANSACTION = obj.signTransaction;
        createContractInstance();
        resolve();
    } else {
        alert("Not Logged In Go to the Home Page");
        reject();
    }
}

// replacement function for initialSetup

export function initSetup(pvtKey, resolve, reject) {

    let obj = web3.eth.accounts.privateKeyToAccount(pvtKey);
    OWN_ADDRESS = obj.address;
    sessionStorage.setItem("pkey", JSON.stringify(pvtKey));
    SIGN_TRANSACTION = obj.signTransaction;
    createContractInstance();
    resolve(OWN_ADDRESS);
}

function createContractInstance() {
    STORAGE = new web3.eth.Contract(config.STORAGE, config.STORAGE_ADDRESS);
    FARMER = new web3.eth.Contract(config.FARMER, config.FARMER_ADDRESS);
    LABORATORY = new web3.eth.Contract(
        config.LABORATORY,
        config.LABORATORY_ADDRESS
    );
    TRANSPORTER = new web3.eth.Contract(
        config.TRANSPORTER,
        config.TRANSPORTER_ADDRESS
    );
    MANUFACTURER = new web3.eth.Contract(
        config.MANUFACTURER,
        config.MANUFACTURER_ADDRESS
    );
    RETAILER = new web3.eth.Contract(config.RETAILER, config.RETAILER_ADDRESS);
    DISTRIBUTOR = new web3.eth.Contract(
        config.DISTRIBUTOR,
        config.DISTRIBUTOR_ADDRESS
    );
}

function signTransaction(tx) {
    return new Promise((resolve, reject) => {
        SIGN_TRANSACTION(tx, (err, {rawTransaction}) => {
            if (err) reject(err);
            web3.eth
                .sendSignedTransaction(rawTransaction)
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => console.log(e));
        });
    });
}

export function callStorageContract(functionName, resolve, reject, ...args) {
    STORAGE.methods[functionName](...args)
        .call({from: OWN_ADDRESS, gasPrice: 0})
        .then(resolve)
        .catch(reject);
}

export function callFarmerContract(functionName, resolve, reject, ...args) {
    FARMER.methods[functionName](...args)
        .call({from: OWN_ADDRESS, gasPrice: 0})
        .then(resolve)
        .catch(reject);
}

export function sendFarmerContract(
    functionName,
    resolve,
    reject,
    callback,
    ...args
) {
    console.log(args);
    FARMER.methods[functionName](...args)
        .estimateGas({from: OWN_ADDRESS})
        .then(gasEstimate => {
            let transaction = {
                from: OWN_ADDRESS,
                to: config.FARMER_ADDRESS,
                gas: gasEstimate + 100,
                gasPrice: 0,
                data: FARMER.methods[functionName](...args).encodeABI()
            };
            callback({
                from: transaction.from,
                to: transaction.to,
                gas: transaction.gas,
                data: transaction.data,
                functionName: functionName,
                confirm: () => {
                    signTransaction(transaction)
                        .then(resolve)
                        .catch(reject);
                }
            });
        })
        .catch(reject);
}

export function callLaboratoryContract(functionName, resolve, reject, ...args) {
    LABORATORY.methods[functionName](...args)
        .call({from: OWN_ADDRESS, gasPrice: 0})
        .then(resolve)
        .catch(reject);
}

export function sendLaboratoryContract(
    functionName,
    resolve,
    reject,
    callback,
    ...args
) {
    LABORATORY.methods[functionName](...args)
        .estimateGas({from: OWN_ADDRESS})
        .then(gasEstimate => {
            let transaction = {
                from: OWN_ADDRESS,
                to: config.LABORATORY_ADDRESS,
                gas: gasEstimate + 100,
                gasPrice: 0,
                data: LABORATORY.methods[functionName](...args).encodeABI()
            };
            callback({
                from: transaction.from,
                to: transaction.to,
                gas: transaction.gas,
                data: transaction.data,
                functionName: functionName,
                confirm: () => {
                    signTransaction(transaction)
                        .then(resolve)
                        .catch(reject);
                }
            });
        })
        .catch(reject);
}

export function callTransporterContract(
    functionName,
    resolve,
    reject,
    ...args
) {
    TRANSPORTER.methods[functionName](...args)
        .call({from: OWN_ADDRESS, gasPrice: 0})
        .then(resolve)
        .catch(reject);
}

export function sendTransporterContract(
    functionName,
    resolve,
    reject,
    callback,
    ...args
) {
    TRANSPORTER.methods[functionName](...args)
        .estimateGas({from: OWN_ADDRESS})
        .then(gasEstimate => {
            let transaction = {
                from: OWN_ADDRESS,
                to: config.TRANSPORTER_ADDRESS,
                gas: gasEstimate + 100,
                gasPrice: 0,
                data: TRANSPORTER.methods[functionName](...args).encodeABI()
            };
            callback({
                from: transaction.from,
                to: transaction.to,
                gas: transaction.gas,
                data: transaction.data,
                functionName: functionName,
                confirm: () => {
                    signTransaction(transaction)
                        .then(resolve)
                        .catch(reject);
                }
            });
        })
        .catch(reject);
}

export function callManufacturerContract(
    functionName,
    resolve,
    reject,
    ...args
) {
    MANUFACTURER.methods[functionName](...args)
        .call({from: OWN_ADDRESS, gasPrice: 0})
        .then(resolve)
        .catch(reject);
}

export function sendManufacturerContract(
    functionName,
    resolve,
    reject,
    callback,
    ...args
) {
    MANUFACTURER.methods[functionName](...args)
        .estimateGas({from: OWN_ADDRESS})
        .then(gasEstimate => {
            let transaction = {
                from: OWN_ADDRESS,
                to: config.MANUFACTURER_ADDRESS,
                gas: gasEstimate + 100,
                gasPrice: 0,
                data: MANUFACTURER.methods[functionName](...args).encodeABI()
            };
            callback({
                from: transaction.from,
                to: transaction.to,
                gas: transaction.gas,
                data: transaction.data,
                functionName: functionName,
                confirm: () => {
                    signTransaction(transaction)
                        .then(resolve)
                        .catch(reject);
                }
            });
        })
        .catch(reject);
}

export function callDistributorContract(
    functionName,
    resolve,
    reject,
    ...args
) {
    DISTRIBUTOR.methods[functionName](...args)
        .call({from: OWN_ADDRESS, gasPrice: 0})
        .then(resolve)
        .catch(reject);
}

export function sendDistributorContract(
    functionName,
    resolve,
    reject,
    callback,
    ...args
) {
    DISTRIBUTOR.methods[functionName](...args)
        .estimateGas({from: OWN_ADDRESS})
        .then(gasEstimate => {
            let transaction = {
                from: OWN_ADDRESS,
                to: config.DISTRIBUTOR_ADDRESS,
                gas: gasEstimate + 100,
                gasPrice: 0,
                data: DISTRIBUTOR.methods[functionName](...args).encodeABI()
            };
            callback({
                from: transaction.from,
                to: transaction.to,
                gas: transaction.gas,
                data: transaction.data,
                functionName: functionName,
                confirm: () => {
                    signTransaction(transaction)
                        .then(resolve)
                        .catch(reject);
                }
            });
        })
        .catch(reject);
}

export function callRetailerContract(functionName, resolve, reject, ...args) {
    RETAILER.methods[functionName](...args)
        .call({from: OWN_ADDRESS, gasPrice: 0})
        .then(resolve)
        .catch(reject);
}

export function sendRetailerContract(
    functionName,
    resolve,
    reject,
    callback,
    ...args
) {
    RETAILER.methods[functionName](...args)
        .estimateGas({from: OWN_ADDRESS})
        .then(gasEstimate => {
            let transaction = {
                from: OWN_ADDRESS,
                to: config.RETAILER_ADDRESS,
                gas: gasEstimate + 100,
                gasPrice: 0,
                data: RETAILER.methods[functionName](...args).encodeABI()
            };
            callback({
                from: transaction.from,
                to: transaction.to,
                gas: transaction.gas,
                data: transaction.data,
                functionName: functionName,
                confirm: () => {
                    signTransaction(transaction)
                        .then(resolve)
                        .catch(reject);
                }
            });
        })
        .catch(reject);
}
