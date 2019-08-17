import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import {
  getDistributorToRetailerConsignments,
  getFactoryToDistributorConsignments,
  getFarmToFactoryConsignments,
  getLabSampleConsignments,
  getTransportUnitDetails
} from "../../dbController/transporterRole";
import { connectToMetamask } from "../../dbController/init";
import { getFarmerDetails } from "../../dbController/farmerRole";
import { getManufacturerDetails } from "../../dbController/manufacturerRole";
import { getRetailerDetails } from "../../dbController/retailerRole";
import { getLaboratoryDetails } from "../../dbController/laboratoryRole";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { getDistributorDetails } from "../../dbController/distributorRole";
import ShipmentTable from "./ShipmentTable";

const TransporterDashboard = ({ location }) => {
  const [harvestShipments, setHarvestShipments] = useState([]);
  const [packagedShipments, setPackagedShipments] = useState([]);
  const [harvestRowObjArr, setHarvestRowObjArr] = useState({});
  const [packageRowObjArr, setPackageObjRowArr] = useState({});
  const [sampleShipments, setSampleShipment] = useState([]);
  const [sampleRowObjArr, setSampleRowObjArr] = useState({});
  const [retailShipments, setRetailShipments] = useState([]);
  const [retailRowObjArr, setRetailRowObjArr] = useState({});
  useEffect(() => {
    connectToMetamask().then(() => {
      let tempHarvestShipments = harvestShipments;
      let tempPackagedShipment = packagedShipments;
      let tempSampleShipments = sampleShipments;
      let tempRetailShipments = retailShipments;
      getFarmToFactoryConsignments(row => {
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
              rowObj.dispatchTime =
                row.details.farmToFactoryConsignmentDispatchTime;

              rowObj.currentStatus = row.currentState;
              tempHarvestShipments.push(rowObj);
              setHarvestShipments([...tempHarvestShipments]);
            }
          );
        });
      });
      getLabSampleConsignments(row => {
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
              rowObj.dispatchTime =
                row.details.labSampleConsignmentDispatchTime;
              tempSampleShipments.push(rowObj);
              setSampleShipment([...tempSampleShipments]);
            }
          });
      });
      getFactoryToDistributorConsignments(row => {
        console.log(row);
        let tempRow = packageRowObjArr;
        tempRow[row.uid] = row;
        setPackageObjRowArr(tempRow);
        let rowObj = {};
        let manufacturerAddress =
          row.details.manufacturerAddress ||
          "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
        let manufacturerName;
        getManufacturerDetails(manufacturerAddress).then(({ name }) => {
          manufacturerName = name;
          return getDistributorDetails(row.details.distributorAddress).then(
            ({ name }) => {
              if (row.currentState.value < 4) {
                rowObj.uid = row.uid;
                rowObj.senderCompany = manufacturerName;
                rowObj.receiverCompany = name;
                rowObj.currentStatus = row.currentState;
                rowObj.dispatchTime =
                  row.details.manufacturerToDistributorDispatchTime;
                rowObj.amount = row.details.totalPacketsManufactured;
                tempPackagedShipment.push(rowObj);
                setPackagedShipments([...tempPackagedShipment]);
              }
            }
          );
        });
      });
      getDistributorToRetailerConsignments(row => {
        let tempRow = retailRowObjArr;
        tempRow[row.uid] = row;
        setRetailRowObjArr(tempRow);
        let rowObj = {};
        let distributorAddress =
          row.details.distributorAddress ||
          "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
        let distributorName;
        getDistributorDetails(distributorAddress)
          .then(({ name }) => {
            distributorName = name;
            return getRetailerDetails(row.details.retailerAddress);
          })
          .then(({ name }) => {
            if (row.currentState.value < 4) {
              rowObj.uid = row.uid;
              rowObj.senderCompany = distributorName;
              rowObj.receiverCompany = name;
              rowObj.currentStatus = row.currentState;
              rowObj.dispatchTime =
                row.details.distributorToRetailerDispatchTime;
              rowObj.amount = row.details.totalPacketsManufactured;
              tempRetailShipments.push(rowObj);
              setRetailShipments([...tempRetailShipments]);
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
        <Col md={12}>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                  Harvest Shipments ( Grower -> Manufacturer )
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <section className={"shipment-section"}>
                    {harvestShipments.length !== 0 ? (
                      <ShipmentTable
                        array={harvestShipments}
                        rowObjArr={harvestRowObjArr}
                        shipmentType={"harvest"}
                      />
                    ) : (
                      <div>
                        You don't have any pending shipment consignments
                      </div>
                    )}
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                  Product Shipments ( Manufacturer -> Distributor )
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <section className={"shipment-section"}>
                    {packagedShipments.length !== 0 ? (
                      <ShipmentTable
                        array={packagedShipments}
                        rowObjArr={packageRowObjArr}
                        shipmentType={"product"}
                      />
                    ) : (
                      <div>
                        You don't have any pending shipment consignments
                      </div>
                    )}
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                  Laboratory Sample Shipments ( Grower -> Laboratory )
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <section className={"shipment-section"}>
                    {sampleShipments.length !== 0 ? (
                      <ShipmentTable
                        array={sampleShipments}
                        rowObjArr={sampleRowObjArr}
                        shipmentType={"sample"}
                      />
                    ) : (
                      <div>
                        You don't have any pending shipment consignments
                      </div>
                    )}
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                  Retail Shipments ( Distributor -> Retailer )
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <section className={"shipment-section"}>
                    {retailShipments.length !== 0 ? (
                      <ShipmentTable
                        array={retailShipments}
                        rowObjArr={retailRowObjArr}
                        shipmentType={"retail"}
                      />
                    ) : (
                      <div>
                        You don't have any pending shipment consignments
                      </div>
                    )}
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </>
  );
};

export default TransporterDashboard;
