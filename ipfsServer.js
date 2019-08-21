const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const crypto = require("crypto");
const bs58 = require("bs58");
const cors = require("cors");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

let ipfsObject = {};
let pendingUsers = [];
let registeredUsers = [];

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

app.post("/add", function (req, res) {
    let object = req.body.object;
    console.log(object);
    let hash = createHash(object);
    ipfsObject[hash] = object;
    res.header(headers);
    res.send({hash});
});

app.post("/get", function (req, res) {
    let hash = req.body.hash;
    console.log(hash);
    res.send({object: ipfsObject[hash]});
});

app.post('/addUser', function (req, res) {
    let userObj = req.body.userObj;
    // userObj = {details: {//details like email, name, number, etc}, public_key: 'eth public key' }
    pendingUsers.push(userObj);
    res.send({message: 'user added to array', userObj})

});


app.get('/getUsers', function (req, res) {
    res.send({pendingUsers, registeredUsers})
});

app.post('/authenticateUser', function (req, res) {
    let requestedUser = req.body.userObj;
    registeredUsers.push(requestedUser);
    res.send({message: 'user successfully registered'})
});


app.listen(5001, function () {
    console.log("Server Listening on Port 5001");
});
