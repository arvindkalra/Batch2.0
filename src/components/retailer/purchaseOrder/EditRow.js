import React, { useState } from "react";
import { Button, Col, Form, FormControl } from "react-bootstrap";
import { makeXHR, parsePurchaseOrderId } from "../../../helpers";
import { connectToWeb3 } from "../../../dbController/init";
import { OWN_ADDRESS } from "../../../dbController/Web3Connections";
import config from "../../../config";
import "../../../assets/stylesheets/App.scss";
const EditRow = ({ index, order, distributorName }) => {
  const [total, setTotal] = useState(
    parseFloat(order.amount) * parseFloat(order.price)
  );
  const [amount, setAmount] = useState(order.amount);
  const [disabled, setDisabled] = useState(true);
  const [updateBtnDisabled, setUpdateBtnDisabled] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleUpdate = e => {
    setUpdateBtnDisabled(true);
    if (amount === "" || amount < 1) {
      alert("Enter a valid value for amount");
      return;
    }
    makeUpdateRequest({ url: order.url, amount }).then(() => {
      window.location.reload();
    });
  };

  const makeUpdateRequest = ({ url, amount }) => {
    return connectToWeb3().then(() => {
      let retailerAddress = OWN_ADDRESS;
      let [orderId, puid] = parsePurchaseOrderId(url);
      return makeXHR("PATCH", "editOrder", {
        retailerAddress,
        distributorAddress: config.ADDRESS,
        orderId,
        puid,
        amount
      });
    });
  };

  const handleChange = e => {
    let val = e.target.value;

    if (val !== "") {
      val = parseFloat(e.target.value);
      if (val > parseFloat(order.availableUnits)) {
        console.log("here");
        setIsInvalid(true);
        setUpdateBtnDisabled(true);
      } else {
        setIsInvalid(false);
        setUpdateBtnDisabled(false);
      }

      if (val === parseFloat(order.amount)) {
        setUpdateBtnDisabled(true);
      }
      setAmount(val);
      setTotal(val * parseFloat(order.price));
    } else {
      setAmount("");
      setTotal(0);
    }
  };

  return (
    <tr key={index}>
      <td>{order.url}</td>
      <td>{order.productName}</td>
      <td>{distributorName}</td>
      <td>
        <Form.Group>
          <Form.Row>
            <Col md={9}>
              <Form.Control
                min={1}
                type={"number"}
                placeholder={"Enter a new quantity "}
                value={amount}
                onChange={handleChange}
                disabled={disabled}
                isInvalid={isInvalid}
              />
              <FormControl.Feedback type={"invalid"}>
                <strong>Amount cant exceed available quantity</strong>
              </FormControl.Feedback>
            </Col>
            {order.currentState !== "Completed" ? (
              <>
                <Col md={1}>
                  <Button
                    onClick={() => {
                      setDisabled(false);
                    }}
                  >
                    Edit
                  </Button>
                </Col>
                <Col md={2}>
                  <Button disabled={updateBtnDisabled} onClick={handleUpdate}>
                    Update
                  </Button>
                </Col>
              </>
            ) : (
              <Col md={3}>
                {" "}
                <span className={"status-success"}>
                  {" "}
                  Order Already Completed
                </span>
              </Col>
            )}
          </Form.Row>
        </Form.Group>
        {/*{order.amount}*/}
      </td>
      <td>{order.availableUnits}</td>
      <td>{order.price}</td>
      <td>{total}</td>
    </tr>
  );
};
// edit button enabled
// when form value changes from original to sth else, update enabled
// on hover of disabled update button - " u have not changed the ordered amount"
export default EditRow;
