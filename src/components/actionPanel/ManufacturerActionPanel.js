import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import { packetsManufactured } from "../../dbController/manufacturerRole";
import { checkMined } from "../../dbController/init";

const ManufacturerActionPanel = ({ left, total, prevDetails }) => {
  const [materialUsed, setMaterialUsed] = useState("");
  const [packetsMade, setPacketsMade] = useState("");
  const [packetSize, setPacketSize] = useState("");
  const [productType, setProductType] = useState("Preroll");

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    let packetObj = {
      packetSize,
      productType,
      packedOn: new Date().toLocaleString(),
      harvestUnitId: prevDetails.uid,
      totalPacketsManufactured: packetsMade
    };
    console.log(packetObj);
    let oldHarvestUsed = prevDetails.details.totalHarvestUsed ? prevDetails.details.totalHarvestUsed : 0;
    prevDetails.details.totalHarvestUsed = parseInt(oldHarvestUsed) + parseInt(materialUsed);
    if (left < materialUsed) {
      alert("You Don't have enough RAW MATERIAL.!");
      return;
    }
    console.log(prevDetails.details);
    packetsManufactured(prevDetails.uid, prevDetails.details, packetObj).then(
      hash => {
        checkMined(hash, () => window.location.reload());
      }
    );
  };

  return (
    <Col>
      <div className={"action-info"}>
        <h2>Action Panel</h2>
      </div>
      <Row>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Units of Raw Material Left For Use</Form.Label>
            <ProgressBar
              now={((left / total) * 100).toFixed(2)}
              label={`${left} Pounds`}
              striped
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Units of Raw Material Used</Form.Label>
            <Form.Control
              type={"number"}
              placeholder={"Enter the amount harvested in pounds"}
              onChange={e => {
                setMaterialUsed(parseInt(e.target.value));
              }}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Number Of Packets Manufactured</Form.Label>
            <Form.Control
              type={"number"}
              placeholder={"Enter the amount harvested in pounds"}
              onChange={e => {
                setPacketsMade(parseInt(e.target.value));
              }}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Packet Size</Form.Label>
            <Form.Control
              type={"text"}
              placeholder={"Enter the amount harvested in pounds"}
              onChange={e => {
                setPacketSize(e.target.value);
              }}
            />
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
              <option value={"Flowers"}>Flower</option>
              <option value={"Edibles"}>Edibles</option>
              <option value={"Oils"}>Oils</option>
              <option value={"Concentrate"}>Concentrate</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={12} className={"text-center"}>
          <Button type={"submit"} onClick={handleClick}>
            Pack
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default ManufacturerActionPanel;
