import React from "react";
import Table from "react-bootstrap/Table";

const ManufacturedPacketsTable = ({ array }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Packet Id</th>
          <th>Retailer Name</th>
          <th>Transporter Name</th>
          <th>Type</th>
          <th>Product Name</th>
          <th>Unit Size</th>
          <th>Number Of Units</th>
          <th>Current Status</th>
        </tr>
      </thead>
      <tbody>
        {array.map((element, id) => {
          return <tr key={id + "" + element.puid}>
              <td>{element.puid}</td>
              <td>{element.retailerName}</td>
              <td>{element.transporterName}</td>
              <td>{element.type}</td>
              <td>{element.productName}</td>
              <td>{element.unitSize}</td>
              <td>{element.totalUnits}</td>
              <td>{element.currentStatus}</td>
          </tr>;
        })}
      </tbody>
    </Table>
  );
};

export default ManufacturedPacketsTable;
