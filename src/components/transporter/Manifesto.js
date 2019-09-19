import React, { useState, useEffect } from "react";
import { Card, Container, Row, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { getTransporterDetails } from "../../dbController/transporterRole";
import { OWN_ADDRESS } from "../../dbController/Web3Connections";
import Modal from "react-bootstrap/Modal";

const Manifesto = ({ rowObj, item, transporterDetails, sender, receiver }) => {
  console.log(rowObj);
  useEffect(() => {
    setManifesto(item);
  }, [item]);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [dispatchTime, setDispatchTime] = useState("");
  const [productName, setProductName] = useState("");
  const setManifesto = item => {
    switch (item.shipmentType) {
      case "sample":
        setDeliveryTime(
          item.ipfsData.details.labSampleConsignmentDeliveryTime.split(",")[0]
        );
        setDispatchTime(
          item.ipfsData.details.labSampleConsignmentDispatchTime.split(",")[0]
        );
        setProductName(`${rowObj.details.plantName} (Plant)`);
        return;
      case "harvest":
        setDeliveryTime(
          item.ipfsData.details.farmToFactoryConsignmentDeliveryTime.split(
            ","
          )[0]
        );
        setDispatchTime(
          item.ipfsData.details.farmToFactoryConsignmentDispatchTime.split(
            ","
          )[0]
        );
        setProductName(`${rowObj.details.plantName} (Plant)`);
        return;
      case "retail":
        setDeliveryTime(
          item.ipfsData.details.distributorToRetailerDeliveryTime.split(",")[0]
        );
        setDispatchTime(
          item.ipfsData.details.distributorToRetailerDispatchTime.split(",")[0]
        );
        setProductName(`${rowObj.details.packetName} (Packet)`);
        return;
      case "product":
        setDeliveryTime(
          item.ipfsData.details.manufacturerToDistributorDeliveryTime.split(
            ","
          )[0]
        );
        setDispatchTime(
          item.ipfsData.details.manufacturerToDistributorDispatchTime.split(
            ","
          )[0]
        );
        setProductName(`${rowObj.details.productType} (Product)`);
        return;
      default:
        setDeliveryTime("new date");
        setDispatchTime("new date");
        return;
    }
  };

  return (
    <Card>
      <Card.Header closeButton>
        <div className="utils__title title-center">
          <strong className="text-uppercase">Transfer Manifesto</strong>
        </div>
      </Card.Header>{" "}
      <Row>
        <Col md={6}>
          <h4>
            <strong>Business Name: {transporterDetails.companyName}</strong>
            <br />
            Contact Person: {transporterDetails.name}
          </h4>
          <address>
            {transporterDetails.address}
            <br />
            <abbr title={"License Number"}>License:</abbr>{" "}
            {transporterDetails.licenseNumber}
            <br />
            <abbr title={"License Type"}>Type:</abbr>{" "}
            {transporterDetails.licenseType}
          </address>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={6}>
          <h5>
            <strong>Origin</strong>
          </h5>
          <div>
            <strong>Business Name: {sender.companyName}</strong>
            <br />
            Contact Person: {sender.name}
          </div>
          <address>
            {sender.address}
            <br />
            <abbr title={"License Number"}>License:</abbr>{" "}
            {sender.licenseNumber}
            <br />
            <abbr title={"License Type"}>Type:</abbr> {sender.licenseType}
          </address>
        </Col>
        <Col md={6} className={"float-right text-right"}>
          <h5>
            <strong>Destination</strong>
          </h5>
          <div>
            <strong>Business Name: {receiver.companyName}</strong>
            <br />
            Contact Person: {receiver.name}
          </div>
          <address>
            {receiver.address}
            <br />
            <abbr title={"License Number"}>License:</abbr>{" "}
            {receiver.licenseNumber}
            <br />
            <abbr title={"License Type"}>Type:</abbr> {receiver.licenseType}
          </address>
        </Col>
      </Row>
      <section className={"manifesto-details-section"}>
        <Row>
          <Col md={12}>
            <Table responsive>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Product Name</th>
                  <th>Shipment Type</th>
                  <th>Dispatch Date</th>
                  <th>Delivery Date</th>
                  <th>Delivery Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{rowObj.uid}</td>
                  <td>{productName.captialize()}</td>
                  <td>{item.shipmentType.captialize()}</td>
                  <td>{dispatchTime}</td>
                  <td>{deliveryTime}</td>
                  <td>$120</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </section>
      <Card.Footer>
        <span>
          Print Manifesto <i className="fas fa-download"></i>{" "}
        </span>
      </Card.Footer>
    </Card>
  );
};

export default Manifesto;
