import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import { createBatchByDistributor } from "../../dbController/distributorRole";
import { checkMined } from "../../dbController/init";
import Layout from "../Layout";
import Loader from "../Loader";
import { createTransactionModal, fileToString } from "../../helpers";
import { Card, FormControl } from "react-bootstrap";

const DistributorActionPanel = ({ left, total, prevDetails }) => {
  const [unitsPerPacket, setUnitsPerPacket] = useState(0);
  const [numPackets, setNumPackets] = useState(0);
  const [packetName, setPacketName] = useState("");
  const [containerType, setContainerType] = useState("Box");
  const [retailerName, setRetailerName] = useState("Retailer A");
  const [transporterName, setTransporterName] = useState("Transporter A");
  const [plantImage, setPlantImage] = useState("");
  const [transactionMining, setTransactionMining] = useState(false);
  const [transactionObject, setTransactionObject] = useState(null);
  const [formValidity, setFormValidity] = useState(true);
  const [clicked, setClicked] = useState(false);

  const openSignatureModal = obj => {
    setTransactionObject({
      ...obj,
      showModal: true,
      setShowModal: () => {
        setTransactionObject(null);
      },
      cancel: () => {
        setTransactionMining(false);
        setTransactionObject(null);
      }
    });
  };

  const checkValidity = (perPacketInput, totalPacketsInput) => {
    let totalAmountUsed = perPacketInput * totalPacketsInput;
    if (
      left < totalAmountUsed ||
      perPacketInput <= 0 ||
      totalPacketsInput <= 0
    ) {
      setFormValidity(false);
    } else {
      setFormValidity(true);
    }
    setUnitsPerPacket(perPacketInput);
    setNumPackets(totalPacketsInput);
  };

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setClicked(true);
    checkValidity(unitsPerPacket, numPackets);
    if (packetName.length === 0 || plantImage.length === 0) {
      return;
    }
    setPacketName(packetName.captialize());
    let batchObject = {
      totalUnitsForSale: numPackets,
      unitsPerPacket,
      packetName,
      containerType,
      sentToRetailerOn: new Date().toLocaleString(),
      productUnitId: prevDetails.uid,
      distributorAddress: "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20",
      distributorToRetailerTransporter:
        "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20",
      retailerAddress: "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20",
      retailProductImage: plantImage
    };
    let oldUnitsUsed = prevDetails.details.totalPacketsUsed
      ? prevDetails.details.totalPacketsUsed
      : 0;
    let materialUsed = unitsPerPacket * numPackets;
    prevDetails.details.totalPacketsUsed =
      parseInt(oldUnitsUsed) + materialUsed;
    if (!formValidity) {
      alert("You Don't have enough Units to Be Sent.!");
      return;
    }
    setTransactionMining(true);
    createBatchByDistributor(
      batchObject.productUnitId,
      prevDetails.details,
      batchObject,
      batchObject.retailerAddress,
      batchObject.distributorToRetailerTransporter,
      openSignatureModal
    ).then(hash => {
      checkMined(hash, () => window.location.reload());
    });
  };

  const handleImageUpload = e => {
    fileToString(e.target.files[0]).then(result => {
      setPlantImage(result);
    });
  };

  return (
    <>
      <Col md={12}>
        <section className="product-status-section card">
          <div className={"card-header"}>
            <div className="utils__title ">
              <strong className="text-uppercase ">
                Units to Product Available for Packaging
              </strong>
            </div>
          </div>
          <ProgressBar
            now={((left / total) * 100).toFixed(2)}
            label={`${left} Units`}
            striped
          />
        </section>
      </Col>
      <Col>
        <Card>
          <div className={"card-header action-panel-head"}>
            <div className="utils__title ">
              <strong className="text-uppercase">Action Panel</strong>
            </div>
          </div>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Container Type</Form.Label>
                <Form.Control
                  as={"select"}
                  onChange={e => {
                    setContainerType(e.target.value);
                  }}
                >
                  <option value={"Box"}>Box</option>
                  <option value={"Packet"}>Packet</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>No of Units in Each Packet</Form.Label>
                <Form.Control
                  type={"number"}
                  onChange={e => {
                    checkValidity(parseInt(e.target.value), numPackets);
                  }}
                  isInvalid={!formValidity}
                  placeholder={"Enter the number of units in each packet"}
                />
                <FormControl.Feedback type={"invalid"}>
                  Total Units Used should be less than Total Units Available
                </FormControl.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>No of Packets Created</Form.Label>
                <Form.Control
                  type={"number"}
                  onChange={e => {
                    checkValidity(unitsPerPacket, parseInt(e.target.value));
                  }}
                  isInvalid={!formValidity}
                  placeholder={"Enter the number of packets created"}
                />
                <FormControl.Feedback type={"invalid"}>
                  Total Units Used should be less than Total Units Available
                </FormControl.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Packet Name</Form.Label>
                <Form.Control
                  type={"text"}
                  onChange={e => {
                    setPacketName((e.target.value).captialize());
                  }}
                  placeholder={"Enter the name of the packet"}
                  isInvalid={clicked ? packetName.length === 0 : false}
                />
                <FormControl.Feedback type={"invalid"}>
                  <strong>Required</strong> : Enter a valid packet name
                </FormControl.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Retailer Name</Form.Label>
                <Form.Control
                  as={"select"}
                  onChange={e => {
                    setRetailerName(e.target.value);
                  }}
                >
                  <option value={"Retailer A"}>Retailer A</option>
                  <option value={"Retailer B"}>Retailer B</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Transporter Name</Form.Label>
                <Form.Control
                  as={"select"}
                  onChange={e => {
                    setTransporterName(e.target.value);
                  }}
                >
                  <option value={"Transporter A"}>Transporter A</option>
                  <option value={"Transporter B"}>Transporter B</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <Form.Label className={"custom-file-label"}>
                    Processed Good Image
                  </Form.Label>
                  <Form.Control
                    className={"custom-file-input"}
                    type={"file"}
                    placeholder={"Upload a Plant Image"}
                    onChange={handleImageUpload}
                    isInvalid={clicked ? plantImage.length === 0 : false}
                  />
                  <FormControl.Feedback type={"invalid"}>
                    <strong>Required</strong> : Upload an Image for the Plant
                  </FormControl.Feedback>
                </Col>
                <Col md={6}>
                  <section className={"image-section"}>
                    <img
                      src={
                        plantImage ||
                        "http://support.hostgator.com/img/articles/weebly_image_sample.png"
                      }
                      alt={""}
                    />
                  </section>
                </Col>
              </Row>
            </Col>
            <Col md={12} className={"text-center"}>
              <Button
                type={"submit"}
                onClick={handleClick}
                style={{ width: "30%" }}
              >
                Pack
              </Button>
            </Col>
          </Row>
        </Card>
        {transactionMining ? <Loader /> : null}
        {transactionObject ? createTransactionModal(transactionObject) : null}
      </Col>
    </>
  );
};

export default DistributorActionPanel;
