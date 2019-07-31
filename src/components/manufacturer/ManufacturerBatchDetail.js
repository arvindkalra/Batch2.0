import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Layout from "../Layout";
import ManufacturerActionPanel from "../actionPanel/ManufacturerActionPanel";
import {fetchHarvestUnitDetailsUsingBUID} from "../../dbController/manufacturerRole";
import {connectToMetamask} from "../../dbController/init";
import {getFarmerDetails} from "../../dbController/farmerRole";

const ManufacturerBatchDetail = props => {
  const [batchInfo, setBatchInfo] = useState({});
  const [prevDetails, setPrevDetails] = useState({});
  useEffect(() => {
    // Fetch the buid from the params
    let buid = props.match.params.buid;
    connectToMetamask().then(()=>{
      fetchHarvestUnitDetailsUsingBUID(buid).then((object) => {

        console.log(object);
        getFarmerDetails(object.farmerAddress).then(farmerObj => {
          setPrevDetails(object);
          setBatchInfo({
            buid: object.uid,
            plantName: object.details.plantName,
            plantType: object.details.lineage,
            dateHarvested: object.details.harvestTime,
            nutrients: object.details.nutrients,
            dateTested: object.details.testedOn,
            farmerName: farmerObj.name,
            farmerAddress: farmerObj.companyName,
            currentStatus: object.currentState,
            amountAlreadyUsed: object.amountAlreadyUsed,
            amountHarvested: object.amountCreated,
            amountLeft: (object.amountCreated - object.amountAlreadyUsed)
          })
        });
      });
    });

  }, []);

  let getBatchInfoUsingBuid = buid => {
    // Call web3 for info
    setBatchInfo({
      buid: 1,
      plantName: "Gundza",
      plantType: "Indica",
      dateHarvested: "1st May",
      amountHarvested: 100,
      nutrients: "Dry Nutrients",
      dateTested: "5th May",
      farmerName: "Bob the Builder",
      farmerAddress: "1245 Skyline Blvd, Oakland CA 94611",
      currentStatus: "delivered",
      amountAlreadyUsed: 70,
      amountLeft: 30
    });
  };

  return (
    <Layout>
      <Row>
        <Col>
          {setBreadcrumb(`/manufacturer/harvests/${batchInfo.plantName}`)}
        </Col>
      </Row>
      <section
        className={"harvest-detail-section-manufacturer container-fluid"}
      >
        <Row>
          <Col md={4} className={"data-info-box"}>
            <h4>Batch Id</h4>
            <p>{batchInfo.buid}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Farmer Name</h4>
            <p>{batchInfo.farmerName}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Farmer Company</h4>
            <p>{batchInfo.farmerAddress}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Plant Name</h4>
            <p>{batchInfo.plantName}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Lineage</h4>
            <p>{batchInfo.plantType}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Date of Harvest</h4>
            <p>{batchInfo.dateHarvested}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Units of Raw Material Bought</h4>
            <p>{batchInfo.amountHarvested} Pounds</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Date of Testing</h4>
            <p>{batchInfo.dateTested}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Nutrients</h4>
            <p>{batchInfo.nutrients}</p>
          </Col>
        </Row>
      </section>
      <section className={"manufacturer-actions container-fluid"}>
        <Row>
          {batchInfo.currentStatus === "delivered" ? (
            <ManufacturerActionPanel
              left={batchInfo.amountLeft}
              total={batchInfo.amountHarvested}
              prevDetails={prevDetails}
            />
          ) : (
            <div className={"delivery-notification-manufacturer"}>
              The Harvest Unit is yet to be delivered by the transporter
            </div>
          )}
        </Row>
      </section>
    </Layout>
  );
};

export default ManufacturerBatchDetail;
