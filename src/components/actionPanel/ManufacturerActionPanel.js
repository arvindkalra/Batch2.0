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
  const [plantImage, setPlantImage] = useState("");
  // Preroll or Edible
  const [productType, setProductType] = useState("Preroll");
  // Box or Packet
  const [packageType, setPackageType] = useState("Box");
  const [perPackageSize, setPerPackageSize] = useState(0);
  const [numberOfPackages, setNumberOfPackages] = useState(0);
  const [unitSize, setUnitSize] = useState(0);
  const [productName, setProductName] = useState("");
  const [mrp, setMrp] = useState(0);

  const conversionUnit = 16;

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

  const checkValidity = () => {
    return (
      materialUsed > 0 &&
      perPackageSize > 0 &&
      numberOfPackages > 0 &&
      unitSize > 0 &&
      productName !== "" &&
      mrp > 0
    );
  };

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setClicked(true);
    if (!checkValidity(materialUsed)) {
      return;
    }
    let packetObj = {
      materialUsed,
      productImage: plantImage,
      productType,
      container: packageType,
      unitsPerPacket: perPackageSize,
      unitSize,
      productName,
      mrp,
      packedOn: new Date().toLocaleString(),
      harvestUnitId: prevDetails.uid,
      totalPacketsManufactured: numberOfPackages
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

  const setSizeOfEachUnit = (rawMaterialInput, eachBoxInput, numBoxInput) => {
    let totalUnitsProduced = eachBoxInput * numBoxInput;
    let val =
      totalUnitsProduced !== 0
        ? ((rawMaterialInput / totalUnitsProduced) * conversionUnit).toFixed(2)
        : 0;
    setUnitSize(val);
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
                <Form.Label>Raw Material Used (in Pounds)</Form.Label>
                <Form.Control
                  type={"number"}
                  placeholder={"Enter the amount harvested in pounds"}
                  min={0}
                  onChange={e => {
                    setSizeOfEachUnit(
                      parseFloat(e.target.value),
                      perPackageSize,
                      numberOfPackages
                    );
                    setMaterialUsed(parseFloat(e.target.value));
                  }}
                  value={materialUsed}
                  isInvalid={
                    materialUsed > left || (clicked && materialUsed <= 0)
                  }
                />
                <FormControl.Feedback type={"invalid"}>
                  <strong>Required : </strong>Raw Material Used should be more
                  than zero and less than the number of units available
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
                  <option value={"Edible"}>Edible</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Package Type</Form.Label>
                <Form.Control
                  as={"select"}
                  onChange={e => {
                    setPackageType(e.target.value);
                  }}
                >
                  <option value={"Box"}>Box</option>
                  <option value={"Packet"}>Packet</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Units in Each {packageType}</Form.Label>
                <Form.Control
                  type={"number"}
                  min={0}
                  onChange={e => {
                    setSizeOfEachUnit(
                      materialUsed,
                      parseInt(e.target.value),
                      numberOfPackages
                    );
                    setPerPackageSize(parseInt(e.target.value));
                  }}
                  isInvalid={clicked && perPackageSize <= 0}
                  value={perPackageSize}
                />
                <FormControl.Feedback type={"invalid"}>
                  <strong>Required</strong>
                </FormControl.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>{packageType} Count</Form.Label>
                <Form.Control
                  type={"number"}
                  min={0}
                  onChange={e => {
                    setSizeOfEachUnit(
                      materialUsed,
                      perPackageSize,
                      parseInt(e.target.value)
                    );
                    setNumberOfPackages(parseInt(e.target.value));
                  }}
                  isInvalid={clicked && numberOfPackages <= 0}
                  value={numberOfPackages}
                />
                <FormControl.Feedback type={"invalid"}>
                  <strong>Required</strong>
                </FormControl.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Size of Each {productType} Unit (in Oz)</Form.Label>
                <Form.Control type={"number"} readOnly value={unitSize} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type={"text"}
                  placeholder={"Enter Name of Manufactured Product"}
                  onChange={e => {
                    setProductName(e.target.value);
                  }}
                  isInvalid={clicked && productName === ""}
                />
                <FormControl.Feedback type={"invalid"}>
                  <strong>Required : </strong> Give a name to the product
                </FormControl.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>M.R.P. Of Each {packageType} ($x.xx)</Form.Label>
                <Form.Control
                  type={"number"}
                  min={0}
                  onChange={e => {
                    setMrp(parseFloat(e.target.value));
                  }}
                  value={mrp}
                  isInvalid={clicked && mrp <= 0}
                />
                <FormControl.Feedback type={"invalid"}>
                  <strong>Required : </strong> Provide an M.R.P to the{" "}
                  {packageType}
                </FormControl.Feedback>
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

export default ManufacturerActionPanel;
