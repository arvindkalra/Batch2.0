import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Notification from "../Notification";
import {
    plantDestroyedByFarmer,
    plantHarvestedByFarmer,
    sellHarvestByFarmer,
    sendToLaboratory
} from "../../dbController/farmerRole";
import {checkMined} from "../../dbController/init";

const ActionForm = ({
                        productState,
                        setProductStatus,
                        seedObj,
                        destroyRequested,
                        cancelDestroyRequest
                    }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [formFieldValue, setFormFieldValue] = useState("");
    const [labName, setLabName] = useState("Green Labs LLC");
    const [transporterName, setTransporterName] = useState("Transporter A");
    const [sellingPrice, setSellingPrice] = useState("");
    const [detroyQuantity, setDestroyQuantity] = useState(0);
    const [destroyCompanyName, setDestroyCompanyName] = useState("Company A");
    const [destroyReason, setDestroyReason] = useState("");
    const handleClick = (e, notificationMessage) => {
        e.preventDefault();
        e.stopPropagation();

        setNotificationMessage(notificationMessage);

        // setProductStatus({state: newState, progress: newProgress});
    };
    const sendHarvestReport = e => {
        e.preventDefault();
        e.stopPropagation();
        seedObj.details.harvestTime = new Date().toLocaleString();
        seedObj.details.totalHarvestAmount = formFieldValue;
        plantHarvestedByFarmer(seedObj.harvestUnitId, seedObj.details).then(
            hash => {
                setNotificationMessage(" the tx is mining");
                setShowNotification(true);
                checkMined(hash, () => {
                    setNotificationMessage(" the harvest report is submitted");

                    window.location.reload();
                });
            }
        );
    };

    const sendToLab = e => {
        e.preventDefault();
        e.stopPropagation();
        seedObj.details.sentToLabOn = new Date().toDateString();
        seedObj.details.laboratoryAddress =
            "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
        seedObj.details.farmToLabConsignmentTransporterAddress =
            "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
        sendToLaboratory(
            seedObj.harvestUnitId,
            "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
            "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
            seedObj.details
        ).then(hash => {
            setNotificationMessage(" tx mining");
            setShowNotification(true);
            checkMined(hash, () => {
                window.location.reload();
            });
        });
    };

    const sendToManufacturer = e => {
        e.preventDefault();
        e.stopPropagation();
        seedObj.details.sentToManufacturerOn = new Date().toLocaleString();
        seedObj.details.farmerToManufacturerPrice = sellingPrice;
        let transporter = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
        let manufacturer = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
        seedObj.details.manufacturerAddress = manufacturer;
        seedObj.details.farmToFactoryConsignmentTransporterAddress = transporter;
        sellHarvestByFarmer(
            seedObj.harvestUnitId,
            manufacturer,
            transporter,
            seedObj.details
        ).then(hash => {
            checkMined(hash, () => window.location.reload());
        });
    };
    // TODO: submit buttom disable on click until transaction hash is recived

    const destroyCrop = e => {
        e.preventDefault();
        e.stopPropagation();
        seedObj.details.quantarineCompanyName = destroyCompanyName;
        seedObj.details.destroyReason = destroyReason;
        seedObj.details.destroyQuantity = detroyQuantity;
        plantDestroyedByFarmer(seedObj.harvestUnitId, seedObj.details).then(
            hash => {
                checkMined(hash => window.location.reload());
            }
        );
    };

    const setForm = () => {
        if (destroyRequested) {
            return (
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type={"number"}
                                placeholder={"Enter the amount crop destroyed in pounds"}
                                onChange={e => {
                                    setDestroyQuantity(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                as={"select"}
                                onChange={e => {
                                    setDestroyCompanyName(e.target.value);
                                }}
                            >
                                <option>Company A</option>
                                <option>Company B</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Destroy Reason</Form.Label>
                            <Form.Control
                                type={"textarea"}
                                placeholder={"Enter the reason for destroying"}
                                onChange={e => {
                                    setDestroyReason(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button type={"submit"} onClick={destroyCrop}>
                            Destroy
                        </Button>
                    </Col>
                    <Col md={1}>
                        <Button
                            type={"submit"}
                            className={"btn-danger"}
                            onClick={cancelDestroyRequest}
                        >
                            Cancel
                        </Button>
                    </Col>
                </Row>
            );
        } else if (productState.value === 1) {
            return (
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Harvested Amount</Form.Label>
                            <Form.Control
                                type={"number"}
                                placeholder={"Enter the amount harvested in pounds"}
                                onChange={e => {
                                    setFormFieldValue(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Button type={"submit"} onClick={sendHarvestReport}>
                            Submit Report
                        </Button>
                    </Col>
                </Row>
            );
        }

        if (productState.value === 2) {
            return (
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Select Lab</Form.Label>
                            <Form.Control
                                as={"select"}
                                required
                                onChange={e => {
                                    setLabName(e.target.value);
                                }}
                            >
                                <option value="">Green Labs LLC</option>
                                <option value="">LIME Labs INC</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Select Transporter</Form.Label>
                            <Form.Control
                                as={"select"}
                                required
                                onChange={e => {
                                    setTransporterName(e.target.value);
                                }}
                            >
                                <option value="">Transporter A</option>
                                <option value="">Transporter B</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Button type={"submit"} onClick={sendToLab}>
                            Send To Lab
                        </Button>
                    </Col>
                </Row>
            );
        } else if (productState.value === 3) {
            return (
                <p>
                    Please wait for the lab tests before you can fill in a harvest report
                </p>
            );
        } else if (productState.value === 6) {
            return (
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type={"number"}
                                placeholder={"Enter the Selling Price"}
                                onChange={e => setSellingPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Select Manufacturer</Form.Label>
                            <Form.Control as={"select"} required>
                                <option value="">ABC</option>
                                <option value="">DEF</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Select Transporter</Form.Label>
                            <Form.Control as={"select"} required>
                                <option value="">EKart</option>
                                <option value="">Delhivery</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Button type={"submit"} onClick={sendToManufacturer}>
                            Send to Manufacturer
                        </Button>
                    </Col>
                </Row>
            );
        } else if (productState.value === 7) {
            return (
                <p>
                    This product has been successfully harvested and sent to the
                    manufacturer
                </p>
            );
        }
    };
    return (
        <Form>
            {setForm()}

            <Notification
                message={notificationMessage}
                show={showNotification}
                onClose={() => {
                    setShowNotification(false);
                }}
            />
        </Form>
    );
};

export default ActionForm;
