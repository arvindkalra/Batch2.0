import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Notification from "../Notification";
import {changeSeedState} from "../../helpers";
import {plantHarvestedByFarmer, sendToLaboratory} from "../../dbController/farmerRole";
import {checkMined} from "../../dbController/init";

const ActionForm = ({productState, setProductStatus, seedObj}) => {

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [formFieldValue, setFormFieldValue] = useState('');
    const [labName, setLabName] = useState('Green Labs LLC');


    const handleClick = (e, notificationMessage) => {
        e.preventDefault();
        e.stopPropagation();

        setNotificationMessage(notificationMessage);

        // setProductStatus({state: newState, progress: newProgress});


    };
    const sendHarvestReport = e => {
        e.preventDefault();
        e.stopPropagation();
        seedObj.details.harvestTime = new Date().toDateString();
        plantHarvestedByFarmer(formFieldValue, seedObj.buid, seedObj.details).then((hash)=>{
            setNotificationMessage(" the tx is mining");
            setShowNotification(true);
            checkMined(hash , ()=> {
            setNotificationMessage(" the harvest report is submitted")

            window.location.reload();

            })
        })
    }

    const sendToLab = e => {
        e.preventDefault();
        e.stopPropagation();
        seedObj.details.sentToLabOn = new Date().toDateString();
        sendToLaboratory(seedObj.buid,'0x627306090abaB3A6e1400e9345bC60c78a8BEf57', seedObj.details).then( hash => {
            setNotificationMessage(" tx mining");
            setShowNotification(true);
            checkMined(hash, ()=> {
                window.location.reload()
            })
        })
    };
    // TODO: submit buttom disable on click until transaction hash is recived

    const setForm = () => {
        if (productState === 'Sown') {
            return (

                <Row>
                    <Col md={12}>

                        <Form.Group>

                            <Form.Label>
                                Harvested Amount
                            </Form.Label>
                            <Form.Control type={'number'} placeholder={'Enter the amount harvested in pounds'} onChange={e =>{setFormFieldValue(e.target.value)}}
                            />

                        </Form.Group>


                    </Col>
                    <Col md={12}>
                        <Button type={'submit'} onClick={sendHarvestReport}>
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
                            <Form.Control as={'select'} required onChange={ e => {setLabName(e.target.value)}} >
                                <option value="">Green Labs LLC</option>
                                <option value="">LIME Labs INC</option>

                            </Form.Control>
                        </Form.Group>


                    </Col>
                    <Col md={12}>
                        <Button type={'submit'} onClick={sendToLab}>
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
        } else if (productState === 'Lab Test Approved') {
            return (
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

                        <Button type={'submit'} onClick={(e) => {
                            handleClick(e, 'Sent to Manufacturer', 100, 'The harvest has been sent to the manufacturer')
                        }}>
                            Send to Manufacturer

                        </Button>
                    </Col>
                </Row>

            )
        } else if (productState === 'Sent to Manufacturer') {
            return (
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
