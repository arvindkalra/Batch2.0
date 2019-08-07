import React from "react";
import Modal from "react-bootstrap/Modal";
import QRCode from "qrcode.react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const QRCodeModal = ({show, setShow, value}) => {
    return (
        <Modal
            show={show}
            size={"xl"}
            onHide={() => {
                setShow();
            }}
        >
            <Modal.Header>
                <h1>
                    Batch QR Code
                </h1>

            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={12}>
                        <p className={'description'}>
                            Scan this QR code to explore the journey of this product over the Batch Supply chain, using
                            the Ethereum blockchain
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 6, offset: 3}}>

                        <div className={'qr-code-wrapper'}>

                            <QRCode value={value} size={400}/>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default QRCodeModal;
