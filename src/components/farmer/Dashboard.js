import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

import ProductTable from "./ProductTable";
import BarGraph from "./graphs/dashboard/BarGraph";
import { setBreadcrumb } from "../../helpers";
import PieChart1 from "./graphs/dashboard/PieChart1";
import PieChart2 from "./graphs/dashboard/PieChart2";
import PieChart3 from "./graphs/dashboard/PieChart3";
import { getRowsForFarmer } from "../../dbController/farmerRole";
import { connectToWeb3 } from "../../dbController/init";
import Notification from "../Notification";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import PendingReportTable from "../laboratory/PendingReportTable";
import AlreadyTestedReportTable from "../laboratory/AlreadyTestedReportTable";

const Dashboard = props => {
  const [sownArray, setSownArray] = useState([]);
  const [harvestedArray, setHarvestedArray] = useState([]);
  const [testedArray, setTestedArray] = useState([]);
  const [soldArray, setSoldArray] = useState([]);
  const [destroyedArray, setDestroyedArray] = useState([]);
  const [barGraphObject, setBarGraphObject] = useState({});
  const [numSown, setNumSown] = useState(0);
  const [numHarvested, setNumHarvested] = useState(0);
  const [numSold, setNumSold] = useState(0);
  const [numToBeTested, setNumToBeTested] = useState(0);
  const [numApproved, setNumApproved] = useState(0);
  const [numRejected, setNumRejected] = useState(0);
  const [numDiscarded, setNumDiscarded] = useState(0);
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    connectToWeb3().then(setData);
  }, []);

  function setData() {
    let tableRows = 0;
    let tempSown = sownArray;
    let tempHarvested = harvestedArray;
    let tempTested = testedArray;
    let tempSold = soldArray;
    let tempDestroyed = destroyedArray;
    let tempStatusObj = {
      numSown: 0,
      numHarvested: 0,
      numSold: 0,
      numApproved: 0,
      numRejected: 0,
      numDiscarded: 0,
      numToBeTested: 0
    };
    getRowsForFarmer((rowObject, total) => {
      if (rowObject) {
        tableRows++;
        let objToBeAdded = {
          harvestUnitId: rowObject.harvestUnitId,
          plantName: rowObject.details.plantName,
          datePlanted: rowObject.details.datePlanted,
          seedCount: rowObject.details.seedCount,
          currentState: rowObject.currentState
        };
        addToBarObject(
          objToBeAdded.plantName,
          parseInt(objToBeAdded.seedCount)
        );
        tempStatusObj = setNumStatusObject(
          rowObject.currentState.value,
          tempStatusObj
        );
        addToAppropriateArray(
          tempSown,
          tempHarvested,
          tempTested,
          tempSold,
          tempDestroyed,
          objToBeAdded
        );
      }
      if (tableRows === total) {
        setPreloader(false);
      }
    });
  }

  function addToAppropriateArray(
    tempSown,
    tempHarvested,
    tempTested,
    tempSold,
    tempDestroyed,
    current
  ) {
    let stateValue = current.currentState.value;
    switch (stateValue) {
      case 1:
        tempSown.push(current);
        setSownArray([...tempSown]);
        return;

      case 2:
      case 3:
      case 4:
      case 5:
        tempHarvested.push(current);
        setHarvestedArray([...tempHarvested]);
        return;

      case 6:
      case 10:
        tempTested.push(current);
        setTestedArray([...tempTested]);
        return;

      case 7:
      case 8:
      case 9:
        tempSold.push(current);
        setSoldArray([...tempSold]);
        return;

      case 11:
        tempDestroyed.push(current);
        setDestroyedArray([...tempDestroyed]);
        return;

      default:
        console.log("Entered the default case of addToAppropriate");
        return;
    }
  }

  function setNumStatusObject(statusValue, obj) {
    switch (statusValue) {
      case 1:
        obj.numSown += 1;
        setNumSown(obj.numSown);
        return obj;

      case 2:
        obj.numToBeTested += 1;
        obj.numHarvested += 1;
        setNumToBeTested(obj.numToBeTested);
        setNumHarvested(obj.numHarvested);

      case 3:
      case 4:
      case 5:
        obj.numHarvested += 1;
        setNumHarvested(obj.numHarvested);
        return obj;

      case 6:
        obj.numHarvested += 1;
        obj.numApproved += 1;
        setNumHarvested(obj.numHarvested);
        setNumApproved(obj.numApproved);
        return obj;

      case 7:
      case 8:
      case 9:
        obj.numSold += 1;
        obj.numApproved += 1;
        setNumSold(obj.numSold);
        setNumApproved(obj.numApproved);
        return obj;

      case 10:
        obj.numRejected += 1;
        setNumRejected(obj.numRejected);
        return obj;

      case 11:
        obj.numDiscarded += 1;
        setNumDiscarded(obj.numDiscarded);
        return obj;

      default:
        return obj;
    }
  }

  function addToBarObject(plantName, seedCount) {
    plantName = plantName.captialize();
    let tempBarGraph = barGraphObject;
    if (tempBarGraph[plantName]) {
      let old = tempBarGraph[plantName];
      tempBarGraph[plantName] = old + seedCount;
    } else {
      tempBarGraph[plantName] = seedCount;
    }
    setBarGraphObject(tempBarGraph);
  }

  return (
    <>
      <Row>
        <Col>{setBreadcrumb(props.location.pathname)}</Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="utils__title ">
            <strong className="text-uppercase ">Progress Information</strong>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <section className={"status-tab card"}>
            <div className={"card-header"}>
              <strong className={"utils__title"}>Harvest Status</strong>
            </div>

            <ProgressBar now={40} label={`${40}%`} />
            <p className={"status-tab-description"}>
              40% of cultivation is ready for harvest
            </p>
          </section>
        </Col>
        <Col md={4}>
          <section className="status-tab card">
            <div className={"card-header"}>
              <strong className="utils__title">Annual Target</strong>
            </div>
            <ProgressBar now={50} label={`${50}%`} />
            <p className={"status-tab-description"}>
              You have completed 50% of your annual targets
            </p>
          </section>
        </Col>
        <Col md={4}>
          <section className="status-tab card">
            <div className={"card-header"}>
              <strong className="utils__title">
                Inventory Space Available
              </strong>
            </div>
            <ProgressBar now={20} label={`${20}%`} />
            <p className={"status-tab-description"}>
              You have 20% of inventory space available
            </p>
          </section>
        </Col>
      </Row>

      <Row>
        <Col md={12} className={"table-col"}>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                <strong className={"utils__title"}> Sown Crops</strong>
                <Button
                  variant={"primary"}
                  className={"float-right"}
                  type={"primary"}
                  onClick={() => {
                    props.history.push("/cultivator/add-new-harvest");
                  }}
                >
                  Add New Crop
                </Button>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <ProductTable rows={sownArray} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                <strong className={"utils__title"}>
                  Harvested Crops{" "}
                </strong>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <ProductTable rows={harvestedArray} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                <strong className={"utils__title"}>
                  Tested Crops{" "}
                  {numApproved > 0 || numRejected > 0 ? (
                    <Badge variant="success">Test Results Received</Badge>
                  ) : null}
                </strong>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <ProductTable rows={testedArray} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                <strong className={"utils__title"}>Sold Crops</strong>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <ProductTable rows={soldArray} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
                <strong className={"utils__title"}> Destroyed Crops </strong>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  <ProductTable rows={destroyedArray} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 6 }} className={"chart-col"}>
          <section className="dashboard-section card">
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong>Seeds Sown in Year 2019</strong>
              </div>
            </div>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <BarGraph ObjectToShow={barGraphObject} label={"Seeds Sown"} />
              </Col>
            </Row>
          </section>
        </Col>

        <Col md={6} className={"chart-col"}>
          <section className={"dashboard-section card"}>
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong className={"section-title"}>
                  Lab test Reports in 2018-19
                </strong>
              </div>
            </div>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <PieChart2
                  numApproved={numApproved}
                  numRejected={numRejected}
                />
              </Col>
            </Row>
          </section>
        </Col>
        <Col md={6} className={"chart-col"}>
          <section className={"dashboard-section card"}>
            <div className={"card-header"}>
              <div className={"utils__title"}>
                <strong className={"section-title"}>
                  Current Stock Status
                </strong>
              </div>
            </div>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <PieChart1
                  numSown={numSown}
                  numInventory={numHarvested}
                  numSold={numSold}
                />
              </Col>
            </Row>
          </section>
        </Col>
        <Col md={6} className={"chart-col"}>
          <section className={"dashboard-section card"}>
            <div className={"card-header"}>
              <div className={"util__title"}>
                <strong className={"section-title"}>
                  Crops Harvested in 2018-19
                </strong>
              </div>
            </div>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <PieChart3
                  numHarvested={numHarvested + numSold}
                  numDestroyed={numDiscarded}
                />
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
      {preloader ? <Loader message={"Fetching Data"} /> : null}
    </>
  );
};

export default Dashboard;
