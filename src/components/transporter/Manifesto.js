import React, { useState, useEffect } from "react";
import { Container, Row, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { getTransporterDetails } from "../../dbController/transporterRole";
import { OWN_ADDRESS } from "../../dbController/Web3Connections";

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
    <Container>
      <section className={"manifesto-header-section"}>
        <Row>
          <Col md={12} className={"center-align-text"}>
            <h4>
              <span>{transporterDetails.companyName}</span>
            </h4>
          </Col>

          <Col md={12}></Col>
        </Row>
      </section>
      <section className={"product-details-section"}>
        <Row>
          <Col md={{ span: 4 }} className={"product-info-tab"}>
            <h2>Item Type</h2>
            <p>{item.shipmentType.captialize()}</p>
          </Col>
          <Col md={4} className={"product-info-tab"}>
            <h2>Dispatched On</h2>
            <p>{dispatchTime}</p>
          </Col>
          <Col md={4} className={"product-info-tab"}>
            <h2>Delivered On</h2>
            <p>{deliveryTime}</p>
          </Col>
        </Row>
      </section>

      <section className={"manifesto-details-section"}>
        <Row>
          <Col md={12}>
            <ul className={"manifesto-list"}>
              <li>
                <h2>Originating Entity:</h2>
                <ul>
                  <li>
                    Company Name: <span>{sender.companyName}</span>{" "}
                  </li>
                  <li>
                    Address <span>{sender.name}</span>{" "}
                  </li>
                </ul>
              </li>
              <li>
                <h2>Destination:</h2>
                <ul>
                  <li>
                    Company Name: <span>{receiver.companyName}</span>{" "}
                  </li>
                  <li>
                    Address <span>{receiver.name}</span>{" "}
                  </li>
                </ul>
              </li>
              <li>
                <h2>Transporter:</h2>
                <ul>
                  <li>
                    Company Name: <span>{transporterDetails.companyName}</span>{" "}
                  </li>
                  <li>
                    Address <span>{transporterDetails.name}</span>{" "}
                  </li>
                </ul>
              </li>
            </ul>
          </Col>
          <Col md={12}>
            <h1 className={"title"}>Cargo Details</h1>
            <Table responsive>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Label Number(if Any)</th>
                  <th>Weight/ Quanitity</th>
                  <th>Delivery Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{productName.captialize()}</td>
                  <td>{rowObj.uid}</td>
                  <td>1 pound</td>
                  <td>$120</td>
                </tr>
              </tbody>
            </Table>
            <span>
              {" "}
              Print Manifesto <i className="fas fa-download"></i>{" "}
            </span>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Manifesto;
