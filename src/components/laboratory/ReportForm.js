import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import LabBarGraph from "./LabBarGraph";
import {checkMined, connectToMetamask} from "../../dbController/init";
import {uploadReport} from "../../dbController/laboratoryRole";
import Loader from "../Loader";
import {createTransactionModal, fileToString} from "../../helpers";
import {OWN_ADDRESS} from "../../dbController/Web3Connections";
import {Card, FormControl} from "react-bootstrap";
import {getFarmerDetails} from "../../dbController/farmerRole";

const ReportForm = ({formDetails, labDetails}) => {
    // Report Form States
    const [thc, setThc] = useState(0);
    const [cbd, setCbd] = useState(0);
    const [cannabinoids, setCannabinoids] = useState(0);
    const [labResult, setLabResult] = useState(true);
    const [physicalReport, setPhysicalReport] = useState("");

    const [farmerDetails, setFarmerDetails] = useState({});
    const [transactionMining, setTrasactionMining] = useState(false);
    const [transactionObject, setTransactionObject] = useState(null);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        getFarmerDetails(formDetails.details.farmerAddress).then(setFarmerDetails);
    }, []);

    const handleFileUpload = e => {
        const file = e.target.files[0];
        fileToString(file).then(fileString => {
            setPhysicalReport(fileString);
        });
    };

    const handleSelect = e => {
        if (e.target.value === "Passed") {
            setLabResult(true);
        } else {
            setLabResult(false);
        }
    };
    const openFile = e => {
        e.target.download = "test_download.pdf";
    };

    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        setClicked(true);
        if (
            thc <= 0 ||
            thc > 100 ||
            cbd <= 0 ||
            cbd > 100 ||
            cannabinoids <= 0 ||
            cannabinoids > 100 ||
            physicalReport.length === 0
        ) {
            return;
        }
        setTrasactionMining(true);
        let details = formDetails.details;
        details.thc = thc;
        details.cbd = cbd;
        details.cannabinoids = cannabinoids;
        details.testedOn = new Date().toLocaleString();
        details.physicalReport = physicalReport;
        console.log(labResult);
        connectToMetamask().then(() => {
            uploadReport(
                formDetails.uid,
                OWN_ADDRESS,
                details,
                labResult,
                openSignatureModal
            ).then(hash => {
                checkMined(hash, () => window.location.reload());
            });
        });
    };

    const openSignatureModal = obj => {
        setTransactionObject({
            ...obj,
            showModal: true,
            setShowModal: () => {
                setTransactionObject(null);
            },
            cancel: () => {
                setTrasactionMining(false);
                setTransactionObject(null);
            }
        });
    };

    return (
        <>
            <Card>
                <section className={"report-form-header"}>
                    <Row>
                        <Col md={6}>
                            <h3>
                                <strong>Business Name: {labDetails.companyName}</strong>
                                <br/>
                            </h3>
                            <h4>Contact Person: {labDetails.name}</h4>
                            <address>
                                {labDetails.address}
                                <br/>
                                <abbr title={"License Number"}>License:</abbr>{" "}
                                {labDetails.licenseNumber}
                                <br/>
                                <abbr title={"License Type"}>Type:</abbr>{" "}
                                {labDetails.licenseType}
                            </address>
                        </Col>
                        <Col md={6} className={"text-right"}>
                            <p>
                                <strong>Cultivator: </strong>
                                {farmerDetails.companyName || "Loading..."}
                            </p>
                            <p>
                                <strong>License Number: </strong>
                                {farmerDetails.licenseNumber || "Loading..."}
                            </p>
                            <p>
                                <strong>#ID: </strong>
                                {formDetails.uid}
                            </p>
                            <p>
                                <strong>Sample Number: </strong>
                                {"1"}
                            </p>
                            <p>
                                <strong>Date Accepted: </strong>
                                {formDetails.details.sentToLabOn}
                            </p>
                        </Col>
                    </Row>
                </section>
            </Card>
            <Card>
                <section className={"lab-report-form"}>
                    <Row>
                        <Col md={4}>
                            <Form>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId={"thc-content"}>
                                            <Form.Label>THC MAX</Form.Label>
                                            <Form.Control
                                                min={"0"}
                                                max={"100"}
                                                type={"number"}
                                                placeholder={"Enter the THC content"}
                                                onChange={e => {
                                                    setThc(parseInt(e.target.value));
                                                }}
                                                isInvalid={clicked ? thc <= 0 || thc > 100 : false}
                                            />
                                            <FormControl.Feedback type={"invalid"}>
                                                <strong>Required</strong> : THC should be a valid
                                                percentage
                                            </FormControl.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group controlId={"cbd-content"}>
                                            <Form.Label>CBDMAX</Form.Label>
                                            <Form.Control
                                                min={"0"}
                                                max={"100"}
                                                type={"number"}
                                                placeholder={"Enter the CBD content"}
                                                onChange={e => {
                                                    setCbd(parseInt(e.target.value));
                                                }}
                                                isInvalid={clicked ? cbd <= 0 || cbd > 100 : false}
                                            />
                                            <FormControl.Feedback type={"invalid"}>
                                                <strong>Required</strong> : CBD should be a valid
                                                percentage
                                            </FormControl.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group controlId={"thc-content"}>
                                            <Form.Label>Cannabiniods</Form.Label>
                                            <Form.Control
                                                min={"0"}
                                                max={"100"}
                                                type={"number"}
                                                placeholder={"Enter the Cannabiniods content"}
                                                onChange={e => {
                                                    setCannabinoids(parseInt(e.target.value));
                                                }}
                                                isInvalid={
                                                    clicked
                                                        ? cannabinoids <= 0 || cannabinoids > 100
                                                        : false
                                                }
                                            />
                                            <FormControl.Feedback type={"invalid"}>
                                                <strong>Required</strong> : Cannabinoids should be a
                                                valid percentage
                                            </FormControl.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group controlId={"report-status"}>
                                            <Form.Label>Test Result</Form.Label>
                                            <Form.Control as={"select"} onClick={handleSelect}>
                                                <option value="">Passed</option>
                                                <option value="">Failed</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group>
                                            {physicalReport ? (
                                                <a
                                                    href={physicalReport}
                                                    target={"_blank"}
                                                    onClick={openFile}
                                                >
                                                    view report
                                                </a>
                                            ) : (
                                                <>
                                                    <Form.Label className={"custom-file-label"}>
                                                        Upload a Physical Report
                                                    </Form.Label>

                                                    <Form.Control
                                                        className={"custom-file-input"}
                                                        type={"file"}
                                                        onChange={handleFileUpload}
                                                        isInvalid={
                                                            clicked ? physicalReport.length === 0 : false
                                                        }
                                                    />
                                                    <FormControl.Feedback type={"invalid"}>
                                                        <strong>Required</strong>
                                                    </FormControl.Feedback>
                                                </>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Button type={"submit"} onClick={handleClick}>
                                            {" "}
                                            Submit Report{" "}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>

                        <Col md={8}>
                            <LabBarGraph
                                labels={["THC %", "CBD %", "Cannabinoids %"]}
                                dataArray={[thc, cbd, cannabinoids]}
                            />
                        </Col>
                    </Row>
                </section>
            </Card>
            {transactionMining ? <Loader/> : null}
            {transactionObject ? createTransactionModal(transactionObject) : null}
            {/*<Row>*/}
            {/*  <Col md={6}>*/}
            {/*    <h1 className={"title"}>Green Labs LLC</h1>*/}
            {/*  </Col>*/}
            {/*  <Col md={6}>*/}
            {/*    <section className={"lab-details-section"}>*/}
            {/*      <p className={"lab-details"}>*/}
            {/*        1234 Market Street, San Francisco CA 94611*/}
            {/*      </p>*/}
            {/*      <p className={"lab-details"}>*/}
            {/*        Tel: <span> +91-987654321 </span> <br />*/}
            {/*        Email:{" "}*/}
            {/*        <a href={"/"} target={"_blank"}>*/}
            {/*          {" "}*/}
            {/*          lab@example.com{" "}*/}
            {/*        </a>{" "}*/}
            {/*        <br />*/}
            {/*        Website:{" "}*/}
            {/*        <a href={"/"} target={"_blank"}>*/}
            {/*          {" "}*/}
            {/*          www.example.com{" "}*/}
            {/*        </a>*/}
            {/*      </p>*/}
            {/*    </section>*/}
            {/*  </Col>*/}
            {/*</Row>*/}
        </>
    );
};

export default ReportForm;
