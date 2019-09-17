import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import Col from "react-bootstrap/Col";
import { makeXHR, setBreadcrumb } from "../../../helpers";
import Row from "react-bootstrap/Row";
import { connectToWeb3, convertFromHex } from "../../../dbController/init";
import { Table } from "react-bootstrap";
import { fetchRowsForCreatingPurchaseOrder } from "../../../dbController/retailerRole";
import { getDistributorDetails } from "../../../dbController/distributorRole";

const EditOrder = ({ history, location, match }) => {
  const [orderList, setOrderList] = useState([]);

  const orderId = match.params.id;
  useEffect(() => {
    makeXHR(
      "GET",
      `purchase-order/get?purchaseOrder=${convertFromHex(orderId)}`
    ).then(({ result }) => {
      connectToWeb3()
        .then(() => {
          return getDistributorDetails(result.distributorAddress);
        })
        .then(({ name, companyName }) => {
          result.distributorName = name;
          result.distributorCompany = companyName;
          let totalFetched = 0;
          fetchRowsForCreatingPurchaseOrder(
            result.distributorAddress,
            (row, total) => {
              totalFetched++;
              let x = result.orders.find(ele => {
                return ele.productUnitId === row.uid;
              });
              if (!x) {
                if (totalFetched === total) {
                  setOrderList(result);
                  doPendingJob(result);
                }
                return;
              }
              let oldUnitsUsed = row.details.totalPacketsUsed
                ? row.details.totalPacketsUsed
                : 0;
              x.availableUnits =
                row.details.totalPacketsManufactured - oldUnitsUsed;

              if (totalFetched === total) {
                setOrderList(result);
                doPendingJob(result);
              }
            }
          );
        });
    });
  }, []);

  function doPendingJob(orderList) {
    console.log(orderList);
  }

  return (
    <Layout history={history} location={location}>
      <Row>
        <Col>{setBreadcrumb(location.pathname)}</Col>
      </Row>
      <Row>
        <Col>
          <section className={"table-section card"}>
            <Table>
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Distributor</th>
                  <th>Quantity</th>
                  <th>Available</th>
                  <th>Price( $ x.xx / unit)</th>
                  <th>Total</th>
                </tr>
              </thead>
            </Table>
          </section>
        </Col>
      </Row>
    </Layout>
  );
};

export default EditOrder;
