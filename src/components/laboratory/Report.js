import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import {connectToMetamask} from "../../dbController/init";
import {getSeedUnitDetails} from "../../dbController/farmerRole";
import Table from "react-bootstrap/Table";
import LabBarGraph from "./LabBarGraph";

const Report = ({location, match}) => {
    const [seedObject, setSeedObject] = useState({details: {}, currentState: {value: ''}});

    const getTestResult = seedObject => {
        if (seedObject.currentState.value >= 6 && seedObject.currentState.value <= 9) {
            return 'Approved'

        } else if (seedObject.currentState.value === 10) {
            return 'Rejected'
        }
    };

    const downloadReport =e => {
        e.target.download = 'report.pdf'
    }
    useEffect(() => {

        const buid = match.params.id;
        connectToMetamask().then(() => {
            getSeedUnitDetails(buid).then((seedObject) => {
                setSeedObject(seedObject);
                console.log(seedObject)

            })
        })
    }, [match.params.id]);
    return (
        <Layout location={location}>
            <Row>
                <Col>
                    {setBreadcrumb(location.pathname)}
                </Col>
            </Row>
            <section className={'product-details-section'}>
                <Row>
                    <Col md={3} className={'product-info-tab'}>
                        <h2>Lineage</h2>
                        <p>
                            {seedObject.details.lineage}
                        </p>
                    </Col>
                    <Col md={3} className={'product-info-tab'}>
                        <h2>Flowering Time</h2>
                        <p>
                            {seedObject.details.floweringTime}
                        </p>
                    </Col>

                    <Col md={{span: 3}} className={'product-info-tab'}>
                        <h2>Soil Type</h2>
                        <p>
                            {seedObject.details.soilType}
                        </p>
                    </Col>
                    <Col md={{span: 3}} className={'product-info-tab'}>
                        <h2>Nutrients</h2>
                        <p>
                            {seedObject.details.nutrients}
                        </p>
                    </Col>


                </Row>

            </section>
            <section className={'product-report-section'}>
                <Row>
                    <Col md={12}>
                        <h1>
                            Test Results
                        </h1>
                        <ul className={'horizontal-list'}>
                            <li>
                                Tested On <br/> <span>  {seedObject.details.testedOn}</span>
                            </li>
                            <li>
                                Sample Received on <br/> <span>{seedObject.details.sentToLabOn}</span>
                            </li>

                            <li>
                                Test Result <br/> <span> {getTestResult(seedObject)} </span>
                            </li>


                        </ul>

                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <section className={'report-details-section'}>

                            <h2>Test Report</h2>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>
                                        Test Name
                                    </th>
                                    <th>
                                        Result
                                    </th>
                                    <th>
                                        Reference Range
                                    </th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td> Cannabinoids</td>
                                    <td> {seedObject.details.cannabionoids} </td>
                                    <td> 4-5%</td>
                                </tr>
                                <tr>
                                    <td>
                                        THC Content
                                    </td>
                                    <td>
                                        {seedObject.details.thc}
                                    </td>
                                    <td>
                                        3-2%
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        CBD
                                    </td>
                                    <td>
                                        {seedObject.details.cbd}
                                    </td>
                                    <td>
                                        7-8%
                                    </td>
                                </tr>
                                </tbody>
                            </Table>


                            <p>
                                <span> Notes:</span> <br/>
                            </p>
                                <ul>
                                    <li>
                                        The sample was rejected because of dangerous levels of cbd and thc found in it

                                    </li>
                                    <li>
                                        The sample color suggests untimely harvset due to which it cannot be sold in the
                                        market
                                    </li>
                                    <li> Attached Report: <a href={seedObject.details.physicalReport} target={'_blank'} onClick={downloadReport}>Report</a>  </li>
                                </ul>


                        </section>
                    </Col>
                    <Col md={6}>
                        <section className={'report-graph-section'}>
                            <h2>
                                Molecular composition of the Sample
                            </h2>

                            <LabBarGraph
                                labels={["THC %", "CBD %", "Cannabinoids %"]}
                                dataArray={[seedObject.details.thc, seedObject.details.cbd, seedObject.details.cannabinoids]}
                            />
                        </section>
                    </Col>
                </Row>

            </section>

        </Layout>
    );
};

export default Report;

// cannabinoids: "12"
// cbd: "98"
// currentLocation: "Green House"
// datePlanted: "13/08/2019, 14:57:18"
// farmToLabConsignmentTransporterAddress: "0x8d41001644db97DC0F7120F977f6ED0357AE43F6"
// farmerAddress: "0x8d41001644db97DC0F7120F977f6ED0357AE43F6"
// floweringTime: "10-20 days"
// harvestTime: "Tue Aug 13 2019"
// labSampleConsignmentDeliveryTime: "13/08/2019, 16:01:34"
// labSampleConsignmentDispatchTime: "13/08/2019, 16:01:27"
// laboratoryAddress: "0x8d41001644db97DC0F7120F977f6ED0357AE43F6"
// lineage: "line1"
// nutrients: "Nutrient B"
// plantName: "Gundza"
// seedCount: 32
// sentToLabOn: "Tue Aug 13 2019"
// soilType: "Slightly Acidic"
// testedOn: "13/08/2019, 16:06:11"
// thc: "34"
// totalHarvestAmount: "34"
