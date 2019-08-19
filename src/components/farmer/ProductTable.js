import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductTable = ({ rows, showForMore }) => {

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>Unit Id</th>
            <th>Product Name</th>
            <th>Date Planted</th>
            <th>Seeds Sown</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((element, id) => {
            return (
              <tr key={id}>
                <td>{element.harvestUnitId}</td>
                <td>
                  <Link to={`/cultivator/products/${element.harvestUnitId}`}>
                    {element.plantName}
                  </Link>
                </td>
                <td>{element.datePlanted.split(',')[0]}</td>
                <td>{element.seedCount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Row>
          <Col>
              <ul className={"table-links-list"}>
                  {showForMore ? (
                      <li>
                          <Link to={"/cultivator/products"}>See all harvests </Link>
                      </li>
                  ) : (
                      <></>
                  )}
                  <li>
                      <Button type={'primary'}>
                          <Link to={"/cultivator/add-new-harvest"}> Add a new Plant</Link>
                      </Button>
                  </li>
              </ul>
          </Col>
      </Row>
    </>
  );
};

export default ProductTable;
