import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Card, Table } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { makeXHR, parsePurchaseOrderId } from "../../../helpers";

const ConfirmOrder = ({
  productList,
  header,
  closeModal,
  isUsedOnConfirm,
  sellOrder
}) => {
  const taxes = {
    stateSales: 3,
    stateExcise: 15,
    local: 5
  };
  const grandTotal = productList.reduce((a, b) => {
    return a + parseFloat(b.orderedAmount) * parseFloat(b.price);
  }, 0);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log(productList);
    let orders = productList.map(ele => {
      return {
        productUnitId: ele.id,
        amount: ele.orderedAmount
      };
    });
    let callObject = {
      distributorAddress: "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20",
      retailerAddress: "0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20",
      orderDate: new Date().toLocaleString(),
      orders
    };
    // console.log(callObject);
    makeXHR("POST", "createOrder", callObject).then(() => {
      closeModal();
      window.location.reload();
    });
  };
  // const [grandTotal, setGrandTotal] = useState(0);
  return (
    <main>
      <Card>
        <Card.Header>
          <div className="utils__title title-center">
            <strong className="text-uppercase">
              {isUsedOnConfirm ? "Confirm Purchase Order" : "Confirm Sale"}
            </strong>
          </div>
        </Card.Header>
        <Row>
          <Col md={6}>
            <h4>
              <strong>Business Name: {header.companyName}</strong>
              <br />
              Contact Person: {header.name}
            </h4>
            <address>
              {header.address}
              <br />
              <abbr title={"License Number"}>License:</abbr>{" "}
              {header.licenseNumber}
              <br />
              <abbr title={"License Type"}>Type:</abbr> {header.licenseType}
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
                    <th>{isUsedOnConfirm ? "Distributor" : "Retailer"}</th>
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
        <Card.Footer>
          <span>
            {isUsedOnConfirm ? (
              <Button variant={"success"} onClick={handleClick}>
                Place Order
              </Button>
            ) : (
              <Button
                variant={"success"}
                onClick={e => sellOrder(productList[0].index)}
              >
                Confirm Sale
              </Button>
            )}
          </span>
          <span>
            <Button variant={"danger"} onClick={closeModal}>
              Cancel
            </Button>
          </span>
        </Card.Footer>
      </Card>
    </main>
  );
};

export default ConfirmOrder;
