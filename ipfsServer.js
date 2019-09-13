const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const crypto = require("crypto");
const bs58 = require("bs58");
const cors = require("cors");
const Web3 = require("web3");
const abi = [
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
        name: "orderNumber",
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
      },
      {
        name: "orderNumber",
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
];
const address = "0xe8ece56214f607dea63282a4085027d7213e6d9e";
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

let purchaseOrders = [];
let distributors = {};
let retailers = {};

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

app.use("/", (req, res, next) => {
  console.log(req.method, req.url, "\n");
  next();
});

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
  let {
    distributorAddress,
    retailerAddress,
    orders,
    orderDate
  } = req.body.payload;
  let purchaseOrderId = purchaseOrders.length;

  let arr = [];
  orders.forEach(({ productUnitId, amount }) => {
    let order = {
      productUnitId,
      amount,
      currentState: orderStates.pending,
      orderNumber: arr.length,
      orderDate
    };
    arr.push(order);
  });
  let objToBeAdded = {
    purchaseOrderId,
    distributorAddress,
    retailerAddress,
    orders: arr
  };
  purchaseOrders.push(objToBeAdded);
  distributors[distributorAddress]
    ? distributors[distributorAddress].push(purchaseOrderId)
    : (distributors[distributorAddress] = [purchaseOrderId]);
  retailers[retailerAddress]
    ? retailers[retailerAddress].push(purchaseOrderId)
    : (retailers[retailerAddress] = [purchaseOrderId]);
  res.send({
    message: "Order Created",
    result: objToBeAdded
  });
});

function filterArray(array, filter) {
  return array.filter(ele => ele.currentState === orderStates[filter]);
}

app.get("/order/get/:query", function(req, res) {
  let query = req.params.query;
  let distributor = req.query.address;
  let puid = req.query.productId;
  let purchaseOrdersForDistributor = distributors[distributor];

  if (
    purchaseOrdersForDistributor &&
    purchaseOrdersForDistributor.length !== 0
  ) {
    let arr = [];
    purchaseOrdersForDistributor.forEach(purchaseOrderId => {
      let purchaseOrder = purchaseOrders[purchaseOrderId];
      purchaseOrder.orders.forEach(order => {
        if (puid && order.productUnitId === puid)
          arr.push({
            ...order,
            distributorAddress: distributor,
            retailerAddress: purchaseOrder.retailerAddress,
            purchaseOrderId
          });
        else if (!puid)
          arr.push({
            ...order,
            distributorAddress: distributor,
            retailerAddress: purchaseOrder.retailerAddress,
            purchaseOrderId
          });
      });
    });
    res.send({
      message: "Found Some for the Distributor, See Result",
      result: query !== "all" ? filterArray(arr, query) : arr
    });
  } else {
    res.send({
      message: "Could Not Find Distributor",
      result: []
    });
  }
});

app.patch("/editOrder", function(req, res) {
  let payload = req.body.payload;
  let { orderId, retailerAddress, amount, purchaseOrderId } = payload;
  if (
    purchaseOrders[purchaseOrderId] &&
    purchaseOrders[purchaseOrderId].retailerAddress === retailerAddress &&
    purchaseOrders[purchaseOrderId].orders[orderId]
  ) {
    purchaseOrders[purchaseOrderId].orders[orderId].amount = amount;
    res.send({
      message: "Order Edited",
      result: purchaseOrders[purchaseOrderId].orders[orderId]
    });
  } else {
    res.send({
      message: "Order Not Found"
    });
  }
});

app.get("/purchase-order/get", function(req, res) {
  let purchaseOrderId = req.query.purchaseOrder;
  purchaseOrders[purchaseOrderId]
    ? res.send({
        message: "Purchase Order Found",
        result: purchaseOrders[purchaseOrderId]
      })
    : res.send({
        message: "Order Not Found",
        result: {}
      });
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
    let purchaseOrderId = returnValues.purchaseOrderId;
    let orderNumber = returnValues.orderNumber;
    if (purchaseOrders[purchaseOrderId]) {
      purchaseOrders[purchaseOrderId].orders[orderNumber].currentState =
        orderStates.success;
      res.send(purchaseOrders[purchaseOrderId].orders[orderNumber]);
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
      if (distributorOrders[distributorAddress]) {
        distributorOrders[distributorAddress][orderID].currentState =
          orderStates.success;
        console.log("Order Completed", retailerAddress, puid);
      }
    })
    .on("error", console.error);*/
});
