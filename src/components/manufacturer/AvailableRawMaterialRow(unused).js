import React from "react";
import Button from "react-bootstrap/Button";

const AvailableRawMaterialRowUnused = ({ values }) => {
  return (
    <tr>
      <td>{values.buid}</td>
      <td>{values.farmerName}</td>
      <td>{values.plantName}</td>
      <td>{values.amountLeft}</td>
      <td>{values.dateHarvested}</td>
      <td>
        <Button>Create Packets</Button>
      </td>
    </tr>
  );
};

export default AvailableRawMaterialRowUnused;
