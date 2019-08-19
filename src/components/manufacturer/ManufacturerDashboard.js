import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import AvailableRawMaterialTable from "./AvailableRawMaterialTable";
import ManufacturedPacketsTable from "./ManufacturedPacketsTable";
import ManufacturerBarGraph from "./ManufacturerBarGraph";
import {
  fetchHarvestUnitsByManufacturer,
  fetchPackagedUnitsByManufacturer
} from "../../dbController/manufacturerRole";
import { connectToMetamask } from "../../dbController/init";
import { getFarmerDetails } from "../../dbController/farmerRole";
import BarGraph from "../farmer/graphs/dashboard/BarGraph";
import Loader from "../Loader";

const ManufacturerDashboard = ({ location }) => {
  const [availableArray, setAvailableArray] = useState([]);
  const [packetsReadyForDispatch, setPacketsReadyForDispatch] = useState([]);
  const [availableGraphData, setAvailableGraphData] = useState({});
  const [
    packetsManufacturedGraphData,
    setPacketsManufacturedGraphData
  ] = useState({});
  const [changed, setChanged] = useState(0);
  const [transactionMining, setTransactionMining] = useState(false)
  useEffect(() => {
    let tempChanged = changed;
    connectToMetamask().then(() => {
      fetchHarvestUnitsByManufacturer(harvestObject => {
        let tempAvailableArray = availableArray;
        getFarmerDetails(harvestObject.details.farmerAddress).then(
          farmerObject => {
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
            addToGraphData(
              harvestObject.details.plantName,
              leftAmount,
              availableGraphData,
              setAvailableGraphData,
              ++tempChanged
            );
          }
        );
      });

      let tempAvailablePackets = packetsReadyForDispatch;
      fetchPackagedUnitsByManufacturer(packageUnit => {
        console.log(packageUnit);
        if (packageUnit.currentState.value === 1) {
          let obj = {
            productUnitId: packageUnit.uid,
            productType: packageUnit.details.productType,
            totalPacketsManufactured:
              packageUnit.details.totalPacketsManufactured,
            packetSize: packageUnit.details.packetSize,
            details: packageUnit.details
          };
          tempAvailablePackets.push(obj);
          setPacketsReadyForDispatch([...tempAvailablePackets]);
        }
        addToGraphData(
          packageUnit.details.productType,
          parseInt(packageUnit.details.totalPacketsManufactured),
          packetsManufacturedGraphData,
          setPacketsManufacturedGraphData,
          ++tempChanged
        );
      });
    });
  }, []);

  function addToGraphData(which, howMuch, getter, setter, tempChanged) {
    let tempBarObject = getter;
    if (tempBarObject[which]) {
      let old = tempBarObject[which];
      tempBarObject[which] = old + howMuch;
    } else {
      tempBarObject[which] = howMuch;
    }
    setChanged(tempChanged);
    setter(tempBarObject);
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
            <BarGraph
              ObjectToShow={availableGraphData}
              label={"Available Pounds"}
            />
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
            <ManufacturedPacketsTable array={packetsReadyForDispatch} setTransactionMining={()=>{setTransactionMining(true)}} />
          </section>
        </Col>
        <Col md={6}>
          <section className={"manufacturer-graph dashboard-section"}>
            <h3 className={"section-title"}>
              Products Manufactured in 2018-19
            </h3>
            <BarGraph
              ObjectToShow={packetsManufacturedGraphData}
              label={"Processed Units"}
            />
          </section>
        </Col>
      </Row>
      {transactionMining? <Loader/>:null}
    </>
  );
};

export default ManufacturerDashboard;
