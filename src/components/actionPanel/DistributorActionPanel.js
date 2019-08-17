import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import { createBatchByDistributor } from "../../dbController/distributorRole";
import { checkMined } from "../../dbController/init";

const DistributorActionPanel = ({ left, total, prevDetails }) => {
  const [materialUsed, setMaterialUsed] = useState("");
  const [retailerName, setRetailerName] = useState("Retailer A");
  const [transporterName, setTransporterName] = useState("Transporter A");

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log(prevDetails.details);
    let batchObject = {
      totalUnitsForSale: materialUsed,
      sentToRetailerOn: new Date().toLocaleString(),
      productUnitId: prevDetails.uid,
      distributorAddress: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      distributorToRetailerTransporter:
        "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      retailerAddress: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"
    };
    let oldUnitsUsed = prevDetails.details.totalPacketsUsed
      ? prevDetails.details.totalPacketsUsed
      : 0;
    prevDetails.details.totalPacketsUsed =
      parseInt(oldUnitsUsed) + parseInt(materialUsed);
    if (left < materialUsed) {
      alert("You Don't have enough Units to Be Sent.!");
      return;
    }
    createBatchByDistributor(
      batchObject.productUnitId,
      prevDetails.details,
      batchObject,
      batchObject.retailerAddress,
      batchObject.distributorToRetailerTransporter
    ).then(hash => {
      checkMined(hash, () => {});
    });
  };

  return (
    <Col>
      <div className={"action-info"}>
        <h2>Action Panel</h2>
      </div>
      <Row>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Units to Product Available for Packaging</Form.Label>
            <ProgressBar
              now={((left / total) * 100).toFixed(2)}
              label={`${left} Pounds`}
              striped
            />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Units of Product To Be Sent</Form.Label>
            <Form.Control
              type={"number"}
              placeholder={"Enter the number of units used"}
              onChange={e => {
                setMaterialUsed(parseInt(e.target.value));
              }}
            />
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
        <Col md={12} className={"text-center"}>
          <Button type={"submit"} onClick={handleClick}>
            Pack
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default DistributorActionPanel;
