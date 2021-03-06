import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { createTransactionModal, setBreadcrumb } from "../../helpers";
import { connectToWeb3 } from "../../dbController/init";
import {
  getDistributorToRetailerConsignments,
  getFactoryToDistributorConsignments,
  getFarmToFactoryConsignments,
  getLabSampleConsignments,
  getTransporterDetails
} from "../../dbController/transporterRole";
import { getFarmerDetails } from "../../dbController/farmerRole";
import { getManufacturerDetails } from "../../dbController/manufacturerRole";
import { getLaboratoryDetails } from "../../dbController/laboratoryRole";
import { getDistributorDetails } from "../../dbController/distributorRole";
import { getRetailerDetails } from "../../dbController/retailerRole";
import ShipmentTable from "./ShipmentTable";
import Loader from "../Loader";
import { OWN_ADDRESS } from "../../dbController/Web3Connections";
import config from "../../config";

const NewDashboard = ({ location }) => {
  const [harvestRowObjArr, setHarvestRowObjArr] = useState({});
  const [packageRowObjArr, setPackageObjRowArr] = useState({});
  const [sampleRowObjArr, setSampleRowObjArr] = useState({});
  const [retailRowObjArr, setRetailRowObjArr] = useState({});
  const [transactionMining, setTransactionMining] = useState(false);
  const [transactionObject, setTransactionObject] = useState(null);
  const [loading, setLoader] = useState(0);

  const [pendingShipments, setPendingShipments] = useState([]);
  const [dispatchedShipments, setDispatchedShipments] = useState([]);
  const [deliveredShipments, setDeliveredShipments] = useState([]);
  const [tableArray, setTableArray] = useState(pendingShipments);
  const [tableType, setTableType] = useState("pending");
  const [transporterDetails, setTransporterDetails] = useState({});
  const [buttonStates, setButtonStates] = useState({
    first: true,
    second: false,
    third: false
  });
  useEffect(() => {
    connectToWeb3().then(() => {
      let tempPendingShipments = [];
      let tempDispatchedShipments = [];
      let tempDeliveredShipments = [];
      let tempLoader = loading;
      let totalHarvests = 0;
      getFarmToFactoryConsignments((row, total) => {
        if (row) {
          totalHarvests += 1;
          let tempRow = harvestRowObjArr;
          tempRow[row.uid] = row;
          setHarvestRowObjArr(tempRow);
          let rowObj = {};
          rowObj.buid = row.uid;
          getFarmerDetails(row.details.farmerAddress).then(farmerObj => {
            getManufacturerDetails(row.details.manufacturerAddress).then(
              manufacturerObj => {
                rowObj.uid = row.uid;
                rowObj.url = `${row.uid}H`;
                rowObj.senderCompany = farmerObj;
                rowObj.receiverCompany = manufacturerObj;
                rowObj.amount = row.details.totalHarvestAmount + " Pounds";
                rowObj.requestedAt = row.details.sentToManufacturerOn;
                rowObj.dispatchTime =
                  row.details.farmToFactoryConsignmentDispatchTime;

                rowObj.currentStatus = row.currentState;
                rowObj.shipmentType = "harvest";
                rowObj.ipfsData = row;
                if (rowObj.currentStatus.value === 8) {
                  tempDispatchedShipments.push(rowObj);
                } else if (rowObj.currentStatus.value >= 9) {
                  tempDeliveredShipments.push(rowObj);
                } else {
                  tempPendingShipments.push(rowObj);
                }
                setPendingShipments([...tempPendingShipments]);
                setTableArray([...pendingShipments]);
                setDeliveredShipments([...tempDeliveredShipments]);
                setDispatchedShipments([...tempDispatchedShipments]);
                if (totalHarvests === total) {
                  setLoader(++tempLoader);
                }
              }
            );
          });
        } else {
          setLoader(++tempLoader);
        }
      });
      let totalSamples = 0;
      getLabSampleConsignments((row, total) => {
        if (!row) {
          setLoader(++tempLoader);
          return;
        }
        totalSamples++;
        let tempRow = sampleRowObjArr;
        tempRow[row.uid] = row;
        setSampleRowObjArr(tempRow);
        let rowObj = {};
        let farmerName;
        getFarmerDetails(row.details.farmerAddress)
          .then(name => {
            farmerName = name;
            return getLaboratoryDetails(row.details.laboratoryAddress);
          })
          .then(name => {
            rowObj.uid = row.uid;
            rowObj.url = `${row.uid}S`;
            rowObj.senderCompany = farmerName;
            rowObj.requestedAt = row.details.sentToLabOn;
            rowObj.receiverCompany = name;
            rowObj.currentStatus = row.currentState;
            rowObj.dispatchTime = row.details.labSampleConsignmentDispatchTime;
            rowObj.shipmentType = "sample";
            rowObj.ipfsData = row;
            if (rowObj.currentStatus.value === 3) {
              tempPendingShipments.push(rowObj);
            } else if (rowObj.currentStatus.value === 4) {
              tempDispatchedShipments.push(rowObj);
            } else if (rowObj.currentStatus.value >= 5) {
              tempDeliveredShipments.push(rowObj);
            }
            setPendingShipments([...tempPendingShipments]);
            setTableArray([...tempPendingShipments]);
            setDeliveredShipments([...tempDeliveredShipments]);
            setDispatchedShipments([...tempDispatchedShipments]);
            if (totalSamples === total) {
              setLoader(++tempLoader);
            }
          });
      });
      let totalUnits = 0;
      getFactoryToDistributorConsignments((row, total) => {
        if (!row) {
          setLoader(++tempLoader);
          return;
        }
        totalUnits++;
        let tempRow = packageRowObjArr;
        tempRow[row.uid] = row;
        setPackageObjRowArr(tempRow);
        let rowObj = {};
        let manufacturerAddress =
          row.details.manufacturerAddress || config.ADDRESS;
        let manufacturerName;
        getManufacturerDetails(manufacturerAddress).then(name => {
          manufacturerName = name;
          return getDistributorDetails(row.details.distributorAddress).then(
            name => {
              rowObj.uid = row.uid;
              rowObj.url = `${row.uid}P`;
              rowObj.senderCompany = manufacturerName;
              rowObj.requestedAt = row.details.packedOn;
              rowObj.receiverCompany = name;
              rowObj.currentStatus = row.currentState;
              rowObj.dispatchTime =
                row.details.manufacturerToDistributorDispatchTime;
              rowObj.amount = row.details.totalPacketsManufactured;
              rowObj.shipmentType = "product";
              rowObj.ipfsData = row;
              if (rowObj.currentStatus.value === 2) {
                tempPendingShipments.push(rowObj);
              } else if (rowObj.currentStatus.value === 3) {
                tempDispatchedShipments.push(rowObj);
              } else if (rowObj.currentStatus.value >= 4) {
                tempDeliveredShipments.push(rowObj);
              }
              setPendingShipments([...tempPendingShipments]);
              setTableArray([...tempPendingShipments]);
              setDeliveredShipments([...tempDeliveredShipments]);
              setDispatchedShipments([...tempDispatchedShipments]);
              if (totalUnits === total) {
                setLoader(++tempLoader);
              }
            }
          );
        });
      });
      let totalRetail = 0;
      getDistributorToRetailerConsignments((row, total) => {
        if (!row) {
          setLoader(++tempLoader);
          return;
        }
        totalRetail++;
        let tempRow = retailRowObjArr;
        tempRow[row.uid] = row;
        setRetailRowObjArr(tempRow);
        let rowObj = {};
        let distributorAddress =
          row.details.distributorAddress || config.ADDRESS;
        let distributorName;
        getDistributorDetails(distributorAddress)
          .then(name => {
            distributorName = name;
            return getRetailerDetails(row.details.retailerAddress);
          })
          .then(name => {
            rowObj.uid = row.uid;
            rowObj.url = `${row.uid}B`;
            rowObj.senderCompany = distributorName;
            rowObj.requestedAt = row.details.sentToRetailerOn;
            rowObj.receiverCompany = name;
            rowObj.currentStatus = row.currentState;
            rowObj.dispatchTime = row.details.distributorToRetailerDispatchTime;
            rowObj.amount = row.details.totalPacketsManufactured;
            rowObj.shipmentType = "retail";
            rowObj.ipfsData = row;
            if (rowObj.currentStatus.value === 2) {
              tempPendingShipments.push(rowObj);
            } else if (rowObj.currentStatus.value === 3) {
              tempDispatchedShipments.push(rowObj);
            } else if (rowObj.currentStatus.value >= 4) {
              tempDeliveredShipments.push(rowObj);
            }
            setPendingShipments([...tempPendingShipments]);
            setDeliveredShipments([...tempDeliveredShipments]);
            setDispatchedShipments([...tempDispatchedShipments]);
            if (totalRetail === total) {
              setLoader(++tempLoader);
            }
          });
      });
      getTransporterDetails(OWN_ADDRESS).then(obj => {
        setTransporterDetails(obj);
      });
    });
  }, []);

  useEffect(() => {
    console.log(tableType);
    if (tableType === "pending") {
      setTableArray(pendingShipments);
      setButtonStates({
        first: true,
        second: false,
        third: false
      });
    } else if (tableType === "dispatched") {
      setTableArray(dispatchedShipments);
      setButtonStates({
        first: false,
        second: true,
        third: false
      });
    } else {
      setTableArray(deliveredShipments);
      setButtonStates({
        first: false,
        second: false,
        third: true
      });
    }
  }, [tableType, pendingShipments, dispatchedShipments, deliveredShipments]);

  return (
    <>
      <Row>
        <Col>{setBreadcrumb(location.pathname)}</Col>
      </Row>
      <Row>
        <Col md={12} sm={12} xs={12} xl={12}>
          <section className={"nav-buttons-section"}>
            <ul className={"horizontal-list"}>
              <li
                className={buttonStates.first ? "active" : null}
                onClick={() => {
                  setTableArray([]);
                  setTableType("pending");
                }}
              >
                Pending Shipments
              </li>

              <li
                className={buttonStates.second ? "active" : null}
                onClick={() => {
                  setTableArray([]);
                  setTableType("dispatched");
                }}
              >
                Dispatched Shipments
              </li>
              <li
                className={buttonStates.third ? "active" : null}
                onClick={() => {
                  setTableArray([]);
                  setTableType("delivered");
                }}
              >
                Delivered Shipments
              </li>
            </ul>
          </section>
        </Col>
      </Row>
      <section className={"shipment-table-section card"}>
        <Row>
          <Col md={12}>
            <ShipmentTable
              transporterDetails={transporterDetails}
              array={tableArray}
              tableType={tableType}
              setTransactionMining={() => {
                setTransactionMining(true);
              }}
              setTransactionObject={setTransactionObject}
            />
          </Col>
        </Row>
      </section>
      {transactionMining ? <Loader /> : null}
      {loading < 4 ? <Loader message={"Fetching Pending Shipments"} /> : null}
      {transactionObject ? createTransactionModal(transactionObject) : null}
    </>
  );
};

export default NewDashboard;
