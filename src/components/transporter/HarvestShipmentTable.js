import React from "react";
import Table from "react-bootstrap/Table";
import HarvestShipmentRow from "./HarvestShipmentRow";

const HarvestShipmentTable = ({ array, rowObjArr }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Batch Id</th>
          <th>Sender Name</th>
          <th>Receiver Name</th>
          <th>Amount</th>
          <th>Dispatch Time</th>
          <th>Current Status</th>
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
              <HarvestShipmentRow
                value={element}
                key={id + "" + element.buid}
                rowObj={rowObjArr[element.buid]}
              />
            );
          })
        )}
      </tbody>
    </Table>
  );
};

export default HarvestShipmentTable;
