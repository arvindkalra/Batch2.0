import React from "react";
import Modal from "react-bootstrap/Modal";
import QRCode from "qrcode.react";

const QRCodeModal = ({ show, setShow, value }) => {
  return (
    <Modal
      show={show}
      size={"xl"}
      onHide={() => {
        setShow();
      }}
    >
      <Modal.Body>
          <div className={'qr-code-wrapper'}>

              <QRCode value={value} size={400}/>
          </div>
      </Modal.Body>
    </Modal>
  );
};

export default QRCodeModal;
