const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const crypto = require("crypto");
const bs58 = require("bs58");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let ipfsObject = {};

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

app.use('/', function (req, res, next) {
  console.log(req.body);
  next();
});

app.post("/add", function(req, res) {
  let object = req.body.object;
  let hash = createHash(object);
  ipfsObject[hash] = object;
  res.send({ hash });
});

app.post("/get", function(req, res) {
  let hash = req.body.hash;
  res.send({ object: ipfsObject[hash] });
});

app.listen(5001, function() {
  console.log("Server Listening on Port 5001");
});
