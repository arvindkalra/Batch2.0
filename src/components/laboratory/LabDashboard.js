import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import '../../assets/stylesheets/laboratory.scss';
import PendingReportTable from "./PendingReportTable";
import AlreadyTestedReportTable from "./AlreadyTestedReportTable";
import ProgressBar from "react-bootstrap/ProgressBar";

const LabDashboard = props => {
  const [pendingReportsArray, setPendingReportsArray] = useState([]);
  const [testedReportsArray, setTestedReportsArray] = useState([]);
  const [numTested, setNumTested] = useState(1);
  const [numPending, setNumPending] = useState(0);
  const [numApproved, setNumApproved] = useState(0);
  useEffect(() => {
    console.log("use effect called");
    getRowsForLab();
  }, []);

  let getRowsForLab = () => {
    setPendingReportsArray([
      {
        buid: 1,
        farmerName: "Arvind Kalra",
        plantName: "Gundza",
        amount: 100,
        dateHarvested: "1st May"
      },
      {
        buid: 2,
        farmerName: "Arvind Kalra",

        plantName: "Gundza",
        amount: 100,
        dateHarvested: "1st May"
      },
      {
        buid: 3,
        farmerName: "Arvind Kalra",
        amount: 100,
        plantName: "Gundza",
        dateHarvested: "1st May"
      }
    ]);
    setTestedReportsArray([
      {
        buid: 1,
        plantName: "Gundza",
        farmerName: "Arvind Kalra",
        amount: 100,
        dateHarvested: "1st May",
        dateTested: "5th May",
        result: "Approved"
      },
      {
        buid: 1,
        farmerName: "Arvind Kalra",
        amount: 100,
        plantName: "Gundza",
        dateHarvested: "1st May",
        dateTested: "5th May",
        result: "Rejected"
      }
    ]);
    setNumPending(3);
    setNumTested(2);
    setNumApproved(1);
  };

  return (
    <>
      <Row>
        <Col>{setBreadcrumb(props.location.pathname)}</Col>
      </Row>

      <Row>
        <Col md={6}>
          <section className={"status-tab"}>
            <h3 className={"status-tab-title"}>Pending Status</h3>

            <ProgressBar
              now={(numPending / (numPending + numTested)) * 100}
              label={`${(numPending / (numPending + numTested)) * 100}%`}
            />
            <p className={"status-tab-description"}>
              {(numPending / (numPending + numTested)) * 100}% of plants are
              still pending to be tested
            </p>
          </section>
        </Col>
        <Col md={6}>
          <section className={"status-tab"}>
            <h3 className={"status-tab-title"}>Approved Status</h3>

            <ProgressBar
              now={(numApproved / numTested) * 100}
              label={`${(numApproved / numTested) * 100}%`}
            />
            <p className={"status-tab-description"}>
              {(numApproved / numTested) * 100}% of plants are approved and
              others are rejected
            </p>
          </section>
        </Col>
      </Row>

      {/*Two tables for report requests and already done*/}
      <Row>
        <Col>
          <section className={'report-table-section'}>
            <h3>Pending Requests</h3>
            <PendingReportTable array={pendingReportsArray} />
          </section>
        </Col>
      </Row>
      <Row>
        <Col>
          <section className={'report-table-section'}>
            <h3>Already Tested</h3>
            <AlreadyTestedReportTable array={testedReportsArray} />
          </section>
        </Col>
      </Row>
    </>
  );
};

export default LabDashboard;
