import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import QRCode from "qrcode.react";

const Invoice = ({ retailerDetails, productName, quantity, price, total }) => {
  return (
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
        <Col md={6} className={"invoice-qrcode text-right"}>
          <QRCode value={"hey"} size={100} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <section className={"table-section"}>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Cost</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{productName}</td>
                  <td>{quantity}</td>
                  <td>${price}.00</td>
                  <td>${total}.00</td>
                </tr>
              </tbody>
            </Table>
          </section>
        </Col>
      </Row>
      <Row>
        <Col md={12} className={"text-right"}>
          <p>
            Sub - Total Amount: <strong>${total}</strong>
          </p>
          <p>
            CA Excise Tax (15%): <strong>${(0.15 * total).toFixed(2)}</strong>
          </p>
          <p>
            CA Sales Tax (9.5%): <strong>${(0.095 * total).toFixed(2)}</strong>
          </p>
          <p>
            Los Angeles Adult Use Tax (5%): <strong>${(0.05 * total).toFixed(2)}</strong>
          </p>
          <p>
            Grand Total: <strong>${(0.295 * total + total).toFixed(2)}</strong>
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default Invoice;
