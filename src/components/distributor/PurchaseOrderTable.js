import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ConfirmOrder from "../retailer/purchaseOrder/ConfirmOrder";
import Modal from "react-bootstrap/Modal";
import config from "../../config";
import Loader from "../Loader";
import {
  createTransactionModal,
  makeXHR,
  parsePurchaseOrderId
} from "../../helpers";
import Col from "react-bootstrap/Col";
import { createBatchByDistributor } from "../../dbController/distributorRole";
import { checkMined } from "../../dbController/init";

const PurchaseOrderTable = ({
  array,
  productDetail,
  distributorDetail,
  untouchedDetail,
  history
}) => {
  const [showModal, setShowModal] = useState(false);
  const [orderList, setOrderList] = useState(true);

  const [transactionMining, setTransactionMining] = useState(false);
  const [transactionObject, setTransactionObject] = useState(null);

  const handleClick = (e, orderId) => {
    let arr = [
      {
        id: array[orderId].purchaseOrderId,
        productName: productDetail.productName,
        distributor: array[orderId].retailerName,
        orderedAmount: array[orderId].orderAmount,
        price: productDetail.distributorToRetailerPrice,
        index: orderId
      }
    ];
    setOrderList(arr);
    setShowModal(true);
  };

  const handleSale = index => {
    let [orderId, puid] = parsePurchaseOrderId(array[index].purchaseOrderId);
    let batchObject = {
      totalUnitsForSale: array[index].orderAmount,
      sentToRetailerOn: new Date().toLocaleString(),
      productUnitId: productDetail.puid,
      distributorAddress: config.ADDRESS,
      distributorToRetailerTransporter: config.ADDRESS,
      retailerAddress: config.ADDRESS
    };
    let newProductDetail = untouchedDetail;
    let oldUnitsUsed = newProductDetail.totalPacketsUsed
      ? newProductDetail.totalPacketsUsed
      : 0;
    newProductDetail.totalPacketsUsed =
      parseInt(oldUnitsUsed) + batchObject.totalUnitsForSale;
    setShowModal(false);
    setTransactionMining(true);
    createBatchByDistributor(
      batchObject.productUnitId,
      newProductDetail,
      batchObject,
      batchObject.retailerAddress,
      batchObject.distributorToRetailerTransporter,
      orderId,
      openSignatureModal
    ).then(hash => {
      checkMined(hash, () => {
        makeXHR("POST", "completeOrder", { transactionHash: hash }).then(() => {
          history.push("/distributor/dashboard");
        });
      });
    });
  };

  const openSignatureModal = obj => {
    setTransactionObject({
      ...obj,
      showModal: true,
      setShowModal: () => {
        setTransactionObject(null);
      },
      cancel: () => {
        setTransactionMining(false);
        setTransactionObject(null);
      }
    });
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Purchase Order ID</th>
            <th>Retailer Name</th>
            <th>Retailer Company</th>
            <th>Order Date</th>
            <th>Order Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {array.map((ele, key) => {
            return (
              <tr key={key}>
                <td>{ele.purchaseOrderId}</td>
                <td>{ele.retailerName}</td>
                <td>{ele.retailerCompany}</td>
                <td>{ele.orderDate}</td>
                <td>{ele.orderAmount}</td>
                <td>
                  {ele.possible ? (
                    <Button onClick={e => handleClick(e, key)}>
                      Sell Units
                    </Button>
                  ) : (
                    <Button variant={"secondary"} disabled={true}>
                      Not Enough
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal
        size={"xl"}
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <ConfirmOrder
          productList={orderList}
          header={distributorDetail}
          closeModal={() => setShowModal(false)}
          isUsedOnConfirm={false}
          sellOrder={handleSale}
        />
      </Modal>
      {transactionMining ? <Loader /> : null}
      {transactionObject ? createTransactionModal(transactionObject) : null}
    </>
  );
};

export default PurchaseOrderTable;
