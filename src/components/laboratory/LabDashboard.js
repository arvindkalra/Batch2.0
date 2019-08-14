import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import "../../assets/stylesheets/laboratory.scss";
import PendingReportTable from "./PendingReportTable";
import AlreadyTestedReportTable from "./AlreadyTestedReportTable";
import ProgressBar from "react-bootstrap/ProgressBar";
import { connectToMetamask } from "../../dbController/init";
import { getRowsForLaboratory } from "../../dbController/laboratoryRole";
import { getFarmerDetails } from "../../dbController/farmerRole";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import PieChart1 from "./graphs/PieChart1";
import BarGraph from "../farmer/graphs/dashboard/BarGraph";

const LabDashboard = props => {
  const [pendingReportsArray, setPendingReportsArray] = useState([]);
  const [testedReportsArray, setTestedReportsArray] = useState([]);
  const [numTested, setNumTested] = useState(0);
  const [numPending, setNumPending] = useState(0);
  const [numApproved, setNumApproved] = useState(0);
  const [seedObjArr, setSeedObjArr] = useState({});
  const [objectForBarGraph, setObjectForBarGraph] = useState({
    Jan: 10,
    Feb: 12,
    Mar: 4,
    April: 23,
    June: 12,
    July: 14,
    Aug: 12,
    Sep: 3,
    Oct: 34,
    Nov: 15,
    Dec: 37
  });
  useEffect(() => {
    console.log("lab dash board use effect");
    connectToMetamask().then(() => {
      let tempNumPending = numPending;
      let tempNumApproved = numApproved;
      let tempNumTested = numTested;
      getRowsForLaboratory(row => {
        console.log(row);
        let tempPendingReports = pendingReportsArray;
        let tempTestedReports = testedReportsArray;
        let rowArr;
        getFarmerDetails(row.details.farmerAddress).then(({ name }) => {
          let tempSeedObjArr = seedObjArr;
          tempSeedObjArr[row.uid.toString()] = row;
          setSeedObjArr(tempSeedObjArr);

          if (row.currentState.value === 5) {
            rowArr = [
              row.uid,
              name,
              row.details.plantName,
              row.details.totalHarvestAmount,
              row.details.sentToLabOn,
              "Upload Report"
            ];
            tempPendingReports.push(rowArr);
            setPendingReportsArray([...tempPendingReports]);
            tempNumPending = tempNumPending + 1;
            setNumPending(tempNumPending);
          } else if (row.currentState.value === 10) {
            rowArr = [
              row.uid,
              name,
              row.details.plantName,
              row.details.totalHarvestAmount,
              row.details.harvestTime,
              row.details.testedOn,
              "Rejected"
            ];
            tempTestedReports.push(rowArr);
            setTestedReportsArray([...tempTestedReports]);
            tempNumTested += 1;
            setNumTested(tempNumTested);
          } else if (
            row.currentState.value === 3 ||
            row.currentState.value === 4
          ) {
            // do nothing
          } else {
            rowArr = [
              row.uid,
              name,
              row.details.plantName,
              row.details.totalHarvestAmount,
              row.details.harvestTime,
              row.details.testedOn,
              "Approved"
            ];
            tempTestedReports.push(rowArr);
            setTestedReportsArray([...tempTestedReports]);
            tempNumTested += 1;
            tempNumApproved += 1;
            setNumTested(tempNumTested);
            setNumApproved(tempNumApproved);
          }
        });

        // tempState.push(row);
        // setPendingReportsArray([...tempState]);
        // currentLocation: "Green House"
        // datePlanted: "12/1/2019"
        // floweringTime: "65 Days"
        // harvestTime: "Wed Jul 31 2019"
        // lineage: "Urkle"
        // nutrients: "homerJbio"
        // plantName: "Mango"
        // seedCount: "100"
        // sentToLabOn: "Wed Jul 31 2019"
        // soilType: "slightly acidic"
      });
    });
  }, []);

  return (
    <>
      <Row>
        <Col>{setBreadcrumb(props.location.pathname)}</Col>
      </Row>

      <Row>
        <Col md={12}>
          <section className={"status-tab"}>
            <ProgressBar
              now={
                numPending === 0
                  ? 0
                  : Math.round(
                      (numPending / (numPending + numTested)) * 100 * 100
                    ) / 100
              }
              label={`${
                numPending === 0
                  ? 0
                  : Math.round(
                      (numPending / (numPending + numTested)) * 100 * 100
                    ) / 100
              }%`}
              striped
            />
            <p className={"status-tab-description"}>
              {numPending} Plant Samples are Pending to be Tested
            </p>
          </section>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                  Pending Tests
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <section className={"report-table-section"}>
                    {pendingReportsArray.length !== 0 ? (
                      <PendingReportTable
                        array={pendingReportsArray}
                        seedObjArr={seedObjArr}
                      />
                    ) : (
                      <div>You Don't have any harvest samples to be tested</div>
                    )}
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                  Completed Tests
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <section className={"report-table-section"}>
                    {testedReportsArray.length !== 0 ? (
                      <AlreadyTestedReportTable
                        array={testedReportsArray}
                        seedObjArr={seedObjArr}
                      />
                    ) : (
                      <div>You Have Not Tested any Report Yet</div>
                    )}
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <section className={"status-tab"}>
            <h3 className={"status-tab-title"}>Approved Samples</h3>
            <PieChart1
              numRejected={numTested - numApproved}
              numApproved={numApproved}
            />
          </section>
        </Col>
        <Col md={6}>
          <section className={"status-tab"}>
            <h3 className={"status-tab-title"}>Monthly Approval in Year 2018-19</h3>
            <BarGraph ObjectToShow={objectForBarGraph} />
          </section>
        </Col>
      </Row>
      {/*Two tables for report requests and already done*/}
    </>
  );
};

export default LabDashboard;
