export default {
  // SERVER_URL: "http://13.127.54.87:2000",
  SERVER_URL: "http://localhost:2000",
  // PURCHASE_ORDER_SERVER: "http://13.127.54.87:2000",
  PURCHASE_ORDER_SERVER: "http://localhost:2000",
  NETWORK_NAME: "Truffle",

  // For Matic After resolving Issue #14
  RPC_URL: "https://testnet2.matic.network",
  OWN_PRIVATE_KEY:
    "0x24EC32025D946BE6BE3A2D03D6E0062751D1EC73EAAD9CABBC28711A4AC477D1",
  ADDRESS: "0xDaab6E2dF20FD2F05f2Ae11E99172ba1590017cB",

  STORAGE_ADDRESS: "0x86f1ce3e4182c99f993b27010ffd56bb2ce2d280",
  FARMER_ADDRESS: "0x5ccb1a5bc8dd795ef5024f7057726c11b253f75b",
  LABORATORY_ADDRESS: "0x8a658e826db18a8bc7d4d58550f141b5bc338415",
  TRANSPORTER_ADDRESS: "0xa40e7dc0ad13cca297a6eef9644d8946770bc720",
  MANUFACTURER_ADDRESS: "0x45a01a68c9446dea5dfb12adebcb9e3113d9e5ac",
  DISTRIBUTOR_ADDRESS: "0x463e80f6d176a1cdaf92d3e234cbee42889715ee",
  // Change on ipfsServer as well
  RETAILER_ADDRESS: "0x8b52bb6a9416fee89559d9cc77b8dab1a2415ab2",

  // Chain Storage - 0x86f1ce3e4182c99f993b27010ffd56bb2ce2d280
  // Farmer Role - 0x5ccb1a5bc8dd795ef5024f7057726c11b253f75b
  // Lab Role - 0x8a658e826db18a8bc7d4d58550f141b5bc338415
  // Transporter Role - 0xa40e7dc0ad13cca297a6eef9644d8946770bc720
  // Manufacturer Role - 0x45a01a68c9446dea5dfb12adebcb9e3113d9e5ac
  // Distributor Role - 0x463e80f6d176a1cdaf92d3e234cbee42889715ee
  // Retailer Role - 0x8b52bb6a9416fee89559d9cc77b8dab1a2415ab2
  //0xDaab6E2dF20FD2F05f2Ae11E99172ba1590017cB
  // Private Key - 0x24EC32025D946BE6BE3A2D03D6E0062751D1EC73EAAD9CABBC28711A4AC477D1


  /*
  // For Matic Testnet
  RPC_URL: "https://testnet2.matic.network",
  OWN_PRIVATE_KEY:
    "0XB9A081AE2A58FCFDA0BD85B3852A251F57A3D146676DD168097206CC03EBBA85",
  ADDRESS: "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20",

  STORAGE_ADDRESS: "0xc244c13d2004871ad2eaa99d75b0b8d86f50d5fa",
  FARMER_ADDRESS: "0x24f18dd6c2d300d249cfccf5e2f825edd05dadcb",
  LABORATORY_ADDRESS: "0x5db68a0a1837dc06b89509bd436fea5de7e69ac7",
  TRANSPORTER_ADDRESS: "0x8952b04ec6a804bff80299c17e182e30bb6336b2",
  MANUFACTURER_ADDRESS: "0x9edd4cb8d079fb55cd8ec8d5a18e7849ff3eccb7",
  DISTRIBUTOR_ADDRESS: "0x59a658842fa8cb0e968143f0ca5ee9216635c686",
  RETAILER_ADDRESS: "0xa5df1c2d0ab0e1ebb3a6d057bd0db0f33e65b1ea",
*/

  /*
  // For AWS Truffle
  RPC_URL: "http://35.154.84.229:8545",
  OWN_PRIVATE_KEY: "0x22ca85ef46e05b99a0d771a1117492bf10f6cfe288e362e8e9bd78d6a4a6a4e6",
  STORAGE_ADDRESS: "0x73733fa5fc45f6c703ca1e14c71cf995b903d8b7",
  FARMER_ADDRESS: "0x0ac78aa15368507b9027aa57eb297783625725f5",
  LABORATORY_ADDRESS: "0x66061036dcb669737e5601d2101915ae14140c1b",
  TRANSPORTER_ADDRESS: "0xd0f43680f75f0a0c5aa0bca11865b17e2cd57f53",
  MANUFACTURER_ADDRESS: "0x0bfee797bf0fa20ef56f3e8088afd77e6f5fedf4",
  DISTRIBUTOR_ADDRESS: "0xdc88568b16cba4aa109ab50ea53155d28495fe0f",
  RETAILER_ADDRESS: "0x2951ecf7df9099348f3dfa1e5db450b1990871b7",
  */

  STORAGE: [
    {
      constant: false,
      inputs: [
        {
          name: "allowed",
          type: "address"
        }
      ],
      name: "addAllowedContract",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getHarvestUnitsForFarmer",
      outputs: [
        {
          name: "huids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "who",
          type: "address"
        },
        {
          name: "which",
          type: "uint256"
        }
      ],
      name: "addFarmerToLabConsignment",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getFarmerToLabConsignments",
      outputs: [
        {
          name: "huids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "who",
          type: "address"
        },
        {
          name: "which",
          type: "uint256"
        }
      ],
      name: "addLabReportsForLab",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getLabReportsForLab",
      outputs: [
        {
          name: "huids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "who",
          type: "address"
        },
        {
          name: "which",
          type: "uint256"
        }
      ],
      name: "addFarmerToFactoryConsignment",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getFarmerToFactoryConsignments",
      outputs: [
        {
          name: "huids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "who",
          type: "address"
        },
        {
          name: "which",
          type: "uint256"
        }
      ],
      name: "addHarvestUnitForManufacturer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getHarvestUnitsForManufacturer",
      outputs: [
        {
          name: "huids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getProductionUnitsForManufacturer",
      outputs: [
        {
          name: "puids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "who",
          type: "address"
        },
        {
          name: "which",
          type: "uint256"
        }
      ],
      name: "addFactoryToDistributionConsignment",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getFactoryToDistributionConsignments",
      outputs: [
        {
          name: "puids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "who",
          type: "address"
        },
        {
          name: "which",
          type: "uint256"
        }
      ],
      name: "addProductUnitForDistributor",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getProductionUnitsForDistributor",
      outputs: [
        {
          name: "puids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getBatchesForDistributor",
      outputs: [
        {
          name: "buids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "who",
          type: "address"
        },
        {
          name: "which",
          type: "uint256"
        }
      ],
      name: "addDistributorToRetailerConsignment",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getDistributorToRetailerConsignments",
      outputs: [
        {
          name: "buids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "who",
          type: "address"
        },
        {
          name: "which",
          type: "uint256"
        }
      ],
      name: "addBatchForRetailer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getBatchesForRetailer",
      outputs: [
        {
          name: "buids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "currentOwner",
          type: "address"
        },
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "createHarvestUnit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "harvestUid",
          type: "uint256"
        }
      ],
      name: "getHarvestUnit",
      outputs: [
        {
          name: "currentOwner",
          type: "address"
        },
        {
          name: "latestHash",
          type: "string"
        },
        {
          name: "currentState",
          type: "uint8"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "newAddress",
          type: "address"
        },
        {
          name: "latestHash",
          type: "string"
        },
        {
          name: "newState",
          type: "uint8"
        }
      ],
      name: "setHarvestUnit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "currentOwner",
          type: "address"
        },
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "createProductUnit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "productUid",
          type: "uint256"
        }
      ],
      name: "getProductUnit",
      outputs: [
        {
          name: "currentOwner",
          type: "address"
        },
        {
          name: "latestHash",
          type: "string"
        },
        {
          name: "currentState",
          type: "uint8"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "productUid",
          type: "uint256"
        },
        {
          name: "newAddress",
          type: "address"
        },
        {
          name: "latestHash",
          type: "string"
        },
        {
          name: "newState",
          type: "uint8"
        }
      ],
      name: "setProductUnit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "currentOwner",
          type: "address"
        },
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "createBatchUnit",
      outputs: [
        {
          name: "buid",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "batchUid",
          type: "uint256"
        }
      ],
      name: "getBatchUnit",
      outputs: [
        {
          name: "currentOwner",
          type: "address"
        },
        {
          name: "latestHash",
          type: "string"
        },
        {
          name: "currentState",
          type: "uint8"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "batchUid",
          type: "uint256"
        },
        {
          name: "newAddress",
          type: "address"
        },
        {
          name: "latestHash",
          type: "string"
        },
        {
          name: "newState",
          type: "uint8"
        }
      ],
      name: "setBatchUnit",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  FARMER: [
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "isOwner",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          name: "storeAddress",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "oldOwner",
          type: "address"
        },
        {
          indexed: true,
          name: "newOwner",
          type: "address"
        }
      ],
      name: "TransferOwnership",
      type: "event"
    },
    {
      constant: false,
      inputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "setFarmerDetails",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getFarmerDetails",
      outputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isFarmer",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "addFarmer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "seedsSown",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "fetchSeeds",
      outputs: [
        {
          name: "harvestUnitIds",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        },
        {
          name: "currentState",
          type: "uint8"
        }
      ],
      name: "moveLocation",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "plantHarvest",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        },
        {
          name: "laboratory",
          type: "address"
        },
        {
          name: "transporter",
          type: "address"
        }
      ],
      name: "sendToLabForTest",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        },
        {
          name: "transporter",
          type: "address"
        },
        {
          name: "manufacturer",
          type: "address"
        }
      ],
      name: "packForDelivery",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "destroyCrop",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  LABORATORY: [
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "isOwner",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          name: "storeAddress",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "oldOwner",
          type: "address"
        },
        {
          indexed: true,
          name: "newOwner",
          type: "address"
        }
      ],
      name: "TransferOwnership",
      type: "event"
    },
    {
      constant: false,
      inputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "setLaboratoryDetails",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getLaboratoryDetails",
      outputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isLaboratory",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "addLaboratory",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "fetchReportRequests",
      outputs: [
        {
          name: "reports",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "addReportDetails",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        },
        {
          name: "approved",
          type: "uint8"
        },
        {
          name: "farmer",
          type: "address"
        }
      ],
      name: "uploadReport",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  TRANSPORTER: [
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "isOwner",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          name: "storeAddress",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "oldOwner",
          type: "address"
        },
        {
          indexed: true,
          name: "newOwner",
          type: "address"
        }
      ],
      name: "TransferOwnership",
      type: "event"
    },
    {
      constant: false,
      inputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "setTransporterDetails",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getTransporterDetails",
      outputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isTransporter",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "addTransporter",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getFarmerToLabConsignments",
      outputs: [
        {
          name: "huids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "isDispatch",
          type: "uint8"
        },
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        },
        {
          name: "laboratory",
          type: "address"
        }
      ],
      name: "dispatchOrDeliverFarmerToLab",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getFarmerToFactoryConsignments",
      outputs: [
        {
          name: "huids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "isDispatch",
          type: "uint8"
        },
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        },
        {
          name: "manufacturer",
          type: "address"
        }
      ],
      name: "dispatchOrDeliverFarmerToFactory",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getFactoryToDistributorConsignments",
      outputs: [
        {
          name: "puids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "isDispatch",
          type: "uint8"
        },
        {
          name: "productUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        },
        {
          name: "distributor",
          type: "address"
        }
      ],
      name: "dispatchOrDeliverFactoryToDistributor",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getDistributorToRetailerConsignments",
      outputs: [
        {
          name: "buids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "isDispatch",
          type: "uint8"
        },
        {
          name: "batchUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        },
        {
          name: "retailer",
          type: "address"
        }
      ],
      name: "dispatchOrDeliverDistributorToRetailer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  MANUFACTURER: [
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "isOwner",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          name: "storeAddress",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "oldOwner",
          type: "address"
        },
        {
          indexed: true,
          name: "newOwner",
          type: "address"
        }
      ],
      name: "TransferOwnership",
      type: "event"
    },
    {
      constant: false,
      inputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "setManufacturerDetails",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getManufacturerDetails",
      outputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isManufacturer",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "addManufacturer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getHarvestUnits",
      outputs: [
        {
          name: "huids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "harvestUid",
          type: "uint256"
        },
        {
          name: "harvestHash",
          type: "string"
        },
        {
          name: "productHash",
          type: "string"
        }
      ],
      name: "productsManufactured",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getProductUnits",
      outputs: [
        {
          name: "puids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "productUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        },
        {
          name: "distributor",
          type: "address"
        },
        {
          name: "transporter",
          type: "address"
        }
      ],
      name: "sendProductsManufacturedToDistributor",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  DISTRIBUTOR: [
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "isOwner",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          name: "storeAddress",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "purchaseOrderId",
          type: "uint256"
        },
        {
          indexed: false,
          name: "productUnitId",
          type: "uint256"
        }
      ],
      name: "BatchCreated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "oldOwner",
          type: "address"
        },
        {
          indexed: true,
          name: "newOwner",
          type: "address"
        }
      ],
      name: "TransferOwnership",
      type: "event"
    },
    {
      constant: false,
      inputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "setDistributorDetails",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getDistributorDetails",
      outputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isDistributor",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "addDistributor",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getProductUnits",
      outputs: [
        {
          name: "puids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "productUid",
          type: "uint256"
        },
        {
          name: "productHash",
          type: "string"
        }
      ],
      name: "setPrice",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "productUid",
          type: "uint256"
        },
        {
          name: "productHash",
          type: "string"
        },
        {
          name: "batchHash",
          type: "string"
        },
        {
          name: "transporter",
          type: "address"
        },
        {
          name: "retailer",
          type: "address"
        },
        {
          name: "purchaseOrderId",
          type: "uint256"
        }
      ],
      name: "createBatch",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getBatchUnits",
      outputs: [
        {
          name: "buids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "batchUid",
          type: "uint256"
        },
        {
          name: "hash",
          type: "string"
        },
        {
          name: "retailer",
          type: "address"
        },
        {
          name: "transporter",
          type: "address"
        }
      ],
      name: "sendToRetailer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  RETAILER: [
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [
        {
          name: "",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "isOwner",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          name: "storeAddress",
          type: "address"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "oldOwner",
          type: "address"
        },
        {
          indexed: true,
          name: "newOwner",
          type: "address"
        }
      ],
      name: "TransferOwnership",
      type: "event"
    },
    {
      constant: false,
      inputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      name: "setRetailerDetails",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "who",
          type: "address"
        }
      ],
      name: "getRetailerDetails",
      outputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isRetailer",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "addRetailer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "getBatchUnits",
      outputs: [
        {
          name: "buids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "isConsumer",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address"
        }
      ],
      name: "getConsumerDetails",
      outputs: [
        {
          name: "hash",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "batchUid",
          type: "uint256"
        },
        {
          name: "buyer",
          type: "address"
        },
        {
          name: "buyerHash",
          type: "string"
        },
        {
          name: "saleHash",
          type: "string"
        }
      ],
      name: "sellToConsumer",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "distributor",
          type: "address"
        }
      ],
      name: "getProductUnitsForDistributor",
      outputs: [
        {
          name: "puids",
          type: "uint256[]"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ]
  // Change to ipfsServes as well
};
