import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Col from "react-bootstrap/Col";
import { createPurchaseOrderId, makeXHR, setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import { Card, Table } from "react-bootstrap";
import {
  connectToWeb3,
  convertFromHex,
  convertToHex
} from "../../dbController/init";
import { getRetailerDetails } from "../../dbController/retailerRole";
import { fetchProductUnitDetailsUsingUID } from "../../dbController/manufacturerRole";
import Loader from "../Loader";
import OrderRow from "./OrderRow";

const PurchaseOrder = ({ history, location, match }) => {
  const [viewableTableArray, setViewableTableArray] = useState([]);
  const [loader, setLoader] = useState(true);
  const [retailerDetails, setRetailerDetails] = useState({});
  const orderId = match.params.id;
  useEffect(() => {
    makeXHR("GET", `getOrderDetails?orderId=${convertFromHex(orderId)}`).then(
      createViewableObject
    );
  }, []);

  const createViewableObject = ({ result }) => {
    let tempArray = viewableTableArray;
    connectToWeb3()
      .then(() => {
        return getRetailerDetails(result.retailerAddress);
      })
      .then(obj => {
        setRetailerDetails(obj);
        let i = 0;
        result.itemsArray.forEach(item => {
          i++;
          let puid = convertToHex(item.puid);
          fetchProductUnitDetailsUsingUID(puid).then(({ details }) => {
            let oldUnitsUsed = details.totalPacketsUsed
              ? details.totalPacketsUsed
              : 0;
            let left = details.totalPacketsManufactured - oldUnitsUsed;
            let objToAdd = {
              productId: createPurchaseOrderId(orderId, item.puid),
              productName: details.productName,
              orderedQuantity: item.orderedAmount,
              available: left,
              price: details.distributorToRetailerPrice,
              unTouchedDetail: details,
              currentState: item.status
            };
            tempArray.push(objToAdd);
            setViewableTableArray([...tempArray]);
            if (i === result.itemsArray.length) {
              setLoader(false);
            }
          });
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
          <Col md={12}>
            <Card>
              <Row>
                <Col md={12}>
                  <h1 className={"text-center title"}> Purchase Order</h1>
                  <br />
                </Col>
                <Col md={6}>
                  <h4>
                    <strong>
                      Business Name: {retailerDetails.companyName}
                    </strong>
                    <br />
                    Contact Person: {retailerDetails.name}
                  </h4>
                  <address>
                    {retailerDetails.address}
                    <br />
                    <abbr title={"License Number"}>License:</abbr>{" "}
                    {retailerDetails.licenseNumber || "Unavailable"}
                    <br />
                    <abbr title={"License Type"}>Type:</abbr>{" "}
                    {retailerDetails.licenseType}
                  </address>
                </Col>

                <Col md={12}>
                  <section className={"table-section"}>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Product Id</th>
                          <th>Product Name</th>

                          <th>Ordered Quantity</th>
                          <th>Available Quantity</th>
                          <th>Price( $ x.xx / unit)</th>
                          <th>Total($)</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {viewableTableArray.map((item, index) => {
                          return (
                            <OrderRow
                              item={item}
                              key={index}
                              purchaseOrderId={orderId}
                            />
                          );
                        })}
                      </tbody>
                    </Table>
                  </section>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Layout>
      {loader ? <Loader message={"Fetching Data..."} /> : null}
    </>
  );
};

export default PurchaseOrder;
