import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Col from "react-bootstrap/Col";
import { makeXHR, setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import { Table } from "react-bootstrap";
import { connectToWeb3, convertFromHex } from "../../dbController/init";
import { getRetailerDetails } from "../../dbController/retailerRole";
import { fetchProductUnitDetailsUsingUID } from "../../dbController/manufacturerRole";
import Loader from "../Loader";

const PurchaseOrder = ({ history, location, match }) => {
  const [viewableTableArray, setViewableTableArray] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const orderId = match.params.id;
    makeXHR(
      "GET",
      `purchase-order/get?purchaseOrder=${convertFromHex(orderId)}`
    ).then(createViewableObject);
  }, []);

  const createViewableObject = ({ result }) => {
    let retailerDetails = {};
    let tempArray = viewableTableArray;
    connectToWeb3()
      .then(() => {
        return getRetailerDetails(result.retailerAddress);
      })
      .then(obj => {
        retailerDetails = obj;
        let i = 0;
        result.orders.forEach(item => {
          i++;
          fetchProductUnitDetailsUsingUID(item.productUnitId).then(
            ({ details }) => {
              let oldUnitsUsed = details.totalPacketsUsed
                ? details.totalPacketsUsed
                : 0;
              let left = details.totalPacketsManufactured - oldUnitsUsed;
              let objToAdd = {
                productId: item.productUnitId,
                productName: details.productName,
                orderedQuantity: item.amount,
                available: left,
                price: details.distributorToRetailerPrice
              };
              console.log(objToAdd);
              tempArray.push(objToAdd);
              setViewableTableArray([...tempArray]);
              if (i === result.orders.length) {
                setLoader(false);
              }
            }
          );
        });
      });
  };

  return (
    <>
      <Layout history={history} location={location}>
        <Row>
          <Col>{setBreadcrumb(location.pathname)}</Col>
        </Row>
        <Row>
          <Col>
            <section className={"table-section card"}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Retailer</th>
                    <th>Ordered Quantity</th>
                    <th>Available</th>
                    <th>Price( $ x.xx / unit)</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </section>
          </Col>
        </Row>
      </Layout>
      {loader ? <Loader message={"Fetching Data..."} /> : null}
    </>
  );
};

export default PurchaseOrder;
