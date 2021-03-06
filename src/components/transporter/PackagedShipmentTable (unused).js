import React from "react";
import Table from "react-bootstrap/Table";
import PackagedShipmentRowUnused from "./PackagedShipmentRow (unused)";

const PackagedShipmentTableUnused = ({ array, rowObjArr }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Packet Id</th>
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
              <PackagedShipmentRowUnused
                value={element}
                key={id + "" + element.uid}
                rowObj={rowObjArr[element.uid]}
              />
            );
          })
        )}
      </tbody>
    </Table>
  );
};

export default PackagedShipmentTableUnused;
