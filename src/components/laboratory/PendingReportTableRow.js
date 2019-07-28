import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReportForm from "./ReportForm";
const PendingReportTableRow = ({ values }) => {
    const [showModal, setShowModal] = useState(false)
  return (
    <>
      <tr>
        <td>{values.buid}</td>
        <td>{values.farmerName}</td>
        <td>{values.plantName}</td>
        <td>{values.amount}</td>
        <td>{values.dateHarvested}</td>
        <td>
          <Button onClick={()=>{setShowModal(true)}} >Upload</Button>
        </td>
      </tr>
      <Modal show={showModal} size={'xl'} onHide={()=>{setShowModal(false)}}>

        <Modal.Body>
            <ReportForm/>

        </Modal.Body>
      </Modal>
    </>
  );
};

export default PendingReportTableRow;
