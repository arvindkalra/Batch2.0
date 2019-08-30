import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const RetailerProductTable = ({ rows }) => {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Product Name</th>
            <th>Units Available</th>
            <th>Product Type</th>
            <th>Container Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((element, id) => {
            return (
              <tr key={id}>
                <td>{element.batchUnitId}</td>
                <td>
                  <span className={"under-linked"}>
                    <Link to={`/retailer/products/${element.batchUnitId}`}>
                      {element.productName}
                    </Link>
                  </span>
                </td>
                <td>{element.left}</td>
                <td>{element.productType}</td>
                <td>{element.containerType}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default RetailerProductTable;
