import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import AvailableRawMaterialTable from "./AvailableRawMaterialTable";
import ManufacturedPacketsTable from "./ManufacturedPacketsTable";
import ManufacturerBarGraph from "./ManufacturerBarGraph";

const ManufacturerDashboard = ({ location }) => {
  const [availableArray, setAvailableArray] = useState([]);
  const [packetsReadyForDispatch, setPacketsReadyForDispatch] = useState([]);
  const [availableGraphData, setAvailableGraphData] = useState({});
  const [packetsManufacturedGraphData, setPacketsManufacturedGraphData] = useState({});
  useEffect(() => {
    getDataForManufacturer();
  }, []);

  let getDataForManufacturer = () => {
    setAvailableArray([
      {
        buid: 1,
        farmerName: "Pokemon",
        plantName: "Gundza",
        amountLeft: 100,
        dateHarvested: "1st May"
      },
      {
        buid: 1,
        farmerName: "Pokemon",
        plantName: "Gundza",
        amountLeft: 100,
        dateHarvested: "1st May"
      },
      {
        buid: 1,
        farmerName: "Pokemon",
        plantName: "Gundza",
        amountLeft: 100,
        dateHarvested: "1st May"
      }
    ]);

    setPacketsReadyForDispatch([
      {
        puid: 1,
        retailerName: "Shinchan",
        transporterName: "Doraemon",
        type: "Preroll",
        productName: "Gummy Bear",
        unitSize: "1.75g",
        totalUnits: 10000,
        currentStatus: "Packed"
      },
      {
        puid: 1,
        retailerName: "Shinchan",
        transporterName: "Doraemon",
        type: "Preroll",
        productName: "Gummy Bear",
        unitSize: "1.75g",
        totalUnits: 10000,
        currentStatus: "Packed"
      },
      {
        puid: 1,
        retailerName: "Shinchan",
        transporterName: "Doraemon",
        type: "Preroll",
        productName: "Gummy Bear",
        unitSize: "1.75g",
        totalUnits: 10000,
        currentStatus: "Packed"
      }
    ]);
    setAvailableGraphData({
      Gondza: 1000,
      Tazie: 500,
      Sansa: 750,
      Skypey: 800
    });
    setPacketsManufacturedGraphData({
      Preroll : 2000,
      Edible: 1200,
      Patches: 800
    })
  };
  return (
    <>
      <Row>
        <Col>{setBreadcrumb(location.pathname)}</Col>
      </Row>

      {/*Graph showing available raw material*/}
      <Row>
        <Col md={6}>
          <section className={"manufacturer-graph"}>
            <h3>Available Raw Material for Each Plant</h3>
            <ManufacturerBarGraph data={availableGraphData} />
          </section>
        </Col>
        <Col md={6}>
          <section className={"manufacturer-graph"}>
            <h3>Packets Manufactured of Each Type</h3>
            <ManufacturerBarGraph data={packetsManufacturedGraphData} />
          </section>
        </Col>
      </Row>

      {/*Two tables for available raw material and packets made ready for dispatch*/}
      <Row>
        <Col>
          <section className={"report-table-section"}>
            <h3>Available Raw Material</h3>
            <AvailableRawMaterialTable array={availableArray} />
          </section>
        </Col>
      </Row>
      <Row>
        <Col>
          <section className={"report-table-section"}>
            <h3>Created Packets</h3>
            <ManufacturedPacketsTable array={packetsReadyForDispatch} />
          </section>
        </Col>
      </Row>
    </>
  );
};

export default ManufacturerDashboard;
