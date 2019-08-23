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
import { connectToMetamask } from "../../dbController/init";
import Notification from "../Notification";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const Dashboard = props => {
  const [rowsArray, setRowsArray] = useState([]);
  const [showForMoreRows, setShowForMoreRows] = useState(false);
  const [barGraphObject, setBarGraphObject] = useState({});
  const [numSown, setNumSown] = useState(0);
  const [numHarvested, setNumHarvested] = useState(0);
  const [numSold, setNumSold] = useState(0);
  const [numApproved, setNumApproved] = useState(0);
  const [numRejected, setNumRejected] = useState(0);
  const [numDiscarded, setNumDiscarded] = useState(0);
  const [preloader, setPreloader] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  useEffect(() => {
    connectToMetamask().then(setData);
  }, []);

  function setData() {
    let tableRows = 0;
    let tempRowsArray = rowsArray;
    let tempStatusObj = {
      numSown: 0,
      numHarvested: 0,
      numSold: 0,
      numApproved: 0,
      numRejected: 0,
      numDiscarded: 0
    };
    getRowsForFarmer((rowObject, total) => {
      if (tableRows < 3) {
        tableRows++;
        let objToBeAdded = {
          harvestUnitId: rowObject.harvestUnitId,
          plantName: rowObject.details.plantName,
          datePlanted: rowObject.details.datePlanted,
          seedCount: rowObject.details.seedCount,
          currentState: rowObject.currentState
        };
        tempRowsArray.push(objToBeAdded);
        setRowsArray([...tempRowsArray]);
        addToBarObject(
          objToBeAdded.plantName,
          parseInt(objToBeAdded.seedCount)
        );
        tempStatusObj = setNumStatusObject(
          rowObject.currentState.value,
          tempStatusObj
        );
      } else {
        tableRows++;
        addToBarObject(
          rowObject.details.plantName,
          parseInt(rowObject.details.seedCount)
        );
        tempStatusObj = setNumStatusObject(
          rowObject.currentState.value,
          tempStatusObj
        );
        setShowForMoreRows(true);
      }

      if(tableRows === total){
        setPreloader(false);
      }
    });
  }

  function setNumStatusObject(statusValue, obj) {
    switch (statusValue) {
      case 1:
        obj.numSown += 1;
        setNumSown(obj.numSown);
        return obj;

      case 2:
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
        <Col md={4}>
          <section className={"status-tab"}>
            <h3 className="status-tab-title">Harvest Status</h3>

            <ProgressBar now={40} label={`${40}%`} />
            <p className={"status-tab-description"}>
              40% of cultivation is ready for harvest
            </p>
          </section>
        </Col>
        <Col md={4}>
          <section className="status-tab">
            <h3 className="status-tab-title">Annual Target</h3>
            <ProgressBar now={50} label={`${50}%`} />
            <p className={"status-tab-description"}>
              You have completed 50% of your annual targets
            </p>
          </section>
        </Col>
        <Col md={4}>
          <section className="status-tab">
            <h3 className="status-tab-title">Inventory Space Available</h3>
            <ProgressBar now={20} label={`${20}%`} />
            <p className={"status-tab-description"}>
              You have 20% of inventory space available
            </p>
          </section>
        </Col>
      </Row>
      <Row>
        <Col md={12} className={"table-col"}>
          <section className={"dashboard-section"}>
            <h3 className={"section-title"}>Currently Sown Seeds</h3>

            <div className={"table-section product-table-dashboard"}>
              <ProductTable rows={rowsArray} showForMore={showForMoreRows} />
            </div>
          </section>
        </Col>
        <Col md={{ offset: 4, span: 4 }} className={"add-harvest-col"}>
          <Link to={"/cultivator/add-new-harvest"}>
            <Button type={"primary"}>Add a new Plant</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 6 }} className={"chart-col"}>
          <section className="dashboard-section">
            <Row>
              <Col>
                <h3 className="section-title">Seeds Sown in Year 2019</h3>
              </Col>
              <Col md={{ span: 10, offset: 1 }}>
                <div className={"chart-section"}>
                  <BarGraph
                    ObjectToShow={barGraphObject}
                    label={"Seeds Sown"}
                  />
                </div>
              </Col>
            </Row>
          </section>
        </Col>

        <Col md={6} className={"chart-col"}>
          <section className={"dashboard-section"}>
            <Row>
              <Col>
                <h3 className={"section-title"}>Lab test Reports in 2018-19</h3>
              </Col>
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
          <section className={"dashboard-section"}>
            <Row>
              <Col>
                <h3 className={"section-title"}>Current Stock Status</h3>
              </Col>
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
          <section className={"dashboard-section"}>
            <Row>
              <Col>
                <h3 className={"section-title"}>Crops Harvested in 2018-19</h3>
              </Col>
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
      {preloader ? <Loader message={"Fetching Data"}/> : null}
    </>
  );
};

export default Dashboard;
