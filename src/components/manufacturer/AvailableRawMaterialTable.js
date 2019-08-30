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
            <th>#ID</th>
            <th>Plant Name</th>
            <th>Cultivator</th>
            <th>Pending Amount</th>
          </tr>
        </thead>
        <tbody>
          {array.map((element, id) => {
            return (
              <tr key={id + "" + element.harvestUnitId}>
                <td className={"uid"}>{element.harvestUnitId}</td>
                <td>
                  <span className={"under-linked"}>
                    <Link to={`/manufacturer/harvest/${element.harvestUnitId}`}>
                      {element.plantName}
                    </Link>
                  </span>
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
