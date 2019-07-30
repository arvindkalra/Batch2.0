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

    getRowsForLab();
  }, []);

  let getRowsForLab = () => {
    setPendingReportsArray([
      [
        1,
        "Arvind Kalra",
        "Gundza",
        100,
        "1st May",
          "Upload Report"
      ],
      [
        2,
        "Arvind Kalra",
        "Gundza",
        100,
        "1st May",
        "Upload Report"
      ],
      [
        3,
        "Arvind Kalra",
        100,
        "Gundza",
        "1st May",
        "Upload Report"
      ]
    ]);
    setTestedReportsArray([
      [
        1,
        "Arvind Kalra",
        "Gundza",
        100,
        "1st May",
        "5th May",
        "Approved"
      ],
      [
        1,
        "Arvind Kalra",
        "Gundza",
        100,
        "1st May",
        "5th May",
        "Rejected"
      ]
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
            <h3 className={"status-tab-title"}>Pending Tests</h3>

            <ProgressBar
              now={(numPending / (numPending + numTested)) * 100}
              label={`${(numPending / (numPending + numTested)) * 100}%`}
            />
            <p className={"status-tab-description"}>
              {(numPending / (numPending + numTested)) * 100}% of tests are pending
            </p>
          </section>
        </Col>
        <Col md={6}>
          <section className={"status-tab"}>
            <h3 className={"status-tab-title"}>Approved Samples</h3>

            <ProgressBar
              now={(numApproved / numTested) * 100}
              label={`${(numApproved / numTested) * 100}%`}
            />
            <p className={"status-tab-description"}>
              {(numApproved / numTested) * 100}% of the tested samples were approved
            </p>
          </section>
        </Col>
      </Row>

      {/*Two tables for report requests and already done*/}
      <Row>
        <Col md={6}>
          <section className={'report-table-section'}>
            <h3>Pending Tests</h3>
            <PendingReportTable array={pendingReportsArray}  seedObj />
          </section>
        </Col>

        <Col md={6}>
          <section className={'report-table-section'}>
            <h3>Completed Tests</h3>
            <AlreadyTestedReportTable array={testedReportsArray}  />
          </section>
        </Col>
      </Row>

    </>
  );
};

export default LabDashboard;
