import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import { packetsManufactured } from "../../dbController/manufacturerRole";
import { checkMined } from "../../dbController/init";
import Loader from "../Loader";
import {
  createTransactionModal,
  fileToString,
  getSeedProgress
} from "../../helpers";
import { Card, FormControl } from "react-bootstrap";

const ManufacturerActionPanel = ({ left, total, prevDetails }) => {
  const [materialUsed, setMaterialUsed] = useState(0);
  const [packetsMade, setPacketsMade] = useState(0);
  const [packetSize, setPacketSize] = useState("");
  const [productType, setProductType] = useState("Preroll");
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

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setClicked(true);
    checkValidity(materialUsed);
    if (
      packetsMade === 0 ||
      packetSize.length === 0 ||
      plantImage.length === 0
    ) {
      return;
    }
    let packetObj = {
      packetSize,
      productType,
      packedOn: new Date().toLocaleString(),
      harvestUnitId: prevDetails.uid,
      totalPacketsManufactured: packetsMade,
      productImage: plantImage
    };

    let oldHarvestUsed = prevDetails.details.totalHarvestUsed
      ? prevDetails.details.totalHarvestUsed
      : 0;
    prevDetails.details.totalHarvestUsed =
      parseInt(oldHarvestUsed) + materialUsed;
    if (materialUsed === 0) {
      alert("Invalid Amount of RAW MATERIAL USED");
      return;
    }
    if (left < materialUsed) {
      alert("You Don't have enough RAW MATERIAL.!");
      return;
    }
    console.log(prevDetails.details);
    console.log(packetObj);
    setTransactionMining(true);
    packetsManufactured(
      prevDetails.uid,
      prevDetails.details,
      packetObj,
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

  const checkValidity = inputAmount => {
    console.log(inputAmount);
    if (left < inputAmount || inputAmount <= 0) {
      setFormValidity(false);
      setMaterialUsed(0);
    } else {
      setFormValidity(true);
      setMaterialUsed(inputAmount);
    }
  };

  return (
    <>
      <Col md={12}>
        {" "}
        <section className="product-status-section card">
          <div className={"card-header"}>
            <div className="utils__title ">
              <strong className="text-uppercase ">
                Available Raw Material
              </strong>
            </div>
          </div>
          <ProgressBar
            now={((left / total) * 100).toFixed(2)}
            label={`${left} Pounds`}
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
                <Form.Label>Units of Raw Material Used</Form.Label>
                <Form.Control
                  type={"number"}
                  placeholder={"Enter the amount harvested in pounds"}
                  onChange={e => {
                    checkValidity(parseInt(e.target.value));
                  }}
                  isInvalid={!formValidity}
                />
                <FormControl.Feedback type={"invalid"}>
                  Raw Material Used should be less than the number of units
                  available
                </FormControl.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Units of Processed Goods</Form.Label>
                <Form.Control
                  type={"number"}
                  placeholder={"Enter the units of processed goods"}
                  onChange={e => {
                    setPacketsMade(parseInt(e.target.value));
                  }}
                  isInvalid={clicked ? packetsMade === 0 : false}
                />
                <FormControl.Feedback type={"invalid"}>
                  <strong>Required</strong> : The number of units should be more
                  than zero
                </FormControl.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Size of Each Unit</Form.Label>
                <Form.Control
                  type={"text"}
                  placeholder={"Enter the size of each unit"}
                  onChange={e => {
                    setPacketSize((e.target.value).captialize());
                  }}
                  isInvalid={clicked ? packetSize.length === 0 : false}
                />
                <FormControl.Feedback type={"invalid"}>
                  <strong>Required</strong> : Enter a valid size of each unit
                  manufactured
                </FormControl.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Product Type</Form.Label>
                <Form.Control
                  as={"select"}
                  onChange={e => {
                    setProductType(e.target.value);
                  }}
                >
                  <option value={"Preroll"}>Preroll</option>
                  <option value={"Edibles"}>Edibles</option>
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
                    />
                  </section>
                </Col>
              </Row>
            </Col>
            <Col md={12} className={"text-center"}>
              <Button type={"submit"} onClick={handleClick} style={{width: "30%"}}>
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

export default ManufacturerActionPanel;
