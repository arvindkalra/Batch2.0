import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const AvailableUnitsTable = ({ array }) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Product Name</th>
            <th>Manufacturer Name</th>
            <th>Available Boxes</th>
          </tr>
        </thead>
        <tbody>
          {array.map((element, id) => {
            return (
              <tr key={id + "" + element.packetUnitId}>
                <td>{element.packetUnitId}</td>
                <td>
                  <span className={"under-linked"}>
                    <Link to={`/distributor/product/${element.packetUnitId}`}>
                      {element.productType}
                    </Link>
                  </span>
                </td>
                <td>{element.manufacturerName}</td>
                <td>{element.pendingAmount} Units</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AvailableUnitsTable;
