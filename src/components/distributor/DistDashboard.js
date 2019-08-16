import React, { useState, useEffect } from "react";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/Col";
import BarGraph from "../farmer/graphs/dashboard/BarGraph";
import { connectToMetamask } from "../../dbController/init";
import { fetchProductUnitsForDistributor } from "../../dbController/distributorRole";
import { getManufacturerDetails } from "../../dbController/manufacturerRole";
import AvailableUnitsTable from "./AvailableUnitsTable";

const DistDashboard = ({ location }) => {
  const [
    availablePackedProductsGraph,
    setAvailablePackedProductsGraph
  ] = useState({});
  const [
    availablePackedProductsArray,
    setAvailablePackedProductsArray
  ] = useState([]);
  const [changed, setChanged] = useState(1);

  useEffect(() => {
    connectToMetamask().then(() => {
      let tempAvailableArray = availablePackedProductsArray;
      let tempChanged = changed;
      fetchProductUnitsForDistributor(rowObj => {
        console.log(rowObj);
        let manufacturerAddress =
          rowObj.details.manufacturerAddress ||
          "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
        getManufacturerDetails(manufacturerAddress).then(({ name }) => {
          let packetsTransferred = rowObj.details.totalPacketsUsed
            ? rowObj.details.totalPacketsUsed
            : 0;
          let left =
            rowObj.details.totalPacketsManufactured - packetsTransferred;
          if (left > 0) {
            let rowArray = {
              packetUnitId: rowObj.uid,
              manufacturerName: name,
              pendingAmount: left,
              productType: rowObj.details.productType
            };
            tempAvailableArray.push(rowArray);
            setAvailablePackedProductsArray([...tempAvailableArray]);
          }
          addToGraphData(rowObj.details.productType, left, availablePackedProductsGraph, setAvailablePackedProductsGraph, tempChanged);
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
    setChanged(tempChanged++);
  };
  return (
    <>
      <Row>
        <Col md={12}>{setBreadcrumb(location.pathname)}</Col>
      </Row>
      <Row>
        <Col md={6}>
          <section className={"manufacturer-graph dashboard-section"}>
            <h3 className={"section-title"}>Available Processed Products</h3>
            <BarGraph ObjectToShow={availablePackedProductsGraph} changed={changed} label={"Processed Units"}/>
          </section>
        </Col>
        <Col md={6}>
          <section className={"report-table-section dashboard-section"}>
            <h3 className={"section-title"}>Available Processed Products</h3>
            <AvailableUnitsTable array={availablePackedProductsArray} />
          </section>
        </Col>
      </Row>
    </>
  );
};

export default DistDashboard;
