import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const PendingReportTableRow = ({ values }) => {
  return (
    <>
      <tr>
        <td>{values.buid}</td>
        <td>{values.farmerName}</td>
        <td>{values.plantName}</td>
        <td>{values.amount}</td>
        <td>{values.dateHarvested}</td>
        <td>
          <Button>Upload</Button>
        </td>
      </tr>
      <Modal>
        <Modal.Header>
          Upload Report Result for Batch Id : {values.buid}
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>
    </>
  );
};

export default PendingReportTableRow;
