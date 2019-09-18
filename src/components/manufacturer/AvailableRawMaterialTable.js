import React, { useState, useEffect } from "react";
import TableLayout from "../tables/TableLayout";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import { createSortFunction } from "../../helpers";

const AvailableRawMaterialTable = ({ array }) => {
  const [viewableArray, setViewableArray] = useState([]);

  useEffect(() => {
    let sortFunction = createSortFunction("harvestUnitId", "number");
    let temp = array;
    temp.sort(sortFunction);
    setViewableArray([...temp]);
  }, [array]);

  const sort = e => {
    let [key, type] = e.target.value.split("|");
    let sortFunction = createSortFunction(key, type);
    let temp = viewableArray;
    temp.sort(sortFunction);
    setViewableArray([...temp]);
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Control as={"select"} onChange={sort}>
              <option value={"harvestUnitId|number"}>ID</option>
              <option value={"plantName|string"}>Plant Name</option>
              <option value={"pendingAmount|number"}>Pending Amount</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={12}>
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Plant Name</th>
                <th>Cultivator</th>
                <th>Pending Amount</th>
              </tr>
            </thead>
            <tbody>
              {viewableArray.map((element, id) => {
                return (
                  <tr key={id + "" + element.harvestUnitId}>
                    <td className={"uid"}>{element.harvestUnitId}</td>
                    <td>
                      <span className={"under-linked"}>
                        <Link
                          to={`/manufacturer/harvest/${element.harvestUnitId}`}
                        >
                          {element.plantName}
                        </Link>
                      </span>
                    </td>
                    <td>{element.farmerName}</td>
                    <td>{element.pendingAmount} Pounds</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default AvailableRawMaterialTable;
