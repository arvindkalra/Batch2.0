import React from "react";
import Table from "react-bootstrap/es/Table";
import PackagedShipmentRow from "./PackagedShipmentRow";

const PackagedShipmentTable = ({ array, rowObjArr }) => {
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
        {array.map((element, id) => {
          return (
            <PackagedShipmentRow value={element} key={id + "" + element.puid} rowObj={rowObjArr[element.puid]}/>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PackagedShipmentTable;
