import React from "react";
import TableLayout from "../tables/TableLayout";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const AvailableRawMaterialTable = ({ array }) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Plant Name</th>
            <th>Farmer Name</th>
            <th>Pending Amount</th>
          </tr>
        </thead>
        <tbody>
          {array.map((element, id) => {
            return (
              <tr key={id + "" + element.harvestUnitId}>
                <td>{element.harvestUnitId}</td>
                <td>
                  <Link to={`/manufacturer/harvest/${element.harvestUnitId}`}>
                    {element.plantName}
                  </Link>
                </td>
                <td>{element.farmerName}</td>
                <td>{element.pendingAmount} Pounds</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AvailableRawMaterialTable;
