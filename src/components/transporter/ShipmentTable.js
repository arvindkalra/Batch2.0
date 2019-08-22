import React from "react";
import Table from "react-bootstrap/es/Table";
import ShipmentRow from "./ShipmentRow";

const ShipmentTable = ({
  array,
  rowObjArr,
  shipmentType,
  setTransactionMining,
  setTransactionObject
}) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Unique Identifier</th>
          <th>Sender Name</th>
          <th>Receiver Name</th>
          <th>Dispatch Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {array.length === 0 ? (
          <tr className={"no-pending-shipment"}>
            <td colSpan={7}>You do not have any pending shipments</td>
          </tr>
        ) : (
          array.map((element, id) => {
            return (
              <ShipmentRow
                setTransactionMining={setTransactionMining}
                setTransactionObject={setTransactionObject}
                value={element}
                key={id + "" + element.uid}
                rowObj={rowObjArr[element.uid]}
                shipmentType={shipmentType}
              />
            );
          })
        )}
      </tbody>
    </Table>
  );
};

export default ShipmentTable;
