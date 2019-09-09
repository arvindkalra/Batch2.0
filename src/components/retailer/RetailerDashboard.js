import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../../assets/stylesheets/App.scss";
import { connectToWeb3 } from "../../dbController/init";
import { getRowsForRetailer } from "../../dbController/retailerRole";
import { fetchProductUnitDetailsUsingUID } from "../../dbController/manufacturerRole";
import RetailerProductTable from "./RetailerProductTable";
import BarGraph from "../farmer/graphs/dashboard/BarGraph";
import Loader from "../Loader";

const RetailerDashboard = ({ location }) => {
  const [inventoryTable, setInventoryTable] = useState([]);
  const [barGraphObject, setBarGraphObject] = useState({});
  const [changed, setChanged] = useState(0);
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    connectToWeb3().then(() => {
      let tempInventory = inventoryTable;
      let tempBarGraphObject = barGraphObject;
      let tempChanged = changed;
      let totalEntries = 0;
      getRowsForRetailer((row, total) => {
        if (!row) {
          setPreloader(false);
          return;
        }
        totalEntries++;
        if (row.currentState.value === 4) {
          getObjectForRow(row, (...args) => {
            addToGraphData(
              ...args,
              tempBarGraphObject,
              setBarGraphObject,
              tempChanged++
            );
          }).then(obj => {
            if (obj) {
              tempInventory.push(obj);
              setInventoryTable([...tempInventory]);
              if (totalEntries === total) {
                setPreloader(false);
              }
            }
          });
        } else {
          if (totalEntries === total) {
            setPreloader(false);
          }
        }
      });
    });
  }, []);

  function getObjectForRow(row, addToGraph) {
    return new Promise((resolve, reject) => {
      let unitsAlreadySold = row.details.totalUnitsAlreadySold
        ? row.details.totalUnitsAlreadySold
        : 0;
      let left = row.details.totalUnitsForSale - unitsAlreadySold;
      if (left <= 0 || row.currentState.value !== 4) {
        addToGraph(row.details.packetName, unitsAlreadySold);
        resolve(null);
        return;
      }
      fetchProductUnitDetailsUsingUID(row.details.productUnitId)
        .then(productDetails => {
          let objToBeAdded = {
            batchUnitId: row.batchUnitId,
            productName: row.details.packetName,
            left: left,
            productType: productDetails.details.productType,
            containerType: row.details.containerType
          };
          addToGraph(objToBeAdded.productName, unitsAlreadySold);
          resolve(objToBeAdded);
        })
        .catch(reject);
    });
  }

  function addToGraphData(which, howMuch, getter, setter, tempChanged) {
    let tempBarObject = getter;
    if (tempBarObject[which]) {
      let old = tempBarObject[which];
      tempBarObject[which] = old + howMuch;
    } else {
      if (howMuch > 0) {
        tempBarObject[which] = howMuch;
      }
    }
    setChanged(tempChanged);
    setter(tempBarObject);
  }

  return (
    <>
      <Row>
        <Col>{setBreadcrumb(location.pathname)}</Col>
      </Row>
      <Row>
        <Col md={6}>
          <section className={"status-tab card"}>
            <div className={"card-header"}>
              <strong className={"utils__title"}>Sales Targets</strong>
            </div>
            <ProgressBar now={40} label={`${40}%`} />
            <p className={"status-tab-description"}>
              40% of the Sales targets met
            </p>
          </section>
        </Col>
        <Col md={6}>
          <section className={"status-tab card"}>
            <div className={"card-header"}>
              <strong className={"utils__title"}>Inventory Status</strong>
            </div>
            <ProgressBar now={80} label={`${80}%`} />
            <p className={"status-tab-description"}>80% of inventory cleared</p>
          </section>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <section className={"dashboard-section card"}>
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong>Inventory</strong>
              </div>
            </div>
            <section className={"table-section"}>
              <RetailerProductTable rows={inventoryTable} />
            </section>
          </section>
        </Col>
        <Col md={6}>
          <section className={"dashboard-section card"}>
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong>Products Sold in 2019</strong>
              </div>
            </div>
            <BarGraph
              ObjectToShow={barGraphObject}
              changed={changed}
              label={"Products Sold"}
            />
          </section>
        </Col>
      </Row>
      {preloader ? <Loader message={"Fetching Data"} /> : null}
    </>
  );
};

export default RetailerDashboard;
