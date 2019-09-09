import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import "../../assets/stylesheets/laboratory.scss";
import PendingReportTable from "./PendingReportTable";
import AlreadyTestedReportTable from "./AlreadyTestedReportTable";
import ProgressBar from "react-bootstrap/ProgressBar";
import { connectToWeb3 } from "../../dbController/init";
import {
  getLaboratoryDetails,
  getRowsForLaboratory
} from "../../dbController/laboratoryRole";
import { getFarmerDetails } from "../../dbController/farmerRole";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import PieChart1 from "./graphs/PieChart1";
import BarGraph from "../farmer/graphs/dashboard/BarGraph";
import Loader from "../Loader";
import Badge from "react-bootstrap/Badge";
import StackedBarGraph from "../transporter/StackedBarGraph";

const LabDashboard = props => {
  const [pendingReportsArray, setPendingReportsArray] = useState([]);
  const [incompleteReportsArray, setIncompleteReportsArray] = useState([]);
  const [testedReportsArray, setTestedReportsArray] = useState([]);
  const [numTested, setNumTested] = useState(0);
  const [numPending, setNumPending] = useState(0);
  const [numApproved, setNumApproved] = useState(0);
  const [seedObjArr, setSeedObjArr] = useState({});
  const [preloader, setPreloader] = useState(true);
  const [testPlantsGraphObject, setTestPlantsGraphObject] = useState({});
  const [changed, setChanged] = useState(0);
  const [objectForApprovedBarGraph] = useState({
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
  const [objectForRejectedBarGraph] = useState({
    Jan: 4,
    Feb: 7,
    Mar: 2,
    April: 10,
    June: 4,
    July: 8,
    Aug: 3,
    Sep: 0,
    Oct: 8,
    Nov: 2,
    Dec: 9
  });
  useEffect(() => {
    connectToWeb3().then(() => {
      let tempNumPending = numPending;
      let tempNumApproved = numApproved;
      let tempNumTested = numTested;
      let numRows = 0;
      let tempChanged = 0;
      let tempBarObject = testPlantsGraphObject;
      getRowsForLaboratory((row, total) => {
        if (row) {
          numRows++;
          let tempIncomplete = incompleteReportsArray;
          let tempPendingReports = pendingReportsArray;
          let tempTestedReports = testedReportsArray;
          let rowArr;
          getFarmerDetails(row.details.farmerAddress).then(({ name }) => {
            let tempSeedObjArr = seedObjArr;
            tempSeedObjArr[row.uid.toString()] = row;
            setSeedObjArr(tempSeedObjArr);

            addToGraphData(
              row.details.plantName,
              1,
              tempBarObject,
              setTestPlantsGraphObject,
              tempChanged
            );
            if (row.currentState.value === 5) {
              rowArr = [
                row.uid,
                name,
                row.details.plantName,
                row.details.totalHarvestAmount,
                row.details.sentToLabOn,
                "Upload Report"
              ];
              if (row.details.testResults) {
                tempIncomplete.push(rowArr);
                setIncompleteReportsArray([...tempIncomplete]);
              } else {
                tempPendingReports.push(rowArr);
                setPendingReportsArray([...tempPendingReports]);
              }
              setNumPending(++tempNumPending);
            } else if (row.currentState.value === 10) {
              rowArr = [
                row.uid,
                name,
                row.details.plantName,
                row.details.totalHarvestAmount,
                row.details.harvestTime,
                row.details.testResults.testedOn,
                "view report"
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
            } else if (row.currentState.value === 11) {
              tempNumTested += 1;
              setNumTested(tempNumTested);
            } else {
              rowArr = [
                row.uid,
                name,
                row.details.plantName,
                row.details.totalHarvestAmount,
                row.details.harvestTime,
                row.details.testResults.testedOn,

                "view report"
              ];
              tempTestedReports.push(rowArr);
              setTestedReportsArray([...tempTestedReports]);
              tempNumTested += 1;
              tempNumApproved += 1;
              setNumTested(tempNumTested);
              setNumApproved(tempNumApproved);
            }

            if (numRows === total) {
              setPreloader(false);
            }
          });
        } else {
          setPreloader(false);
        }
      });
    });
  }, []);

  function addToGraphData(which, howMuch, getter, setter, tempChanged) {
    let tempBarObject = getter;
    if (tempBarObject[which]) {
      let old = tempBarObject[which];
      tempBarObject[which] = old + howMuch;
    } else {
      if (howMuch > 0) {
        tempBarObject[which] = howMuch;
      }
    }
    setChanged(tempChanged);
    setter(tempBarObject);
  }

  return (
    <>
      <Row>
        <Col>{setBreadcrumb(props.location.pathname)}</Col>
      </Row>

      <Row>
        <Col md={12}>
          <section className={"status-tab card"}>
            <div className={"card-header"}>
              <strong className={"utils__title"}>Pending Tests</strong>
            </div>

            <ProgressBar
              style={{ height: "30px" }}
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
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                <strong className={"utils__title"}>
                  New Samples &nbsp;
                  {pendingReportsArray.length !== 0 ? (
                    <Badge pill variant="success">
                      New Samples for Test
                    </Badge>
                  ) : null}
                </strong>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <section className={"report-table-section"}>
                    {pendingReportsArray.length !== 0 ? (
                      <PendingReportTable
                        array={pendingReportsArray}
                        seedObjArr={seedObjArr}
                        labDetails={props.labDetails}
                      />
                    ) : (
                      <div>You Don't have any new samples to be tested</div>
                    )}
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                <strong className={"utils__title"}>
                  Pending Samples &nbsp;
                  {incompleteReportsArray.length !== 0 ? (
                    <Badge pill variant="success">
                      Pending Samples for Test
                    </Badge>
                  ) : null}
                </strong>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <section className={"report-table-section"}>
                    {incompleteReportsArray.length !== 0 ? (
                      <PendingReportTable
                        array={incompleteReportsArray}
                        seedObjArr={seedObjArr}
                        labDetails={props.labDetails}
                      />
                    ) : (
                      <div>You Don't have any samples pending to be tested</div>
                    )}
                  </section>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                <strong className={"utils__title"}>Completed Tests</strong>
              </Accordion.Toggle>

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
        <Col md={6} className={"chart-col"}>
          <section className="dashboard-section card">
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong>Crop Samples Received</strong>
              </div>
            </div>
            <BarGraph
              ObjectToShow={testPlantsGraphObject}
              label={"Crop Samples"}
            />
          </section>
        </Col>
        <Col md={6} className={"chart-col"}>
          <section className="dashboard-section card">
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong>Monthly Approval in Year 2018-19</strong>
              </div>
            </div>
            <StackedBarGraph
              row1={objectForApprovedBarGraph}
              row2={objectForRejectedBarGraph}
            />
          </section>
        </Col>
      </Row>
      {preloader ? <Loader message={"Fetching Data"} /> : null}
    </>
  );
};

export default LabDashboard;
