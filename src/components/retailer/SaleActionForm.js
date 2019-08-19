import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  getConsumerDetails,
  isConsumer,
  sellPacketsToBuyer,
  setConsumerDetails
} from "../../dbController/retailerRole";
import Modal from "react-bootstrap/Modal";
import { fileToString } from "../../helpers";
import {
  checkMined,
  connectToMetamask,
  OWN_ADDRESS
} from "../../dbController/init";
import ShipmentRow from "../transporter/ShipmentRow";
import Table from "react-bootstrap/es/Table";
import Loader from "../Loader";

const SaleActionForm = ({ buid, details }) => {
  const [registered, setRegistered] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const [buyerAddress, setBuyerAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [consumerName, setConsumerName] = useState("");
  const [license, setLicense] = useState("");
  const [buyerDetails, setBuyerDetails] = useState("");
  const [transactionMining, setTransactionMining] = useState(false)

  const fetchDetails = e => {
    e.preventDefault();
    e.stopPropagation();
    isConsumer(buyerAddress).then(boolean => {
      if (boolean) {
        getConsumerDetails(buyerAddress).then(buyerObject => {
          console.log(buyerObject);
          setShowFullForm(true);
          setRegistered(true);
          setBuyerDetails(buyerObject);
        });
      } else {
        setShowFullForm(true);
      }
    });
  };

  const handleFileChange = e => {
    fileToString(e.target.files[0]).then(result => {
      setLicense(result);
    });
  };

  const sellToRegistered = e => {
    e.preventDefault();
    e.stopPropagation();
    setTransactionMining(true)
    let jsonToBeUploaded = buyerDetails;
    jsonToBeUploaded.purchases.push({
      amount: amount,
      price: sellingPrice,
      batchBought: buid,
      seller: OWN_ADDRESS,
      boughtOn: new Date().toLocaleString()
    });
    sell(jsonToBeUploaded);
  };

  const sellToNewConsumer = e => {
    e.preventDefault();
    e.stopPropagation();
    setTransactionMining(true)
    let jsonToBeUploaded = {
      name: consumerName,
      license: license,
      purchases: [
        {
          amount: amount,
          price: sellingPrice,
          batchBought: buid,
          seller: OWN_ADDRESS,
          boughtOn: new Date().toLocaleString()
        }
      ]
    };
    sell(jsonToBeUploaded);
  };

  const sell = jsonToBeUploaded => {
    let unitsAlreadySold = details.totalUnitsAlreadySold
      ? details.totalUnitsAlreadySold
      : 0;
    details.totalUnitsAlreadySold = unitsAlreadySold + amount;
    console.log(details);
    console.log(jsonToBeUploaded);
    sellPacketsToBuyer(buid, buyerAddress, details, jsonToBeUploaded).then(
      txHash => {
        checkMined(txHash, () => window.location.reload());
      }
    );
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Form.Group controlId={"buyer"}>
            <Form.Label>Buyer Address</Form.Label>
            <Form.Row>
              <Col md={9}>
                <Form.Control
                  type={"text"}
                  placeholder={"Enter the Consumer's ethereum address"}
                  onChange={e => {
                    setBuyerAddress(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Button onClick={fetchDetails}>Fetch Consumer Details</Button>
              </Col>
            </Form.Row>
          </Form.Group>
        </Col>
        {showFullForm ? (
          <>
            {registered ? (
              <Col md={12}>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Consumer Name</th>
                      <th>Consumer License</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{buyerDetails.name}</td>
                      <td>
                        <a href={buyerDetails.license} download={true}>
                          Download
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            ) : (
              <>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Consumer Name</Form.Label>
                    <Form.Control
                      type={"text"}
                      placeholder={"Enter the name of the consumer"}
                      onChange={e => {
                        setConsumerName(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className={"custom-file-label"}>
                      Customer ID-proof
                    </Form.Label>
                    <Form.Control
                      className={"custom-file-input"}
                      type={"file"}
                      placeholder={"Upload the customer's id proof"}
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                </Col>
              </>
            )}
            <Col md={12}>
              <Form.Group controlId={"amount"}>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type={"number"}
                  placeholder={"Enter the Quantity you want to Sell"}
                  onChange={e => {
                    setAmount(parseInt(e.target.value));
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId={"price"}>
                <Form.Label>Selling Price</Form.Label>
                <Form.Control
                  type={"number"}
                  placeholder={"Enter the selling price"}
                  onChange={e => {
                    setSellingPrice(parseInt(e.target.value));
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Button
                onClick={registered ? sellToRegistered : sellToNewConsumer}
              >
                Sell Product
              </Button>
            </Col>
          </>
        ) : (
          <></>
        )}
      </Row>
      {transactionMining? <Loader/>:null}
    </>
  );
};

export default SaleActionForm;
