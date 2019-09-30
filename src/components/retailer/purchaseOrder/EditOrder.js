import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import Col from "react-bootstrap/Col";
import {
  createPurchaseOrderId,
  makeXHR,
  setBreadcrumb
} from "../../../helpers";
import Row from "react-bootstrap/Row";
import {
  connectToWeb3,
  convertFromHex,
  convertToHex
} from "../../../dbController/init";
import { Card, Form, Table } from "react-bootstrap";
import { fetchRowsForCreatingPurchaseOrder } from "../../../dbController/retailerRole";
import { getDistributorDetails } from "../../../dbController/distributorRole";
import EditRow from "./EditRow";
import Loader from "../../Loader";
import { fetchProductUnitDetailsUsingUID } from "../../../dbController/manufacturerRole";

const EditOrder = ({ history, location, match }) => {
  const [orderList, setOrderList] = useState([]);
  const [loader, setLoader] = useState(true);

  const orderId = match.params.id;
  useEffect(() => {
    makeXHR("GET", `getOrderDetails?orderId=${convertFromHex(orderId)}`).then(
      ({ result }) => {
        connectToWeb3()
          .then(() => {
            return getDistributorDetails(result.distributorAddress);
          })
          .then(({ name, companyName }) => {
            result.distributorName = name;
            result.distributorCompany = companyName;
            let { itemsArray } = result;
            let i = 0;
            itemsArray.forEach(item => {
              let { puid, orderedAmount, status } = item;
              i++;
              let tempArr = orderList;
              puid = convertToHex(puid);
              fetchProductUnitDetailsUsingUID(puid).then(productDetails => {
                let x = {};
                x.url = createPurchaseOrderId(orderId, convertFromHex(puid));
                let oldUnitsUsed = productDetails.details.totalPacketsUsed
                  ? productDetails.details.totalPacketsUsed
                  : 0;
                x.availableUnits =
                  productDetails.details.totalPacketsManufactured -
                  oldUnitsUsed;
                x.price = productDetails.details.distributorToRetailerPrice;
                x.productName = productDetails.details.productName;
                x.distributorName = result.distributorName;
                x.amount = orderedAmount;
                x.currentState = status;
                tempArr.push(x);
                setOrderList([...tempArr]);
                if (i === itemsArray.length) {
                  doPendingJob();
                }
              });
            });
          });
      }
    );
  }, []);

  function doPendingJob() {
    setLoader(false);
  }

  return (
    <>
      <Layout history={history} location={location}>
        <Row>
          <Col>{setBreadcrumb(location.pathname)}</Col>
        </Row>
        <Row>
          <Col>
            <section className={"table-section card"}>
              <Card.Header>
                <strong className={"utils__title"}>Edit Purchase Order</strong>
              </Card.Header>
              <Table>
                <thead>
                  <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Distributor</th>
                    <th>Quantity</th>
                    <th>Available Units</th>
                    <th>Price( $ x.xx / unit)</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {orderList.map((order, index) => {
                    return (
                      <EditRow
                        key={index}
                        order={order}
                        index={index}
                        distributorName={orderList.distributorName}
                      />
                    );
                  })}
                </tbody>
              </Table>
            </section>
          </Col>
        </Row>
      </Layout>
      {loader ? <Loader message={"Fetching Details..."} /> : null}
    </>
  );
};

export default EditOrder;
