import React, { useState, useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import { createPurchaseOrderId, makeXHR } from "../../../helpers";
import { OWN_ADDRESS } from "../../../dbController/Web3Connections";

const OrderRow = ({ product, setAmount }) => {
  const [total, setTotal] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const [order, setOrder] = useState({});

  useEffect(() => {
    makeXHR(
      "GET",
      `order/get/pending?address=${product.distributorAddress}&productId=${product.id}`
    ).then(({ result }) => {
      result.forEach(order => {
        if (order.retailerAddress === OWN_ADDRESS) {
          let url = createPurchaseOrderId(
            order.purchaseOrderId,
            order.orderNumber
          );
          setOrder({
            url,
            amount: order.amount
          });
        }
      });
    });
  }, []);

  const handleInput = e => {
    const amount = parseFloat(e.target.value);
    const price = parseFloat(product.price);
    const availableQuantity = parseFloat(product.availableQuantity);
    let cost = 0;
    e.target.value !== "" ? (cost = price * amount) : (cost = 0);
    if (amount > availableQuantity) {
      setInvalid(true);
    } else {
      setTotal(cost);
      setAmount(cost, amount);
      setInvalid(false);
    }
  };
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.productName}</td>
      <td>{product.distributor}</td>
      <td>
        <Form.Group>
          <Form.Control
            type={"number"}
            min={0}
            value={order.amount}
            placeholder={"Amount"}
            onChange={!order.amount ? handleInput : () => {}}
            isInvalid={!order.amount ? invalid : false}
            isValid={order.amount}
            readOnly={order.amount}
          />
          <FormControl.Feedback type={"invalid"}>
            <strong>Required: </strong>Amount cant exceed available quantity
          </FormControl.Feedback>
          <FormControl.Feedback type={"valid"}>
            Purchase order for this product has already been made with id{" "}
            {order.url}{" "}
          </FormControl.Feedback>
        </Form.Group>
      </td>
      <td>{product.availableQuantity}</td>
      <td>$ {product.price}</td>
      <td>$ {total}</td>
    </tr>
  );
};

export default OrderRow;
