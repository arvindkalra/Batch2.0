import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/es/Table";
import ShipmentRow from "./ShipmentRow";
import { Col, Form, Row } from "react-bootstrap";
import { createSortFunction } from "../../helpers";

const ShipmentTable = ({
  array,
  setTransactionMining,
  setTransactionObject,
  transporterDetails,
  tableType
}) => {
  const [viewableArray, setViewableArray] = useState([]);

  useEffect(() => {
    let sortFunction = createSortFunction("uid", "number");
    let temp = array;
    temp.sort(sortFunction);
    setViewableArray([...temp]);
  }, [array]);

  const sort = e => {
    let [key, type] = e.target.value.split("|");
    let sortFunction = createSortFunction(key, type);
    let temp = viewableArray;
    temp.sort(sortFunction);
    console.log(temp);
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
                <option value={"uid|number"}>ID</option>
                <option value={"dispatchTime|string"}>Dispatch Time</option>
              </Form.Control>
            </Form.Group>
          </Col>
        ) : null}
        <Col md={12}>
          <Table responsive>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Sender Name</th>
                <th>Receiver Name</th>
                <th>Dispatch Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {viewableArray.length === 0 ? (
                <tr className={"no-pending-shipment"}>
                  <td colSpan={7}>You do not have any pending shipments</td>
                </tr>
              ) : (
                viewableArray.map((element, id) => {
                  return (
                    <ShipmentRow
                      transporterDetails={transporterDetails}
                      tableType={tableType}
                      setTransactionMining={setTransactionMining}
                      setTransactionObject={setTransactionObject}
                      value={element}
                      key={id + "" + element.uid}
                      rowObj={element.ipfsData}
                      shipmentType={element.shipmentType}
                    />
                  );
                })
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default ShipmentTable;
