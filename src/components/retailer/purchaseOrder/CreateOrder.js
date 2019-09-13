import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../../helpers";
import "../../../assets/stylesheets/App.scss";

import OrderTable from "./OrderTable";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ConfirmOrder from "./ConfirmOrder";
import { connectToWeb3 } from "../../../dbController/init";
import {
  fetchRowsForCreatingPurchaseOrder,
  getRetailerDetails
} from "../../../dbController/retailerRole";
import Loader from "../../Loader";
import { getDistributorDetails } from "../../../dbController/distributorRole";

const CreateOrder = ({ location, history }) => {
  const [grandTotal, setGrandTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [productList, setProductList] = useState([]);
  const [retailerDetails, setRetailerDetails] = useState({});

  useEffect(() => {
    connectToWeb3().then(() => {
      let numRows = 0;
      let tempProductList = productList;
      fetchRowsForCreatingPurchaseOrder(
        "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20",
        (row, total) => {
          if (!row) {
            setLoader(false);
            return;
          }
          numRows++;
          if (row.currentState.value !== 5) {
            if (numRows === total) {
              setLoader(false);
            }
            return;
          }
          getDistributorDetails(row.details.distributorAddress).then(
            ({ companyName }) => {
              let obj = {
                id: row.uid,
                productName: row.details.productName,
                distributor: companyName,
                distributorAddress: row.details.distributorAddress,
                availableQuantity: row.details.totalPacketsManufactured,
                price: row.details.distributorToRetailerPrice
              };
              tempProductList.push(obj);
              setProductList([...tempProductList]);
              if (numRows === total) {
                setLoader(false);
              }
            }
          );
        }
      );
      getRetailerDetails().then(setRetailerDetails);
    });
  }, []);

  const updateProduct = (index, key, value) => {
    let newProductList = productList;
    newProductList[index][key] = value;
    setProductList(newProductList);

    // setProductList(newProductList)
  };

  return (
    <>
      <Layout location={location} history={history}>
        <Row>
          <Col>{setBreadcrumb(location.pathname)}</Col>
        </Row>
        <Row>
          <Col>
            <section className={"table-section card"}>
              <OrderTable
                productList={productList}
                updateProduct={(index, key, value) => {
                  updateProduct(index, key, value);
                }}
                setGrandTotal={arr => {
                  setGrandTotal(arr.reduce((a, b) => a + b, 0));
                }}
              />
              <Row>
                <Col md={12} className={"text-right"}>
                  <Button
                    onClick={() => {
                      if (
                        productList.filter(product => {
                          return product.orderedAmount;
                        }).length > 0
                      )
                        setShowModal(true);
                    }}
                  >
                    Create Order
                  </Button>
                  <Modal
                    size={"xl"}
                    show={showModal}
                    onHide={() => {
                      setShowModal(false);
                    }}
                  >
                    <ConfirmOrder
                      productList={productList.filter(product => {
                        return product.orderedAmount;
                      })}
                      header={retailerDetails}
                      closeModal={() => setShowModal(false)}
                      isUsedOnConfirm={true}
                      canPlace={false}
                    />
                  </Modal>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Layout>
      {loader ? <Loader message={"Fetching Data"} /> : null}
    </>
  );
};

export default CreateOrder;
