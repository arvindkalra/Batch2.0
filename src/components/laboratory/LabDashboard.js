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
import PieChart1 from "../laboratory/graphs/PieChart1";
import BarGraph1 from "./graphs/barGraph1";

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
                getFarmerDetails(row.farmerAddress).then(({name}) => {
                    let tempSeedObjArr = seedObjArr;
                    tempSeedObjArr[row.uid.toString()] = row;
                    setSeedObjArr(tempSeedObjArr);

                    if (row.currentState === "Sent to Lab") {
                        rowArr = [
                            row.uid,
                            name,
                            row.details.plantName,
                            row.harvestAmount,
                            row.details.sentToLabOn,
                            "Upload Report"
                        ];
                        tempPendingReports.push(rowArr);
                        setPendingReportsArray([...tempPendingReports]);
                        tempNumPending = tempNumPending + 1;
                        setNumPending(tempNumPending);
                    } else if (row.currentState === "discarded") {
                        rowArr = [
                            row.uid,
                            name,
                            row.details.plantName,
                            row.harvestAmount,
                            row.details.harvestTime,
                            row.details.testedOn,
                            "Rejected"
                        ];
                        tempTestedReports.push(rowArr);
                        setTestedReportsArray([...tempTestedReports]);
                        tempNumTested += 1;
                        setNumTested(tempNumTested);
                    } else {
                        rowArr = [
                            row.uid,
                            name,
                            row.details.plantName,
                            row.harvestAmount,
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

    let getRowsForLab = () => {
        setPendingReportsArray([
            [1, "Arvind Kalra", "Gundza", 100, "1st May", "Upload Report"],
            [2, "Arvind Kalra", "Gundza", 100, "1st May", "Upload Report"],
            [3, "Arvind Kalra", 100, "Gundza", "1st May", "Upload Report"]
        ]);
        setTestedReportsArray([
            [1, "Arvind Kalra", "Gundza", 100, "1st May", "5th May", "Approved"],
            [1, "Arvind Kalra", "Gundza", 100, "1st May", "5th May", "Rejected"]
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

            {/*Two tables for report requests and already done*/}
            <Row>
                <Col md={6}>
                    <section className={"lab-dashboard-section"}>
                        <h3>Pending Tests</h3>
                        <PendingReportTable
                            array={pendingReportsArray}
                            seedObjArr={seedObjArr}
                        />
                    </section>
                </Col>
                <Col md={6}>
                    <section className={'lab-dashboard-section'}>
                        <h3> Tests Passed in Year 2018-2019 </h3>
                        <BarGraph1/>

                    </section>

                </Col>

                <Col md={6}>
                    <section className={'lab-dashboard-section'}>
                        <h3> Test Results </h3>
                        <PieChart1/>

                    </section>

                </Col>

                <Col md={6}>
                    <section className={"lab-dashboard-section"}>
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
