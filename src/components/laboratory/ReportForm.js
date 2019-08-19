import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import LabBarGraph from "./LabBarGraph";
import {checkMined, connectToMetamask, OWN_ADDRESS} from "../../dbController/init";
import {uploadReport} from "../../dbController/laboratoryRole";
import Loader from "../Loader";
import {fileToString} from "../../helpers";

const ReportForm = ({formDetails}) => {
    console.log(formDetails.details);
    const [thc, setThc] = useState(0);
    const [cbd, setCbd] = useState(0);
    const [cannabinoids, setCannabinoids] = useState(0);
    const [labResult, setLabResult] = useState(true);
    const [physicalReport, setPhysicaReport] = useState('');
    const [transactionMining, setTrasactionMining] = useState(false);

    const handleFileUpload = e => {
        const file = e.target.files[0];
        fileToString(file).then(fileString => {
            setPhysicaReport(fileString)
        })
    };

    const handleSelect = e => {
        if (e.target.value === "Passed") {
            setLabResult(true);
        } else {
            setLabResult(false);
        }
    };
    const openFile = e => {
        e.target.download = 'test_download.pdf'
    };

    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
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
                labResult
            ).then(hash => {
                checkMined(hash, () => window.location.reload());
            });
        });
    };

    return (
        <section>
            <section className={"lab-header-section"}>
                <Row>
                    <Col md={6}>
                        <h1 className={"title"}>Green Labs LLC</h1>
                    </Col>
                    <Col md={6}>
                        <section className={"lab-details-section"}>
                            <p className={"lab-details"}>
                                1234 Market Street, San Francisco CA 94611
                            </p>
                            <p className={"lab-details"}>
                                Tel: <span> +91-987654321 </span> <br/>
                                Email:{" "}
                                <a href={"/"} target={"_blank"}>
                                    {" "}
                                    lab@example.com{" "}
                                </a>{" "}
                                <br/>
                                Website:{" "}
                                <a href={"/"} target={"_blank"}>
                                    {" "}
                                    www.example.com{" "}
                                </a>
                            </p>
                        </section>
                    </Col>
                </Row>
            </section>
            <section className={"lab-product-details-section"}>
                <Row>
                    <Col>
                        <ul>
                            <li>
                                Farmer: <span> Peter Williams</span>
                            </li>
                            <li>
                                License Number: # <span>LB123456</span>
                            </li>
                            <li>
                                Batch Id: # <span>00AABBCCDD</span>
                            </li>
                            <li>
                                {" "}
                                Sample Number: # <span>1</span>
                            </li>
                            <li>
                                Date Accepted: <span> 1/1/2019</span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </section>
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
                                        />
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
                                        />
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
                                        />
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

                                        {physicalReport ?
                                            <a href={physicalReport} target={'_blank'} onClick={openFile}>view report</a> :<>
                                                <Form.Label className={'custom-file-label'}>
                                                    Upload a Physical Report
                                                </Form.Label>

                                                <Form.Control className={'custom-file-input'} type={'file'}
                                                              onChange={handleFileUpload}
                                                />
                                            </>
                                        }

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
            {transactionMining ? <Loader/> : null}

        </section>
    );
};

export default ReportForm;
