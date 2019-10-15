import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import LabBarGraph from "./LabBarGraph";
import { checkMined, connectToWeb3 } from "../../dbController/init";
import {
  uploadPendingReportDetails,
  uploadReport
} from "../../dbController/laboratoryRole";
import Loader from "../Loader";
import { createTransactionModal, fileToString } from "../../helpers";
import { OWN_ADDRESS } from "../../dbController/Web3Connections";
import { Card, FormControl } from "react-bootstrap";
import { getFarmerDetails } from "../../dbController/farmerRole";

const ReportForm = ({ formDetails, labDetails }) => {
  // Report Form States
  const [waterExtract, setWaterExtract] = useState("");
  const [waterSolubleAsh, setWaterSolubleAsh] = useState("");
  const [crudeFibre, setCrudeFibre] = useState("");
  const [labResult, setLabResult] = useState(true);
  const [pending, setPending] = useState(true);
  const [physicalReport, setPhysicalReport] = useState("");

  const [farmerDetails, setFarmerDetails] = useState({});
  const [transactionMining, setTrasactionMining] = useState(false);
  const [transactionObject, setTransactionObject] = useState(null);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (formDetails.details.testResults) {
      let {
        waterExtract,
        waterSolubleAsh,
        crudeFibre,
        physicalReport
      } = formDetails.details.testResults;
      setWaterExtract(parseFloat(waterExtract));
      setWaterSolubleAsh(parseFloat(waterSolubleAsh));
      setCrudeFibre(parseFloat(crudeFibre));
      setPhysicalReport(physicalReport);
    }
    getFarmerDetails(formDetails.details.farmerAddress).then(setFarmerDetails);
  }, [formDetails]);

  const handleFileUpload = e => {
    const file = e.target.files[0];
    fileToString(file).then(fileString => {
      setPhysicalReport(fileString);
    });
  };

  const handleSelect = e => {
    if (e.target.value === "Passed") {
      setPending(false);
      setLabResult(true);
    } else if (e.target.value === "Pending") {
      setPending(true);
    } else {
      setPending(false);
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
    console.log(waterExtract, waterSolubleAsh, crudeFibre, pending);
    if (
      (waterExtract <= 0 ||
        waterExtract > 100 ||
        waterSolubleAsh <= 0 ||
        waterSolubleAsh > 100 ||
        crudeFibre <= 0 ||
        crudeFibre > 100 ||
        physicalReport.length === 0) &&
      pending === false
    ) {
      return;
    }
    setTrasactionMining(true);
    let details = formDetails.details;
    details.testResults = {
      waterExtract,
      waterSolubleAsh,
      crudeFibre,
      testedOn: new Date().toLocaleString(),
      physicalReport
    };
    if (pending) {
      connectToWeb3().then(() => {
        uploadPendingReportDetails(
          formDetails.uid,
          details,
          openSignatureModal
        ).then(hash => {
          checkMined(hash, () => window.location.reload());
        });
      });
    } else {
      connectToWeb3().then(() => {
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
    }
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
        <Card.Header>
          <div className="utils__title title-center">
            <strong className="text-uppercase">Upload Report</strong>
          </div>
        </Card.Header>
        <section className={"report-form-header"}>
          <Row>
            <Col md={6}>
              <h3>
                <strong>Business Name: {labDetails.companyName}</strong>
                <br />
              </h3>
              <h4>Contact Person: {labDetails.name}</h4>
              <address>
                {labDetails.address}
                <br />
                <abbr title={"License Number"}>License:</abbr>{" "}
                {labDetails.licenseNumber}
                <br />
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
                    <Form.Group controlId={"waterExtract-content"}>
                      <Form.Label>Water Extract (% by Mass)</Form.Label>
                      <Form.Control
                        min={"0"}
                        max={"100"}
                        type={"number"}
                        placeholder={"Enter the water extract content"}
                        value={waterExtract}
                        onChange={e => {
                          setWaterExtract(
                            parseFloat(
                              e.target.value === "" ? 0 : e.target.value
                            )
                          );
                        }}
                        isInvalid={
                          clicked && !pending ? waterExtract <= 0 || waterExtract > 100 : false
                        }
                      />
                      <FormControl.Feedback type={"invalid"}>
                        <strong>Required</strong> : Water Extract should be a valid
                        percentage
                      </FormControl.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId={"waterSolubleAsh-content"}>
                      <Form.Label>Water Soluble Ash (% by Mass)</Form.Label>
                      <Form.Control
                        min={"0"}
                        max={"100"}
                        type={"number"}
                        placeholder={"Enter the water soluble ash content"}
                        value={waterSolubleAsh}
                        onChange={e => {
                          setWaterSolubleAsh(
                            parseFloat(
                              e.target.value === "" ? 0 : e.target.value
                            )
                          );
                        }}
                        isInvalid={
                          clicked && !pending ? waterSolubleAsh <= 0 || waterSolubleAsh > 100 : false
                        }
                      />
                      <FormControl.Feedback type={"invalid"}>
                        <strong>Required</strong> : Water soluble ash should be a valid
                        percentage
                      </FormControl.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId={"waterExtract-content"}>
                      <Form.Label>Crude Fibre (% by Mass)</Form.Label>
                      <Form.Control
                        min={"0"}
                        max={"100"}
                        type={"number"}
                        value={crudeFibre}
                        placeholder={"Enter the crude fibre content"}
                        onChange={e => {
                          setCrudeFibre(
                            parseFloat(
                              e.target.value === "" ? 0 : e.target.value
                            )
                          );
                        }}
                        isInvalid={
                          clicked && !pending
                            ? crudeFibre <= 0 || crudeFibre > 100
                            : false
                        }
                      />
                      <FormControl.Feedback type={"invalid"}>
                        <strong>Required</strong> : Crude Fibre should be a
                        valid percentage
                      </FormControl.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId={"report-status"}>
                      <Form.Label>Test Result</Form.Label>
                      <Form.Control as={"select"} onChange={handleSelect}>
                        <option value={"Pending"}>Pending</option>
                        <option value={"Passed"}>Passed</option>
                        <option value={"Failed"}>Failed</option>
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
                              clicked && !pending
                                ? physicalReport.length === 0
                                : false
                            }
                          />
                          <FormControl.Feedback type={"invalid"}>
                            <strong>Required</strong>
                          </FormControl.Feedback>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Col>

            <Col md={8}>
              <LabBarGraph
                labels={["Water Extract %", "Water Soluble Ash %", "Crude Fibre %"]}
                dataArray={[waterExtract, waterSolubleAsh, crudeFibre]}
              />
            </Col>
          </Row>
        </section>
        <Card.Footer>
          <span>
            <Button type={"submit"} onClick={handleClick}>
              {" "}
              {pending ? "Save Draft" : "Submit Report"}{" "}
            </Button>
          </span>
        </Card.Footer>
      </Card>
      {transactionMining ? <Loader /> : null}
      {transactionObject ? createTransactionModal(transactionObject) : null}
    </>
  );
};

export default ReportForm;
