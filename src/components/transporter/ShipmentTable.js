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
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    let sortFunction;
    let temp = array;
    if (array.length > 0 && array[0]["dispatchTime"] === undefined) {
      sortFunction = createSortFunction("requestedAt", "string");
    } else {
      sortFunction = createSortFunction("dispatchTime", "string");
    }
    temp.sort(sortFunction);
    setViewableArray([...temp]);
    setShowSort(temp.length > 2);
  }, [array]);

  const sort = e => {
    let val = e.target.value;
    let isInc = val === "true";
    let temp = array;
    if (temp[0]["dispatchTime"] === undefined) {
      return;
    }
    let sortFunction = createSortFunction("dispatchTime", "string", isInc);
    temp.sort(sortFunction);
    setViewableArray([...temp]);
  };

  return (
    <>
      <Row>
        {showSort ? (
          <Col md={12}>
            <Form.Group>
              <Form.Label>Sort Order</Form.Label>
              <Form.Control as={"select"} onChange={sort}>
                <option value={"false"}>Latest First</option>
                <option value={"true"}>Oldest First</option>
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
                      index={id}
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
