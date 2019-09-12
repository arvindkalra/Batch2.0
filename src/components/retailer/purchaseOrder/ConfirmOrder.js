import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Card, Table } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { makeXHR } from "../../../helpers";
import { OWN_ADDRESS } from "../../../dbController/Web3Connections";

const ConfirmOrder = ({ productList, retailerDetails, closeModal }) => {
  const taxes = {
    stateSales: 3,
    stateExcise: 15,
    local: 5
  };
  const grandTotal = productList.reduce((a, b) => {
    console.log(a, b);
    return a + parseFloat(b.orderedAmount) * parseFloat(b.price);
  }, 0);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    let orders = productList.map(ele => {
      return {
        retailerAddress: OWN_ADDRESS,
        distributorAddress: ele.distributorAddress,
        productUnitId: ele.id,
        amount: ele.orderedAmount
      };
    });
    let callObj = {
      orders
    };
    makeXHR("POST", "createOrder", callObj).then(() => {
      closeModal();
      window.location.reload();
    });
  };
  // const [grandTotal, setGrandTotal] = useState(0);
  return (
    <main>
      <Modal.Header>
        <h1 className="title-center">Confirm Purchase Order</h1>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Row>
            <Col md={6}>
              <h4>
                <strong>Business Name: {retailerDetails.companyName}</strong>
                <br />
                Contact Person: {retailerDetails.name}
              </h4>
              <address>
                {retailerDetails.address}
                <br />
                <abbr title={"License Number"}>License:</abbr>{" "}
                {retailerDetails.licenseNumber}
                <br />
                <abbr title={"License Type"}>Type:</abbr>{" "}
                {retailerDetails.licenseType}
              </address>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <section>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Product Id</th>
                      <th>Product Name</th>
                      <th>Distributor</th>
                      <th>Quantity</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>{product.id}</td>
                          <td>{product.productName}</td>
                          <td>{product.distributor}</td>
                          <td>{product.orderedAmount}</td>
                          <td>{product.orderedAmount * product.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </section>
            </Col>
          </Row>
          <Row>
            <Col md={12} className={"text-right"}>
              <p>
                Sub - Total Amount: <strong>$ {grandTotal}</strong>
              </p>
              <p>
                State Excise (15%):{" "}
                <strong>$ {(grandTotal * taxes.stateExcise) / 100} </strong>
              </p>
              <p>
                State Sales Tax (3%):{" "}
                <strong>$ {(grandTotal * taxes.stateSales) / 100}</strong>
              </p>
              <p>
                Local Tax (5%):{" "}
                <strong>$ {(grandTotal * taxes.local) / 100}</strong>
              </p>
              <p>
                Grand Total:{" "}
                <strong>
                  ${" "}
                  {grandTotal +
                    (grandTotal * taxes.stateExcise) / 100 +
                    (grandTotal * taxes.stateSales) / 100 +
                    (grandTotal * taxes.local) / 100}
                </strong>
              </p>
            </Col>
          </Row>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"success"} onClick={handleClick}>
          Place Order
        </Button>
        <Button variant={"danger"} onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </main>
  );
};

export default ConfirmOrder;
