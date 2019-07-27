import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Notification from "../Notification";

const ActionForm = ({productState, setProductStatus}) => {

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('')


    const handleClick = (e, newState, newProgress, notificationMessage) => {
        e.preventDefault();
        e.stopPropagation();
        setNotificationMessage(notificationMessage);
        setShowNotification(true);
        setProductStatus({state: newState, progress: newProgress});


    };
    const setForm = () => {
        if(productState === 'Sown'){
            return(

                <Row>
                    <Col md={12}>

                        <Form.Group>

                            <Form.Label>
                               Harvested Amount
                            </Form.Label>
                            <Form.Control type={'number'} placeholder={'Enter the amount harvested in pounds'} />

                        </Form.Group>


                    </Col>
                    <Col md={12}>
                        <Button type={'submit'} onClick={(e)=>{ handleClick(e, 'Harvested', 40, 'The harvest Report has been submitted ' )}}>
                            Submit Report

                        </Button>
                    </Col>
                </Row>
            )
        }

        if (productState === 'Harvested') {
            return (
                <Row>
                    <Col md={12}>

                        <Form.Group>

                            <Form.Label>
                                Select Lab
                            </Form.Label>
                            <Form.Control as={'select'} required>
                                <option value="">Green Labs LLC</option>
                                <option value="">LIME Labs INC</option>

                            </Form.Control>
                        </Form.Group>


                    </Col>
                    <Col md={12}>
                        <Button type={'submit'} onClick={(e)=>{ handleClick(e, 'Sent to Lab', 80, 'The sample has been sent to the lab' )}}>
                            Send To Lab

                        </Button>
                    </Col>
                </Row>
            )
        } else if (productState === 'Sent to Lab') {
            return (
                <p>
                    Please wait for the lab tests before you can fill in a harvest report
                </p>
            )
        }else if(productState === 'Lab Test Approved'){
            return(
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>
                                Select Manufacturer
                            </Form.Label>
                            <Form.Control as={'select'} required>
                                <option value="">ABC</option>
                                <option value="">DEF</option>

                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={12}>

                        <Button type={'submit'} onClick={(e)=>{ handleClick(e, 'Sent to Manufacturer', 100, 'The harvest has been sent to the manufacturer' )}}>
                            Send to Manufacturer

                        </Button>
                    </Col>
                </Row>

            )
        }else if(productState === 'Sent to Manufacturer'){
            return(
                <p>
                    This product has been successfully harvested and sent to the manufacturer
                </p>
            )
        }

    };
    return (
        <Form>
            {setForm()}

            <Notification message={notificationMessage} show={showNotification} onClose={() => {
                setShowNotification(false)
            }}/>

        </Form>
    );
};

export default ActionForm;
