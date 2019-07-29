import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const AvailableRawMaterialTable = ({ array }) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Batch Id</th>
            <th>Farmer Name</th>
            <th>Plant Name</th>
          </tr>
        </thead>
        <tbody>
          {array.map((element, id) => {
            return (
              <tr key={id + "" + element.buid}>
                <td>{element.buid}</td>
                <td>
                  <Link to={`/manufacturer/harvests/${element.buid}`}>
                    {element.farmerName}
                  </Link>
                </td>
                <td><Link to={`/manufacturer/harvests/${element.buid}`}>
                  {element.plantName}
                </Link></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AvailableRawMaterialTable;
