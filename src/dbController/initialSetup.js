import {
  connectToWeb3,
  makeDistributorTransaction,
  makeFarmerTransaction,
  makeLaboratoryTransaction,
  makeManufacturerTransaction,
  makeRetailerTransaction,
  makeTransporterTransaction
} from "./init";
import config from "../config";
import { sendStorageContract } from "./Web3Connections";
import { setFarmerDetails } from "./farmerRole";
import { setLaboratoryDetails } from "./laboratoryRole";
import { setTransporterDetails } from "./transporterRole";
import { setManufacturerDetails } from "./manufacturerRole";
import { setDistributorDetails } from "./distributorRole";
import { setRetailerDetails } from "./retailerRole";

function acceptTransaction(obj) {
  obj.confirm();
}

export function setUp() {
  connectToWeb3(config.OWN_PRIVATE_KEY)
    .then(() => {
      return new Promise((resolve, reject) => {
        sendStorageContract(
          "addAllowedContract",
          resolve,
          reject,
          acceptTransaction,
          config.FARMER_ADDRESS
        );
      });
    })
    .then(hash => {
      console.log(hash);
      return new Promise((resolve, reject) => {
        sendStorageContract(
          "addAllowedContract",
          resolve,
          reject,
          acceptTransaction,
          config.LABORATORY_ADDRESS
        );
      });
    })
    .then(hash => {
      console.log(hash);
      return new Promise((resolve, reject) => {
        sendStorageContract(
          "addAllowedContract",
          resolve,
          reject,
          acceptTransaction,
          config.TRANSPORTER_ADDRESS
        );
      });
    })
    .then(hash => {
      console.log(hash);
      return new Promise((resolve, reject) => {
        sendStorageContract(
          "addAllowedContract",
          resolve,
          reject,
          acceptTransaction,
          config.MANUFACTURER_ADDRESS
        );
      });
    })
    .then(hash => {
      console.log(hash);
      return new Promise((resolve, reject) => {
        sendStorageContract(
          "addAllowedContract",
          resolve,
          reject,
          acceptTransaction,
          config.DISTRIBUTOR_ADDRESS
        );
      });
    })
    .then(hash => {
      console.log(hash);
      return new Promise((resolve, reject) => {
        sendStorageContract(
          "addAllowedContract",
          resolve,
          reject,
          acceptTransaction,
          config.RETAILER_ADDRESS
        );
      });
    })
    .then(hash => {
      console.log(hash);
      initialAddRolesAndSetDetails();
    });
}

function initialAddRolesAndSetDetails() {
  makeFarmerTransaction(acceptTransaction, "addFarmer", config.ADDRESS)
    .then(hash => {
      console.log(hash);
      return makeLaboratoryTransaction(
        acceptTransaction,
        "addLaboratory",
        config.ADDRESS
      );
    })
    .then(hash => {
      console.log(hash);
      return makeTransporterTransaction(
        acceptTransaction,
        "addTransporter",
        config.ADDRESS
      );
    })
    .then(hash => {
      console.log(hash);
      return makeManufacturerTransaction(
        acceptTransaction,
        "addManufacturer",
        config.ADDRESS
      );
    })
    .then(hash => {
      console.log(hash);
      return makeDistributorTransaction(
        acceptTransaction,
        "addDistributor",
        config.ADDRESS
      );
    })
    .then(hash => {
      console.log(hash);
      return makeRetailerTransaction(
        acceptTransaction,
        "addRetailer",
        config.ADDRESS
      );
    })
    .then(hash => {
      console.log(hash);
      setDetails();
    });
}

export function setDetails() {
  connectToWeb3(config.OWN_PRIVATE_KEY).then(() => {
    let init = {
      name: "Name",
      companyName: "Company"
    };
    setFarmerDetails(init, acceptTransaction).then(hash => {
      console.log(hash);
      setLaboratoryDetails(init, acceptTransaction).then(hash => {
        console.log(hash);
        setTransporterDetails(init, acceptTransaction).then(hash => {
          console.log(hash);
          setManufacturerDetails(init, acceptTransaction).then(hash => {
            console.log(hash);
            setDistributorDetails(init, acceptTransaction).then(hash => {
              console.log(hash);
              setRetailerDetails(init, acceptTransaction).then(hash => {
                console.log(hash);
              });
            });
          });
        });
      });
    });
  });
}
