import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductTable = ({ rows }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          {rows.length !== 0 ? (
            <>
              <th>#ID</th>
              <th>Plant Type</th>
              <th>Date Planted</th>
              <th>Seeds Sown</th>
              <th>Current Status</th>
            </>
          ) : (
            <th>This table is Empty</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((element, id) => {
          return (
            <tr key={id}>
              <td className={"uid"}>{element.harvestUnitId}</td>
              <td>
                <span className={"under-linked"}>
                  <Link to={`/cultivator/products/${element.harvestUnitId}`}>
                    {element.plantType}
                  </Link>
                </span>
              </td>
              <td>{element.datePlanted.split(",")[0]}</td>
              <td>{element.seedCount}</td>
              <td>{element.currentState.status}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ProductTable;
