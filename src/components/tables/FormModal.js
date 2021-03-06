import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ReportForm from "../laboratory/ReportForm";
import Button from "react-bootstrap/Button";

const FormModal = ({ buttonText, formDetails, labDetails }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        {buttonText}{" "}
      </Button>
      <Modal
        show={showModal}
        size={"xl"}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <main>
          <ReportForm formDetails={formDetails} labDetails={labDetails} />
        </main>
      </Modal>
    </>
  );
};

export default FormModal;
