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
import Loader from "../Loader";
import Badge from "react-bootstrap/Badge";
import BarGraph from "../farmer/graphs/dashboard/BarGraph";

const TransporterDashboard = ({ location }) => {
  const [harvestShipments, setHarvestShipments] = useState([]);
  const [packagedShipments, setPackagedShipments] = useState([]);
  const [harvestRowObjArr, setHarvestRowObjArr] = useState({});
  const [packageRowObjArr, setPackageObjRowArr] = useState({});
  const [sampleShipments, setSampleShipment] = useState([]);
  const [sampleRowObjArr, setSampleRowObjArr] = useState({});
  const [retailShipments, setRetailShipments] = useState([]);
  const [retailRowObjArr, setRetailRowObjArr] = useState({});
  const [transactionMining, setTransactionMining] = useState(false);
  const [harvestGraph, setHarvestGraph] = useState({
    Packed: 0,
    Dispatched: 0,
    Delivered: 0
  });
  const [sampleGraph, setSampleGraph] = useState({
    Packed: 0,
    Dispatched: 0,
    Delivered: 0
  });
  const [packageGraph, setPackageGraph] = useState({
    Packed: 0,
    Dispatched: 0,
    Delivered: 0
  });
  const [retailGraph, setRetailGraph] = useState({
    Packed: 0,
    Dispatched: 0,
    Delivered: 0
  });
  const [changed, setChanged] = useState(0);
  useEffect(() => {
    connectToMetamask().then(() => {
      let tempHarvestShipments = harvestShipments;
      let tempPackagedShipment = packagedShipments;
      let tempSampleShipments = sampleShipments;
      let tempRetailShipments = retailShipments;
      let tempHarvestGraph = harvestGraph;
      let tempPackageGraph = packageGraph;
      let tempSampleGraph = sampleGraph;
      let tempRetailGraph = retailGraph;
      let tempChanged = changed;
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
                addToGraphData(
                  "Delivered",
                  1,
                  tempHarvestGraph,
                  setHarvestGraph,
                  tempChanged++
                );
                return;
              } else if (row.currentState.value === 8) {
                addToGraphData(
                  "Dispatched",
                  1,
                  tempHarvestGraph,
                  setHarvestGraph,
                  tempChanged++
                );
              } else {
                addToGraphData(
                  "Packed",
                  1,
                  tempHarvestGraph,
                  setHarvestGraph,
                  tempChanged++
                );
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
            if (row.currentState.value >= 5) {
              addToGraphData(
                "Delivered",
                1,
                tempSampleGraph,
                setSampleGraph,
                tempChanged++
              );
            } else {
              if (row.currentState.value === 4) {
                addToGraphData(
                  "Dispatched",
                  1,
                  tempSampleGraph,
                  setSampleGraph,
                  tempChanged++
                );
              }
              if (row.currentState.value === 3) {
                addToGraphData(
                  "Packed",
                  1,
                  tempSampleGraph,
                  setSampleGraph,
                  tempChanged++
                );
              }
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
          "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20";
        let manufacturerName;
        getManufacturerDetails(manufacturerAddress).then(({ name }) => {
          manufacturerName = name;
          return getDistributorDetails(row.details.distributorAddress).then(
            ({ name }) => {
              if (row.currentState.value >= 4) {
                addToGraphData(
                  "Delivered",
                  1,
                  tempPackageGraph,
                  setPackageGraph,
                  tempChanged++
                );
              } else {
                if (row.currentState.value === 3) {
                  addToGraphData(
                    "Dispatched",
                    1,
                    tempPackageGraph,
                    setPackageGraph,
                    tempChanged++
                  );
                }
                if (row.currentState.value === 2) {
                  addToGraphData(
                    "Packed",
                    1,
                    tempPackageGraph,
                    setPackageGraph,
                    tempChanged++
                  );
                }
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
          "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20";
        let distributorName;
        getDistributorDetails(distributorAddress)
          .then(({ name }) => {
            distributorName = name;
            return getRetailerDetails(row.details.retailerAddress);
          })
          .then(({ name }) => {
            if (row.currentState.value >= 4) {
              addToGraphData(
                "Delivered",
                1,
                tempRetailGraph,
                setRetailGraph,
                tempChanged++
              );
            } else {
              if (row.currentState.value === 3) {
                addToGraphData(
                  "Dispatched",
                  1,
                  tempRetailGraph,
                  setRetailGraph,
                  tempChanged++
                );
              }
              if (row.currentState.value === 2) {
                addToGraphData(
                  "Packed",
                  1,
                  tempRetailGraph,
                  setRetailGraph,
                  tempChanged++
                );
              }
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

      {/*Tables for showing current shipments*/}
      <Row>
        <Col md={12}>
          <Accordion>
            <Row>
              <Col md={6}>
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={12}>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle
                              as={Card.Header}
                              variant="link"
                              eventKey="0"
                            >
                              Harvest Shipments ( Grower -> Manufacturer )
                              <br />
                              {harvestShipments.length !== 0 ? (
                                <Badge pill variant="success">
                                  New Shipments
                                </Badge>
                              ) : (
                                <Badge pill variant="warning">
                                  None Pending
                                </Badge>
                              )}
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
                                    setTransactionMining={() => {
                                      setTransactionMining(true);
                                    }}
                                  />
                                ) : (
                                  <div>
                                    You don't have any pending shipment
                                    consignments
                                  </div>
                                )}
                              </section>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Col>
                      <Col md={12}>
                        <BarGraph
                          ObjectToShow={harvestGraph}
                          changed={changed}
                          label={"Harvest Shipments"}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12}>
                    <Row>
                      <Col md={12}>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle
                              as={Card.Header}
                              variant="link"
                              eventKey="1"
                            >
                              Product Shipments ( Manufacturer -> Distributor )
                              <br />
                              {packagedShipments.length !== 0 ? (
                                <Badge pill variant="success">
                                  New Shipments
                                </Badge>
                              ) : (
                                <Badge pill variant="warning">
                                  None Pending
                                </Badge>
                              )}
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
                                    setTransactionMining={() => {
                                      setTransactionMining(true);
                                    }}
                                  />
                                ) : (
                                  <div>
                                    You don't have any pending shipment
                                    consignments
                                  </div>
                                )}
                              </section>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Col>
                      <Col md={12}>
                        <BarGraph
                          ObjectToShow={packageGraph}
                          changed={changed}
                          label={"Product Shipments"}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={12}>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Card.Header}
                          variant="link"
                          eventKey="2"
                        >
                          Laboratory Sample Shipments ( Grower -> Laboratory )
                          <br />
                          {sampleShipments.length !== 0 ? (
                            <Badge pill variant="success">
                              New Shipments
                            </Badge>
                          ) : (
                            <Badge pill variant="warning">
                              None Pending
                            </Badge>
                          )}
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
                                setTransactionMining={() => {
                                  setTransactionMining(true);
                                }}
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
                  </Col>
                  <Col md={12}>
                    <BarGraph
                      ObjectToShow={sampleGraph}
                      changed={changed}
                      label={"Sample Shipments"}
                    />
                  </Col>
                </Row>
                <Col md={12}>
                  <Row>
                    <Col md={12}>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle
                            as={Card.Header}
                            variant="link"
                            eventKey="3"
                          >
                            Retail Shipments ( Distributor -> Retailer )
                            <br />
                            {retailShipments.length !== 0 ? (
                              <Badge pill variant="success">
                                New Shipments
                              </Badge>
                            ) : (
                              <Badge pill variant="warning">
                                None Pending
                              </Badge>
                            )}
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
                                  setTransactionMining={() => {
                                    setTransactionMining(true);
                                  }}
                                />
                              ) : (
                                <div>
                                  You don't have any pending shipment
                                  consignments
                                </div>
                              )}
                            </section>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Col>
                    <Col md={12}>
                      <BarGraph
                        ObjectToShow={retailGraph}
                        changed={changed}
                        label={"Retail Shipments"}
                      />
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Accordion>
        </Col>
      </Row>
      {transactionMining ? <Loader /> : null}
    </>
  );
};

export default TransporterDashboard;
