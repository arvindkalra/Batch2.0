import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import "../../assets/stylesheets/laboratory.scss";
import PendingReportTable from "./PendingReportTable";
import AlreadyTestedReportTable from "./AlreadyTestedReportTable";
import ProgressBar from "react-bootstrap/ProgressBar";
import {connectToMetamask} from "../../dbController/init";
import {getRowsForLaboratory} from "../../dbController/laboratoryRole";
import {getFarmerDetails} from "../../dbController/farmerRole";

const LabDashboard = props => {
    const [pendingReportsArray, setPendingReportsArray] = useState([]);
    const [testedReportsArray, setTestedReportsArray] = useState([]);
    const [numTested, setNumTested] = useState(0);
    const [numPending, setNumPending] = useState(0);
    const [numApproved, setNumApproved] = useState(0);
    const [seedObjArr, setSeedObjArr] = useState({});
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
                getFarmerDetails(row.details.farmerAddress).then(({name}) => {
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

                            'view report'
                        ];
                        tempTestedReports.push(rowArr);
                        setTestedReportsArray([...tempTestedReports]);
                        tempNumTested += 1;
                        setNumTested(tempNumTested);
                    } else if (row.currentState.value === 3 || row.currentState.value === 4) {
                        // do nothing
                    } else {
                        rowArr = [
                            row.uid,
                            name,
                            row.details.plantName,
                            row.details.totalHarvestAmount,
                            row.details.harvestTime,
                            row.details.testedOn,

                            'view report'
                        ];
                        tempTestedReports.push(rowArr);
                        setTestedReportsArray([...tempTestedReports]);
                        tempNumTested += 1;
                        tempNumApproved += 1;
                        setNumTested(tempNumTested);
                        setNumApproved(tempNumApproved);
                    }
                });

            });
        });
    }, []);

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
                        />
                        <p className={"status-tab-description"}>
                            {numPending === 0
                                ? 0
                                : Math.round(
                                (numPending / (numPending + numTested)) * 100 * 100
                            ) / 100}
                            % of tests are pending
                        </p>
                    </section>
                </Col>
                <Col md={6}>
                    <section className={"status-tab"}>
                        <h3 className={"status-tab-title"}>Approved Samples</h3>

                        <ProgressBar
                            now={
                                numApproved === 0
                                    ? 0
                                    : Math.round((numApproved / numTested) * 100 * 100) / 100
                            }
                            label={`${
                                numApproved === 0
                                    ? 0
                                    : Math.round((numApproved / numTested) * 100 * 100) / 100
                            }%`}
                        />
                        <p className={"status-tab-description"}>
                            {numApproved === 0
                                ? 0
                                : Math.round((numApproved / numTested) * 100 * 100) / 100}
                            % of the tested samples were approved
                        </p>
                    </section>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <section className={"report-table-section"}>
                        <h3>Pending Tests</h3>
                        <PendingReportTable
                            array={pendingReportsArray}
                            seedObjArr={seedObjArr}
                        />
                    </section>
                </Col>

                <Col md={6}>
                    <section className={"report-table-section"}>
                        <h3>Completed Tests</h3>
                        <AlreadyTestedReportTable
                            array={testedReportsArray}
                            seedObjArr={seedObjArr}
                        />
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default LabDashboard;
