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
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import PendingReportTable from "../laboratory/PendingReportTable";
import AllPurchaseOrders from "./AllPurchaseOrders";
import Button from "react-bootstrap/Button";

const RetailerDashboard = ({ location, history }) => {
  const [inventoryTable, setInventoryTable] = useState([]);
  const [barGraphObject, setBarGraphObject] = useState({});
  const [changed, setChanged] = useState(0);
  const [preloader, setPreloader] = useState(true);
  const [havePurchaseOrder, setHavePurchaseOrders] = useState(true);
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

      fetchProductUnitDetailsUsingUID(row.details.productUnitId)
        .then(productDetails => {
          if (left <= 0 || row.currentState.value !== 4) {
            addToGraph(productDetails.details.productName, unitsAlreadySold);
            resolve(null);
            return;
          }

          let objToBeAdded = {
            batchUnitId: row.batchUnitId,
            productName: productDetails.details.productName,
            left: left,
            productType: productDetails.details.productType,
            containerType: productDetails.details.container
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
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                <strong className={"utils__title"}>Purchase Orders</strong>
                <Button
                  variant={"primary"}
                  className={"float-right"}
                  type={"primary"}
                  onClick={() => {
                    history.push("/retailer/new-order");
                  }}
                >
                  Create New Order
                </Button>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <section className={"report-table-section"}>
                    {havePurchaseOrder ? (
                      <AllPurchaseOrders
                        noPurchaseOrder={() => setHavePurchaseOrders(false)}
                        forRetailer={true}
                      />
                    ) : (
                      <div>You Don't have anything in your inventory</div>
                    )}
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                <strong className={"utils__title"}>Inventory</strong>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <section className={"report-table-section"}>
                    {inventoryTable.length !== 0 ? (
                      <RetailerProductTable rows={inventoryTable} />
                    ) : (
                      <div>You Don't have anything in your inventory</div>
                    )}
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
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
