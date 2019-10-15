import React, { useState, useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import {
  createPurchaseOrderId,
  makeXHR,
  parsePurchaseOrderId
} from "../../../helpers";
import { OWN_ADDRESS } from "../../../dbController/Web3Connections";
import { Link } from "react-router-dom";
import { convertFromHex, convertToHex } from "../../../dbController/init";
import config from "../../../config";

const OrderRow = ({ product, setAmount }) => {
  const [total, setTotal] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const [order, setOrder] = useState({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let callObj = {
      retailerAddress: OWN_ADDRESS,
      distributorAddress: config.ADDRESS,
      puid: convertFromHex(product.id)
    };
    makeXHR("POST", "getItemStatus", callObj).then(result => {
      if (result) {
        console.log(result);
        let url = createPurchaseOrderId(result.orderId, result.puid);
        setOrder({ url, amount: result.orderedAmount });
        setPending(true);
      }
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
            value={pending ? order.amount : product.amount}
            placeholder={"Units of this product to be ordered"}
            onChange={!pending ? handleInput : () => {}}
            isInvalid={!pending ? invalid : false}
            readOnly={pending}
          />
          <FormControl.Feedback type={"invalid"}>
            <strong>Required: </strong>Amount cant exceed available quantity
          </FormControl.Feedback>

          {pending ? (
            <span className={"warning"}>
              <i className="fas fa-exclamation-circle" /> &nbsp; A purchase
              order for this product has already been placed.{" "}
              <Link
                to={`/retailer/order/${convertToHex(
                  parsePurchaseOrderId(order.url)[0]
                )}`}
              >
                {" "}
                Click here
              </Link>{" "}
              to view
            </span>
          ) : null}
        </Form.Group>
      </td>
      <td>{product.availableQuantity}</td>
      <td>Rs {product.price}</td>
      <td>$ {total}</td>
    </tr>
  );
};

export default OrderRow;
