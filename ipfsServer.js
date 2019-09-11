const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const crypto = require("crypto");
const bs58 = require("bs58");
const cors = require("cors");
const Web3 = require("web3");
const abi = [
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
    "inputs": [
      {
        "name": "storeAddress",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "retailer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "distributor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "puid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "orderID",
        "type": "uint256"
      }
    ],
    "name": "BatchCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "oldOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "TransferOwnership",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "hash",
        "type": "string"
      }
    ],
    "name": "setDistributorDetails",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "who",
        "type": "address"
      }
    ],
    "name": "getDistributorDetails",
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
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isDistributor",
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
    "name": "addDistributor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getProductUnits",
    "outputs": [
      {
        "name": "puids",
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
        "name": "productUid",
        "type": "uint256"
      },
      {
        "name": "productHash",
        "type": "string"
      }
    ],
    "name": "setPrice",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "productUid",
        "type": "uint256"
      },
      {
        "name": "productHash",
        "type": "string"
      },
      {
        "name": "batchHash",
        "type": "string"
      },
      {
        "name": "transporter",
        "type": "address"
      },
      {
        "name": "retailer",
        "type": "address"
      },
      {
        "name": "orderId",
        "type": "uint256"
      }
    ],
    "name": "createBatch",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getBatchUnits",
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
    "constant": false,
    "inputs": [
      {
        "name": "batchUid",
        "type": "uint256"
      },
      {
        "name": "hash",
        "type": "string"
      },
      {
        "name": "retailer",
        "type": "address"
      },
      {
        "name": "transporter",
        "type": "address"
      }
    ],
    "name": "sendToRetailer",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const address = "0x37dcc226761918a4d996213b9ff7a6bf71bf5f45";
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://testnet2.matic.network/")
);
const orderStates = {
  pending: "Pending",
  success: "Completed",
  fail: "Rejected"
};
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let ipfsObject = {};
let pendingUsers = [];
let registeredUsers = [];
let purchaseOrders = {};

function createHash(obj) {
  let data = JSON.stringify(obj);
  const hashFunction = Buffer.from("12", "hex"); // 0x20

  const digest = crypto
    .createHash("sha256")
    .update(data)
    .digest();

  const digestSize = Buffer.from(digest.byteLength.toString(16), "hex");

  const combined = Buffer.concat([hashFunction, digestSize, digest]);

  const multihash = bs58.encode(combined);
  return multihash.toString();
}

let headers = {};
headers["Access-Control-Allow-Origin"] = "*";
headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
headers["Access-Control-Allow-Credentials"] = false;
headers["Access-Control-Max-Age"] = "86400"; // 24 hours
headers["Access-Control-Allow-Headers"] =
  "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

app.post("/add", function(req, res) {
  let object = req.body.object;
  console.log(object);
  let hash = createHash(object);
  ipfsObject[hash] = object;
  res.header(headers);
  res.send({ hash });
});

app.post("/get", function(req, res) {
  let hash = req.body.hash;
  console.log(hash);
  res.send({ object: ipfsObject[hash] });
});

app.post("/createOrder", function(req, res) {
  let payload = req.body.payload;
  let orders = payload.orders;
  orders.forEach(
    ({ retailerAddress, distributorAddress, productUnitId, amount }) => {
      if (!purchaseOrders[distributorAddress])
        purchaseOrders[distributorAddress] = [];
      let order = {
        retailerAddress,
        productUnitId,
        amount,
        currentState: orderStates.pending,
        orderID: purchaseOrders[distributorAddress].length
      };
      purchaseOrders[distributorAddress].push(order);
    }
  );

  res.send({
    message: "Order Created"
  });
});

function filterArray(array, filters) {
  return array.filter(
    ele => filters.findIndex(e => e === ele.currentState) !== -1
  );
}

app.post("/getOrders", function(req, res) {
  let payload = req.body.payload;
  let { distributorAddress, retailerAddress, filters } = payload;
  if (purchaseOrders[distributorAddress]) {
    if (retailerAddress) {
      let array = purchaseOrders[distributorAddress].filter(
        x => x.retailerAddress === retailerAddress
      );
      res.send({
        message: "Fetched Orders",
        array: filters ? filterArray(array, filters) : array
      });
    } else {
      res.send({
        message: "Fetched Orders",
        array: filters
          ? filterArray(purchaseOrders[distributorAddress], filters)
          : purchaseOrders[distributorAddress]
      });
    }
  } else {
    res.send({
      message: "Fetched Orders",
      array: []
    });
  }
});

app.patch("/editOrder", function(req, res) {
  let payload = req.body.payload;
  let { orderID, distributorAddress, amount } = payload;
  if (
    purchaseOrders[distributorAddress] &&
    purchaseOrders[distributorAddress][orderID]
  ) {
    purchaseOrders[distributorAddress][orderID].amount = amount;
    res.send({
      message: "Order Edited",
      order: purchaseOrders[distributorAddress][orderID]
    });
  } else {
    res.send({
      message: "Order Not Found"
    });
  }
});

app.post("/completeOrder", function(req, res) {
  let payload = req.body.payload;
  let transactionHash = payload.transactionHash;
  let contract = new web3.eth.Contract(abi, address);
  contract.getPastEvents("BatchCreated", { fromBlock: 0 }, (err, array) => {
    if (err) throw err;
    let { returnValues } = array.find(x => {
      return x.transactionHash === transactionHash;
    });
    let distributorAddress = returnValues.distributor;
    let orderID = returnValues.orderID;
    if (purchaseOrders[distributorAddress]) {
      purchaseOrders[distributorAddress][orderID].currentState =
        orderStates.success;
      res.send(purchaseOrders[distributorAddress][orderID]);
    }
  });
});

app.post("/addUser", function(req, res) {
  let userObj = req.body.userObj;
  // userObj = {details: {//details like email, name, number, etc}, public_key: 'eth public key' }
  pendingUsers.push(userObj);
  res.send({ message: "user added to array", userObj });
});

app.get("/getUsers", function(req, res) {
  res.send({ pendingUsers, registeredUsers });
});

app.post("/authenticateUser", function(req, res) {
  let requestedUser = req.body.userObj;
  registeredUsers.push(requestedUser);
  res.send({ message: "user successfully registered" });
});

app.listen(5001, function() {
  console.log("Server Listening on Port 5001");
  /*contract.events
    .BatchCreated({ fromBlock: 0 }, function(err, event) {
      console.log(err, event);
    })
    .on("data", event => {
      console.log(event);
      let retailerAddress = event.returnValues.retailer;
      let distributorAddress = event.returnValues.distributor;
      let puid = event.returnValues.puid;
      let orderID = event.returnValues.orderID;
      if (purchaseOrders[distributorAddress]) {
        purchaseOrders[distributorAddress][orderID].currentState =
          orderStates.success;
        console.log("Order Completed", retailerAddress, puid);
      }
    })
    .on("error", console.error);*/
});
