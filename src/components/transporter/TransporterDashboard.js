import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import HarvestShipmentTable from "./HarvestShipmentTable";
import PackagedShipmentTable from "./PackagedShipmentTable";
import {
  getFarmToFactoryConsignments,
  getLabSampleConsignments,
  getTransportUnitDetails
} from "../../dbController/transporterRole";
import { connectToMetamask } from "../../dbController/init";
import { getFarmerDetails } from "../../dbController/farmerRole";
import { getManufacturerDetails } from "../../dbController/manufacturerRole";
import { getRetailerDetails } from "../../dbController/retailerRole";
import { getLaboratoryDetails } from "../../dbController/laboratoryRole";
import SampleShipmentTable from "./SampleShipmentTable";

const TransporterDashboard = ({ location }) => {
  const [harvestShipments, setHarvestShipments] = useState([]);
  const [packagedShipments, setPackagedShipments] = useState([]);
  const [harvestRowObjArr, setHarvestRowObjArr] = useState({});
  const [packageRowObjArr, setPackageObjRowArr] = useState({});
  const [sampleShipments, setSampleShipment] = useState([]);
  const [sampleRowObjArr, setSampleRowObjArr] = useState({});
  useEffect(() => {
    connectToMetamask().then(() => {
      let tempHarvestShipments = harvestShipments;
      let tempPackagedShipment = packagedShipments;
      let tempSampleShipments = sampleShipments;
      getFarmToFactoryConsignments(row => {
        console.log(row);
        let tempRow = harvestRowObjArr;
        tempRow[row.uid] = row;
        setHarvestRowObjArr(tempRow);
        let rowObj = {};
        rowObj.buid = row.uid;
        getFarmerDetails(row.details.farmerAddress).then(farmerObj => {
          getManufacturerDetails(row.details.manufacturerAddress).then(
            manufacturerObj => {
              if (row.currentState.value >= 9) {
                return;
              }
              rowObj.uid = row.uid;
              rowObj.senderCompany = farmerObj.name;
              rowObj.receiverCompany = manufacturerObj.name;
              rowObj.amount = row.details.totalHarvestAmount + " Pounds";
              rowObj.dispatchTime = row.details.farmToFactoryConsignmentDispatchTime;

              rowObj.currentStatus = row.currentState;
              tempHarvestShipments.push(rowObj);
              setHarvestShipments([...tempHarvestShipments]);
            }
          );
        });
      });
      getTransportUnitDetails(false, row => {
        // amount: 10
        // currentState: "packed"
        let tempRow = packageRowObjArr;
        tempRow[row.uid] = row;
        setPackageObjRowArr(tempRow);
        let rowObj = {};
        rowObj.puid = row.uid;
        getManufacturerDetails(row.senderAddress).then(manufacturerObj => {
          getRetailerDetails(row.receiverAddress).then(retailerObj => {
            if (
              row.currentState === "delivered" ||
              row.currentState === "lost"
            ) {
              return;
            }
            rowObj.senderCompany = manufacturerObj.name;
            rowObj.receiverCompany = retailerObj.name;
            rowObj.amount = row.amount + " Units";
            rowObj.currentStatus = row.currentState;
            rowObj.dispatchTime = row.details.dispatchTime;

            tempPackagedShipment.push(rowObj);
            setPackagedShipments([...tempPackagedShipment]);
          });
        });
      });
      getLabSampleConsignments(row => {
        console.log(row);
        let tempRow = sampleRowObjArr;
        tempRow[row.uid] = row;
        setSampleRowObjArr(tempRow);
        let rowObj = {};
        let farmerName;
        getFarmerDetails(row.details.farmerAddress)
          .then(({ name }) => {
            farmerName = name;
            return getLaboratoryDetails(row.details.laboratoryAddress);
          })
          .then(({ name }) => {
            if (row.currentState.value < 5) {
              rowObj.uid = row.uid;
              rowObj.senderCompany = farmerName;
              rowObj.receiverCompany = name;
              rowObj.currentStatus = row.currentState;
              rowObj.dispatchTime = row.details.labSampleConsignmentDispatchTime;
              tempSampleShipments.push(rowObj);
              setSampleShipment([...tempSampleShipments]);
            }
          });
      });
    });
  }, []);

  // let getDataForTransporter = () => {
  //   setPackagedShipments([
  //     {
  //       puid: 1,
  //       senderCompany: "Bob the Builder",
  //       receiverCompany: "Cannabis Supply",
  //       amount: 100,
  //       currentStatus: "packed"
  //     },
  //     {
  //       puid: 2,
  //       senderCompany: "Bob the Builder",
  //       receiverCompany: "Cannabis Supply",
  //       amount: 115,
  //       currentStatus: "dispatched",
  //       dispatchTime: "1st May"
  //     },
  //     {
  //       puid: 3,
  //       senderCompany: "Bob the Builder",
  //       receiverCompany: "Cannabis Supply",
  //       amount: 100,
  //       currentStatus: "dispatched",
  //       dispatchTime: "5th May"
  //     }
  //   ]);
  // };

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
            <HarvestShipmentTable
              array={harvestShipments}
              rowObjArr={harvestRowObjArr}
            />
          </section>
        </Col>
      </Row>
      <Row>
        <Col>
          <section className={"shipment-section"}>
            <h3>Current Shipments (Packets)</h3>
            <PackagedShipmentTable
              array={packagedShipments}
              rowObjArr={packageRowObjArr}
            />
          </section>
        </Col>
      </Row>
      <Row>
        <Col>
          <section className={"shipment-section"}>
            <h3>Current Shipments (Laboratory Samples)</h3>
            <SampleShipmentTable
              array={sampleShipments}
              rowObjArr={sampleRowObjArr}
            />
          </section>
        </Col>
      </Row>
    </>
  );
};

export default TransporterDashboard;
