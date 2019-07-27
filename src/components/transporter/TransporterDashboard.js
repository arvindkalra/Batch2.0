import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import HarvestShipmentTable from "./HarvestShipmentTable";
import PackagedShipmentTable from "./PackagedShipmentTable";

const TransporterDashboard = ({ location }) => {
  const [harvestShipments, setHarvestShipments] = useState([]);
  const [packagedShipments, setPackagedShipments] = useState([]);
  useEffect(() => {
    getDataForTransporter();
  }, []);
  let getDataForTransporter = () => {
    setHarvestShipments([
      {
        buid: 1,
        senderCompany: "Bob the Builder",
        receiverCompany: "Cannabis Supply",
        amount: 100,
        currentStatus: "packed"
      },
      {
        buid: 2,
        senderCompany: "Bob the Builder",
        receiverCompany: "Cannabis Supply",
        amount: 115,
        currentStatus: "dispatched",
        dispatchTime: "1st May"
      },
      {
        buid: 3,
        senderCompany: "Bob the Builder",
        receiverCompany: "Cannabis Supply",
        amount: 100,
        currentStatus: "dispatched",
        dispatchTime: "5th May"
      }
    ]);
    setPackagedShipments([
      {
        puid: 1,
        senderCompany: "Bob the Builder",
        receiverCompany: "Cannabis Supply",
        amount: 100,
        currentStatus: "packed"
      },
      {
        puid: 2,
        senderCompany: "Bob the Builder",
        receiverCompany: "Cannabis Supply",
        amount: 115,
        currentStatus: "dispatched",
        dispatchTime: "1st May"
      },
      {
        puid: 3,
        senderCompany: "Bob the Builder",
        receiverCompany: "Cannabis Supply",
        amount: 100,
        currentStatus: "dispatched",
        dispatchTime: "5th May"
      }
    ]);
  };
  return (
    <>
      <Row>
        <Col>{setBreadcrumb(location.pathname)}</Col>
      </Row>

      {/*Tables for showing current shipments*/}
      <Row>
        <Col>
          <section className={"shipment-section"}>
            <h3>Current Shipments (Harvests)</h3>
            <HarvestShipmentTable array={harvestShipments} />
          </section>
        </Col>
      </Row>
      <Row>
        <Col>
          <section className={"shipment-section"}>
            <h3>Current Shipments (Packets)</h3>
              <PackagedShipmentTable array={packagedShipments}/>
          </section>
        </Col>
      </Row>
    </>
  );
};

export default TransporterDashboard;
