import React from "react";
import Table from "react-bootstrap/Table";

const ManufacturedPacketsTable = ({ array }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Packet Id</th>
          <th>Type</th>
          <th>Product Name</th>
        </tr>
      </thead>
      <tbody>
        {array.map((element, id) => {
          return (
            <tr key={id + "" + element.puid}>
              <td>{element.puid}</td>
              <td>{element.type}</td>
              <td>{element.productName}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ManufacturedPacketsTable;
