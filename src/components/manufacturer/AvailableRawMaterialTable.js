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
        {array.length > 2 ? (
          <Col md={12}>
            <Form.Group>
              <Form.Label>Sort By</Form.Label>
              <Form.Control as={"select"} onChange={sort}>
                <option value={"harvestUnitId|number"}>ID</option>
                <option value={"plantType|string"}>Plant Type</option>
                <option value={"pendingAmount|number"}>Pending Amount</option>
              </Form.Control>
            </Form.Group>
          </Col>
        ) : null}

        <Col md={12}>
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Plant Type</th>
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
                          {element.plantType}
                        </Link>
                      </span>
                    </td>
                    <td>{element.farmerName}</td>
                    <td>{element.pendingAmount} Kilograms</td>
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
