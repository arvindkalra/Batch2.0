import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { createTransactionModal, setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import AvailableRawMaterialTable from "./AvailableRawMaterialTable";
import ManufacturedPacketsTable from "./ManufacturedPacketsTable";
import ManufacturerBarGraph from "./ManufacturerBarGraph";
import {
  fetchHarvestUnitsByManufacturer,
  fetchPackagedUnitsByManufacturer
} from "../../dbController/manufacturerRole";
import { connectToWeb3 } from "../../dbController/init";
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
  const [transactionMining, setTransactionMining] = useState(false);
  const [transactionObject, setTransactionObject] = useState(null);
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    let totalHarvest = 0;
    let tempChanged = changed;
    connectToWeb3().then(() => {
      fetchHarvestUnitsByManufacturer((harvestObject, total) => {
        if (!harvestObject) {
          setPreloader(false);
          return;
        }
        totalHarvest++;
        let tempAvailableArray = availableArray;
        getFarmerDetails(harvestObject.details.farmerAddress).then(
          farmerObject => {
            let harvestUsed = harvestObject.details.totalHarvestUsed
              ? harvestObject.details.totalHarvestUsed
              : 0;
            let leftAmount =
              harvestObject.details.totalHarvestAmount - harvestUsed;
            if (leftAmount > 0 && harvestObject.currentState.value === 9) {
              let rowArray = {
                harvestUnitId: harvestObject.uid,
                farmerName: farmerObject.name,
                pendingAmount: leftAmount,
                plantType: harvestObject.details.plantType.captialize()
              };
              tempAvailableArray.push(rowArray);
              setAvailableArray([...tempAvailableArray]);
              addToGraphData(
                harvestObject.details.plantType,
                leftAmount,
                availableGraphData,
                setAvailableGraphData,
                ++tempChanged
              );
            }
            if (totalHarvest === total) {
              setPreloader(false);
            }
          }
        );
      });

      let tempAvailablePackets = packetsReadyForDispatch;
      fetchPackagedUnitsByManufacturer(packageUnit => {
        if (packageUnit.currentState.value === 1) {
          let obj = {
            productUnitId: packageUnit.uid,
            productName: packageUnit.details.productName,
            totalPacketsManufactured:
              packageUnit.details.totalPacketsManufactured,
            details: packageUnit.details
          };
          tempAvailablePackets.push(obj);
          setPacketsReadyForDispatch([...tempAvailablePackets]);
        }
        addToGraphData(
          packageUnit.details.productName,
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
          <section className="dashboard-section card">
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong>Stock Status</strong>
              </div>
            </div>
            <BarGraph
              ObjectToShow={availableGraphData}
              label={"Kilograms"}
            />
          </section>
        </Col>
        <Col md={6}>
          <section className={"dashboard-section card"}>
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong className={"section-title"}>
                  Raw Material in Inventory
                </strong>
              </div>
            </div>
            <AvailableRawMaterialTable array={availableArray} />
          </section>
        </Col>
      </Row>

      {/*Two tables for available raw material and packets made ready for dispatch*/}
      <Row>
        <Col md={6}>
          <section className={"dashboard-section card"}>
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong className={"section-title"}>Processed Products in Inventory</strong>
              </div>
            </div>
            <ManufacturedPacketsTable
              array={packetsReadyForDispatch}
              setTransactionMining={() => {
                setTransactionMining(true);
              }}
              setTransactionObject={setTransactionObject}
            />
          </section>
        </Col>
        <Col md={6}>
          <section className={"dashboard-section card"}>
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong className={"section-title"}>
                  Products Manufactured in 2019
                </strong>
              </div>
            </div>
            <BarGraph
              ObjectToShow={packetsManufacturedGraphData}
              label={"Product Units"}
            />
          </section>
        </Col>
      </Row>
      {transactionMining ? <Loader /> : null}
      {transactionObject ? createTransactionModal(transactionObject) : null}
      {preloader ? <Loader message={"Fetching Data"} /> : null}
    </>
  );
};

export default ManufacturerDashboard;
