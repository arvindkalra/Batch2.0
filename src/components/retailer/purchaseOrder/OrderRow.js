import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";

const OrderRow = ({ product, setAmount }) => {
  const [total, setTotal] = useState(0);
  const [invalid, setInvalid] = useState(false);
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
            placeholder={"Amount"}
            onChange={handleInput}
            isInvalid={invalid}
          />
          <FormControl.Feedback type={"invalid"}>
            <strong> amount cant exceed available quantity</strong>
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
