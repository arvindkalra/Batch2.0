import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import AvailableRawMaterialTable from "./AvailableRawMaterialTable";
import ManufacturedPacketsTable from "./ManufacturedPacketsTable";
import ManufacturerBarGraph from "./ManufacturerBarGraph";
import { fetchHarvestUnitsByManufacturer } from "../../dbController/manufacturerRole";
import { connectToMetamask } from "../../dbController/init";
import { getFarmerDetails } from "../../dbController/farmerRole";

const ManufacturerDashboard = ({ location }) => {
  const [availableArray, setAvailableArray] = useState([]);
  const [packetsReadyForDispatch, setPacketsReadyForDispatch] = useState([]);
  const [availableGraphData, setAvailableGraphData] = useState({});
  const [
    packetsManufacturedGraphData,
    setPacketsManufacturedGraphData
  ] = useState({});
  useEffect(() => {
    connectToMetamask().then(() => {
      fetchHarvestUnitsByManufacturer(harvestObject => {
        console.log(harvestObject);
        let tempAvailableArray = availableArray;
        let rowArray = [];
        rowArray.push(harvestObject.uid);
        getFarmerDetails(harvestObject.farmerAddress).then(farmerObject => {
          rowArray.push(farmerObject.name);
          rowArray.push(harvestObject.amountCreated);
          rowArray.push(harvestObject.details.plantName);
          tempAvailableArray.push(rowArray);
          setAvailableArray([...tempAvailableArray]);
          setAvailableGraphData({
            Gondza: 1000,
            Tazie: 500,
            Sansa: 750,
            Skypey: 800
          });
          setPacketsManufacturedGraphData({
            Preroll: 2000,
            Edible: 1200,
            Patches: 800
          });
        });
      });
    });
    // getDataForManufacturer();
  }, []);

  let getDataForManufacturer = () => {
    setAvailableArray([
      [1, "Pokemon", 100, "Gundza"],

      [2, "Pokemon", 100, "Gundza"],
      [3, "Pokemon", 100, "Gundza"]
    ]);

    setPacketsReadyForDispatch([
      [1, "Preroll", "Gummy Bear", "1.75g"],
      [1, "Preroll", "Gummy Bear", "1.75g"],

      [1, "Preroll", "Gummy Bear", "1.75g"]
    ]);
    setAvailableGraphData({
      Gondza: 1000,
      Tazie: 500,
      Sansa: 750,
      Skypey: 800
    });
    setPacketsManufacturedGraphData({
      Preroll: 2000,
      Edible: 1200,
      Patches: 800
    });
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
          <section className={"report-table-section"}>
            <h3>Available Raw Material</h3>
            <AvailableRawMaterialTable array={availableArray} />
          </section>
        </Col>
      </Row>

      {/*Two tables for available raw material and packets made ready for dispatch*/}
      <Row>
        <Col md={6}>
          <section className={"manufacturer-graph"}>
            <h3>Packets Manufactured of Each Type</h3>
            <ManufacturerBarGraph data={packetsManufacturedGraphData} />
          </section>
        </Col>
        <Col md={6}>
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
