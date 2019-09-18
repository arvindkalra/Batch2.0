import React, { useState, useEffect } from "react";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/Col";
import BarGraph from "../farmer/graphs/dashboard/BarGraph";
import { connectToWeb3 } from "../../dbController/init";
import { fetchProductUnitsForDistributor } from "../../dbController/distributorRole";
import { getManufacturerDetails } from "../../dbController/manufacturerRole";
import AvailableUnitsTable from "./AvailableUnitsTable";
import Loader from "../Loader";
import config from "../../config";
import { Accordion, Card } from "react-bootstrap";
import AllPurchaseOrders from "../retailer/AllPurchaseOrders";
import Button from "react-bootstrap/Button";

const DistDashboard = ({ location, history }) => {
  const [
    availablePackedProductsGraph,
    setAvailablePackedProductsGraph
  ] = useState({});
  const [
    availablePackedProductsArray,
    setAvailablePackedProductsArray
  ] = useState([]);
  const [changed, setChanged] = useState(1);
  const [preloader, setPreloader] = useState(true);
  const [hasPurchaseOrders, setHasPurchaseOrders] = useState(true);

  useEffect(() => {
    connectToWeb3().then(() => {
      let tempAvailableArray = availablePackedProductsArray;
      let tempChanged = changed;
      let totalEntries = 0;
      fetchProductUnitsForDistributor((rowObj, total) => {
        if (!rowObj) {
          setPreloader(false);
          return;
        }
        totalEntries++;
        let manufacturerAddress =
          rowObj.details.manufacturerAddress || config.ADDRESS;
        getManufacturerDetails(manufacturerAddress).then(({ name }) => {
          let packetsTransferred = rowObj.details.totalPacketsUsed
            ? rowObj.details.totalPacketsUsed
            : 0;
          let left =
            rowObj.details.totalPacketsManufactured - packetsTransferred;
          if (left > 0 && rowObj.currentState.value >= 4) {
            let rowArray = {
              packetUnitId: rowObj.uid,
              manufacturerName: name,
              pendingAmount: left,
              sellingPrice: rowObj.details.distributorToRetailerPrice,
              productType: rowObj.details.productName
            };
            tempAvailableArray.push(rowArray);
            setAvailablePackedProductsArray([...tempAvailableArray]);
          }
          if (rowObj.currentState.value >= 4) {
            addToGraphData(
              rowObj.details.productName,
              left,
              availablePackedProductsGraph,
              setAvailablePackedProductsGraph,
              ++tempChanged
            );
          }
          if (totalEntries === total) {
            setPreloader(false);
          }
        });
      });
    });
  }, []);

  const addToGraphData = (which, howMuch, getter, setter, tempChanged) => {
    let tempBarObject = getter;
    if (tempBarObject[which]) {
      let old = tempBarObject[which];
      tempBarObject[which] = old + howMuch;
    } else {
      tempBarObject[which] = howMuch;
    }
    setter(tempBarObject);
    setChanged(tempChanged);
  };
  return (
    <>
      <Row>
        <Col md={12}>{setBreadcrumb(location.pathname)}</Col>
      </Row>
      <Row>
        <Col md={6}>
          <section className={"dashboard-section card"}>
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong className={"section-title"}>
                  Stock Status
                </strong>
              </div>
            </div>
            <BarGraph
              ObjectToShow={availablePackedProductsGraph}
              changed={changed}
              label={"Processed Units"}
            />
          </section>
        </Col>
        <Col md={6}>
          <section className={"dashboard-section card"}>
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong className={"section-title"}>Inventory Detail</strong>
              </div>
            </div>
            <AvailableUnitsTable array={availablePackedProductsArray} />
          </section>
        </Col>
        {hasPurchaseOrders ? (
          <Col md={12}>
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                  <div className={"utils__title"}>
                    <strong className={"section-title"}>Purchase Orders</strong>

                  </div>

                </Accordion.Toggle>
                <Accordion.Collapse eventKey={"0"}>
                  <Card.Body>
                    <section>
                      <AllPurchaseOrders
                        noPurchaseOrder={() => setHasPurchaseOrders(false)}
                        forRetailer={false}
                      />
                    </section>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        ) : null}
      </Row>
      {preloader ? <Loader message={"Fetching Data"} /> : null}
    </>
  );
};

export default DistDashboard;
