import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const TakeAction = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <Button onClick={() => {
                setShowModal(true)
            }}>Take Action </Button>
            <Modal show={showModal} onHide={() => {
                setShowModal(false)
            }} size={'lg'}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Send Report To Lab
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>

                                <Form.Group>

                                    <Form.Label>
                                        Select Lab
                                    </Form.Label>
                                    <Form.Control as={'select'}>
                                        <option value="">Green Labs LLC</option>
                                        <option value="">LIME Labs INC</option>

                                    </Form.Control>
                                </Form.Group>


                            </Col>
                        </Row>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TakeAction;
