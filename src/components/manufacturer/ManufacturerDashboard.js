import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import AvailableRawMaterialTable from "./AvailableRawMaterialTable";
import ManufacturedPacketsTable from "./ManufacturedPacketsTable";
import ManufacturerBarGraph from "./ManufacturerBarGraph";
import {fetchHarvestUnitsByManufacturer, fetchPackagedUnitsByManufacturer} from "../../dbController/manufacturerRole";
import { connectToMetamask } from "../../dbController/init";
import { getFarmerDetails } from "../../dbController/farmerRole";
import BarGraph from "../farmer/graphs/dashboard/BarGraph";

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
        let tempAvailableArray = availableArray;
        getFarmerDetails(harvestObject.farmerAddress).then(farmerObject => {
          let harvestUsed = harvestObject.details.totalHarvestUsed
            ? harvestObject.details.totalHarvestUsed
            : 0;
          let leftAmount =
            harvestObject.details.totalHarvestAmount - harvestUsed;
          if (leftAmount > 0) {
            let rowArray = {
              harvestUnitId: harvestObject.uid,
              farmerName: farmerObject.name,
              pendingAmount: leftAmount,
              plantName: harvestObject.details.plantName
            };
            tempAvailableArray.push(rowArray);
            setAvailableArray([...tempAvailableArray]);
          }
          addToAvailableGraphData(harvestObject.details.plantName, leftAmount);
        });
      });

      fetchPackagedUnitsByManufacturer(packageUnit => {
        console.log(packageUnit);
      })
    });
  }, []);

  function addToAvailableGraphData(plantName, availability) {
    let tempBarObject = availableGraphData;
    if (tempBarObject[plantName]) {
      let old = tempBarObject[plantName];
      tempBarObject[plantName] = old + availability;
    } else {
      tempBarObject[plantName] = availability;
    }
    console.log(tempBarObject);
    setAvailableGraphData(tempBarObject);
  }

  return (
    <>
      <Row>
        <Col>{setBreadcrumb(location.pathname)}</Col>
      </Row>

      {/*Graph showing available raw material*/}
      <Row>
        <Col md={6}>
          <section className={"manufacturer-graph dashboard-section"}>
            <h3 className={"section-title"}>Available Raw Material</h3>
            <BarGraph ObjectToShow={availableGraphData} />
          </section>
        </Col>
        <Col md={6}>
          <section className={"report-table-section dashboard-section"}>
            <h3 className={"section-title"}>Available Raw Material</h3>
            <AvailableRawMaterialTable array={availableArray} />
          </section>
        </Col>
      </Row>

      {/*Two tables for available raw material and packets made ready for dispatch*/}
      <Row>
        <Col md={6}>
          <section className={"report-table-section dashboard-section"}>
            <h3 className={"section-title"}>Created Packets</h3>
            <ManufacturedPacketsTable array={packetsReadyForDispatch} />
          </section>
        </Col>
        <Col md={6}>
          <section className={"manufacturer-graph dashboard-section"}>
            <h3 className={"section-title"}>
              Products Manufactured in 2018-19
            </h3>
            <ManufacturerBarGraph data={packetsManufacturedGraphData} />
          </section>
        </Col>
      </Row>
    </>
  );
};

export default ManufacturerDashboard;
