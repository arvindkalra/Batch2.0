export default {
    "NETWORK_NAME" : "Truffle",
    "CHAIN_ADDRESS": "0x345ca3e014aaf5dca488057592ee47305d9b3e10",
    "LAB_ADDRESS": "0xf12b5dd4ead5f743c6baa640b0216200e89b60da",
    "CHAIN_ABI" : [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "setTransporterDetails",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "isManufacturer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "add",
                    "type": "address"
                }
            ],
            "name": "getManufacturerDetails",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "isTransporter",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceTransporter",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "setManufacturerDetails",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "isRetailer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "addManufacturer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "add",
                    "type": "address"
                }
            ],
            "name": "getRetailerDetails",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "setFarmerDetails",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "addFarmer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceFarmer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "add",
                    "type": "address"
                }
            ],
            "name": "getTransporterDetails",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "addRetailer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "addTransporter",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "isFarmer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "setRetailerDetails",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "add",
                    "type": "address"
                }
            ],
            "name": "getFarmerDetails",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceRetailer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceManufacturer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "labAddress",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_hash",
                    "type": "string"
                }
            ],
            "name": "seedsSownByFarmer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "fetchSeedsForFarmer",
            "outputs": [
                {
                    "name": "buids",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_buid",
                    "type": "uint256"
                }
            ],
            "name": "getSeedUnitDetails",
            "outputs": [
                {
                    "name": "addresses",
                    "type": "address[4]"
                },
                {
                    "name": "integers",
                    "type": "uint256[3]"
                },
                {
                    "name": "latestHash",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "buid",
                    "type": "uint256"
                },
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "movedLocationByFarmer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "amountHarvest",
                    "type": "uint256"
                },
                {
                    "name": "labAddress",
                    "type": "address"
                },
                {
                    "name": "buid",
                    "type": "uint256"
                },
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "plantHarvestedByFarmer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "buid",
                    "type": "uint256"
                },
                {
                    "name": "hash",
                    "type": "string"
                },
                {
                    "name": "approval",
                    "type": "uint8"
                }
            ],
            "name": "plantAcceptedByLaboratory",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "fetchReportsForLaboratory",
            "outputs": [
                {
                    "name": "reports",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "buid",
                    "type": "uint256"
                }
            ],
            "name": "fetchReportDetails",
            "outputs": [
                {
                    "name": "farmerAddress",
                    "type": "address"
                },
                {
                    "name": "currentState",
                    "type": "uint256"
                },
                {
                    "name": "latestHash",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "buid",
                    "type": "uint256"
                },
                {
                    "name": "manufacturerAddress",
                    "type": "address"
                },
                {
                    "name": "transporterAddress",
                    "type": "address"
                },
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "sellHarvestByFarmer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getHarvestsByManufacturer",
            "outputs": [
                {
                    "name": "harvests",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "buid",
                    "type": "uint256"
                }
            ],
            "name": "getHarvestDetailsByManufacturer",
            "outputs": [
                {
                    "name": "integers",
                    "type": "uint256[3]"
                },
                {
                    "name": "addresses",
                    "type": "address[2]"
                },
                {
                    "name": "latestHash",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getPacketsByManufacturer",
            "outputs": [
                {
                    "name": "packs",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "puid",
                    "type": "uint256"
                }
            ],
            "name": "getPacketDetailsByManufacturer",
            "outputs": [
                {
                    "name": "integers",
                    "type": "uint256[3]"
                },
                {
                    "name": "addresses",
                    "type": "address[2]"
                },
                {
                    "name": "latestHash",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "buid",
                    "type": "uint256"
                },
                {
                    "name": "numberOfPackets",
                    "type": "uint256"
                },
                {
                    "name": "harvestUsed",
                    "type": "uint256"
                },
                {
                    "name": "retailerAddress",
                    "type": "address"
                },
                {
                    "name": "transporterAddress",
                    "type": "address"
                },
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "packetsManufactured",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "which",
                    "type": "uint8"
                }
            ],
            "name": "getTransportUnitsByTransporter",
            "outputs": [
                {
                    "name": "transportUnits",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "uid",
                    "type": "uint256"
                },
                {
                    "name": "which",
                    "type": "uint8"
                }
            ],
            "name": "getTransportUnitDetails",
            "outputs": [
                {
                    "name": "sender",
                    "type": "address"
                },
                {
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "name": "hash",
                    "type": "string"
                },
                {
                    "name": "currentState",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "uid",
                    "type": "uint256"
                },
                {
                    "name": "hash",
                    "type": "string"
                },
                {
                    "name": "which",
                    "type": "uint8"
                }
            ],
            "name": "deliverOrDispatchByTransporter",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getSellingUnits",
            "outputs": [
                {
                    "name": "sellingUnits",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "buid",
                    "type": "uint256"
                }
            ],
            "name": "getSellingUnitDetail",
            "outputs": [
                {
                    "name": "totalPackets",
                    "type": "uint256"
                },
                {
                    "name": "packetsSold",
                    "type": "uint256"
                },
                {
                    "name": "currentState",
                    "type": "uint256"
                },
                {
                    "name": "latestHash",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "puid",
                    "type": "uint256"
                },
                {
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "sellToConsumer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "uid",
                    "type": "uint256"
                }
            ],
            "name": "fetchEntireChain",
            "outputs": [
                {
                    "name": "packetHash",
                    "type": "string"
                },
                {
                    "name": "harvestHash",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ],
    "LAB_ABI":  [
        {
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "setUserHash",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getUsersHash",
            "outputs": [
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "setCaller",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "isConsumer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "isLaboratory",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "addLaboratory",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "renounceLaboratory",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "setLaboratoryDetails",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "add",
                    "type": "address"
                }
            ],
            "name": "getLaboratoryDetails",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                },
                {
                    "name": "suid",
                    "type": "uint256"
                }
            ],
            "name": "_addReportRequest",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "_getReportRequests",
            "outputs": [
                {
                    "name": "seeds",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                },
                {
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "setConsumerDetails",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "getConsumerDetails",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]
}
