import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import { connectToWeb3 } from "../../dbController/init";
import { getSeedUnitDetails } from "../../dbController/farmerRole";
import Table from "react-bootstrap/Table";
import LabBarGraph from "./LabBarGraph";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Report = ({ location, match, history }) => {
  const [seedObject, setSeedObject] = useState({
    details: {},
    currentState: { value: "" }
  });

  const getTestResult = seedObject => {
    if (
      seedObject.currentState.value >= 6 &&
      seedObject.currentState.value <= 9
    ) {
      return "Approved";
    } else if (seedObject.currentState.value === 10) {
      return "Rejected";
    }
  };

  const downloadReport = e => {
    e.target.download = "report.pdf";
  };
  useEffect(() => {
    const buid = match.params.id;
    connectToWeb3().then(() => {
      getSeedUnitDetails(buid).then(seedObject => {
        setSeedObject(seedObject);
        console.log(seedObject);
      });
    });
  }, [match.params.id]);
  return (
    <Layout location={location} history={history}>
      <Row>
        <Col>
          {setBreadcrumb(
            `/laboratory/report/${seedObject.details.plantType || "Loading..."}`
          )}
        </Col>
      </Row>
      <section className={"product-details-section card"}>
        <div className={"card-header"}>
          <strong className={"utils__title"}>Plant Details</strong>
        </div>
        <Row>
          <Col md={6}>
            <section className={"product-image-section"}>
              {seedObject.details.plantImage ? (
                <img src={seedObject.details.plantImage} alt={""} />
              ) : (
                <img
                  src=""
                  alt="Loading"
                />
              )}
            </section>
          </Col>
          <Col md={6}>
            <section className={"product-info"}>
              <ul>
                <li>
                  <strong>Flowering Time:</strong>
                  <span>
                    {seedObject.details.floweringTime || "Loading..."}
                  </span>
                </li>
                <li>
                  <strong>Soil Type:</strong>
                  <span>{seedObject.details.soilType || "Loading..."}</span>
                </li>
              </ul>
            </section>
          </Col>
        </Row>
      </section>
      <Card>
        <div className={"card-header action-panel-head"}>
          <div className={"utils__title"}>
            <strong>Test Details</strong>
          </div>
        </div>
        <Row>
          <Col md={12}>
            <ul className={"horizontal-list"}>
              <li>
                <strong>Tested On</strong>
                <br />{" "}
                <span>
                  {" "}
                  {seedObject.details.testResults
                    ? seedObject.details.testResults.testedOn
                    : "Loading.."}
                </span>
              </li>
              <li>
                <strong>Sample Received on</strong>
                <br />{" "}
                <span>{seedObject.details.sentToLabOn || "Loading.."}</span>
              </li>

              <li>
                <strong>Test Result</strong>
                <br /> <span> {getTestResult(seedObject) || "Loading"} </span>
              </li>
            </ul>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col md={6}>
          <Card>
            <div className={"card-header action-panel-head"}>
              <div className={"utils__title"}>
                <strong>Test Report</strong>
              </div>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Result</th>
                  <th>Reference Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Crude Fibre (% by Mass)</td>
                  <td>
                    {" "}
                    {seedObject.details.testResults
                      ? seedObject.details.testResults.crudeFibre
                      : "Loading..."}{" "}
                  </td>
                  <td> >17%</td>
                </tr>
                <tr>
                  <td>Water Extract (% by Mass)</td>
                  <td>
                    {seedObject.details.testResults
                      ? seedObject.details.testResults.waterExtract
                      : "Loading..."}
                  </td>
                  <td> >32%</td>
                </tr>
                <tr>
                  <td>Water Soluble Ash (% by Mass)</td>
                  <td>
                    {seedObject.details.testResults
                      ? seedObject.details.testResults.waterSolubleAsh
                      : "Loading..."}
                  </td>
                  <td> >4%</td>
                </tr>
              </tbody>
            </Table>

            <p>
              <span> Notes:</span> <br />
            </p>
            <ul>
              <li>
                The sample was rejected because of dangerous levels of waterSolubleAsh and
                waterExtract found in it
              </li>
              <li>
                The sample color suggests untimely harvset due to which it
                cannot be sold in the market
              </li>
              <li>
                {" "}
                Attached Report:{" "}
                <a
                  href={
                    seedObject.details.testResults
                      ? seedObject.details.testResults.physicalReport
                      : "Loading..."
                  }
                  target={"_blank"}
                  onClick={downloadReport}
                >
                  Report
                </a>{" "}
              </li>
            </ul>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <div className={"card-header action-panel-head"}>
              <div className={"utils__title"}>
                <strong>Characteristics of the Sample</strong>
              </div>
            </div>

            <LabBarGraph
              labels={["Water Extract %", "Water Soluble Ash %", "Crude Fibre %"]}
              dataArray={[
                seedObject.details.testResults
                  ? seedObject.details.testResults.waterExtract
                  : 0,
                seedObject.details.testResults
                  ? seedObject.details.testResults.waterSolubleAsh
                  : 0,
                seedObject.details.testResults
                  ? seedObject.details.testResults.crudeFibre
                  : 0
              ]}
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Report;
