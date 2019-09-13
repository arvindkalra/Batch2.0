import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ConfirmOrder from "../retailer/purchaseOrder/ConfirmOrder";
import Modal from "react-bootstrap/Modal";

const PurchaseOrderTable = ({ array, productDetail, distributorDetail }) => {
  const [showModal, setShowModal] = useState(false);
  const [orderList, setOrderList] = useState(true);

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
    console.log("here", index);
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
                  <Button onClick={e => handleClick(e, key)}>Sell</Button>
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
    </>
  );
};

export default PurchaseOrderTable;
