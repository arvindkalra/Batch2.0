import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Layout from "../Layout";
import ManufacturerActionPanel from "../actionPanel/ManufacturerActionPanel";
import { fetchHarvestUnitDetailsUsingUID } from "../../dbController/manufacturerRole";
import { connectToMetamask } from "../../dbController/init";
import { getFarmerDetails } from "../../dbController/farmerRole";
import Loader from "../Loader";

const ManufacturerBatchDetail = props => {
  const [batchInfo, setBatchInfo] = useState({
    currentStatus: { value: 0, status: "Temp" }
  });
  const [prevDetails, setPrevDetails] = useState({});
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    // Fetch the buid from the params
    let buid = props.match.params.buid;
    connectToMetamask().then(() => {
      fetchHarvestUnitDetailsUsingUID(buid).then(object => {
        getFarmerDetails(object.details.farmerAddress).then(farmerObj => {
          let alreadyUsed = object.details.totalHarvestUsed
            ? object.details.totalHarvestUsed
            : 0;
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
            amountAlreadyUsed: alreadyUsed,
            amountHarvested: object.details.totalHarvestAmount,
            amountLeft: object.details.totalHarvestAmount - alreadyUsed
          });
          setPreloader(false);
        });
      });
    });
  }, []);

  return (
    <>
      <Layout location={props.location}>
        <Row>
          <Col>
            {setBreadcrumb(
              `/manufacturer/harvests/${
                batchInfo.plantName ? batchInfo.plantName : "Loading..."
              }`
            )}
          </Col>
        </Row>
        <section
          className={"harvest-detail-section-manufacturer container-fluid"}
        >
          <Row>
            <Col md={4} className={"data-info-box"}>
              <h4>Batch Id</h4>
              <p className={"uid"}>{batchInfo.buid}</p>
            </Col>
            <Col md={4} className={"data-info-box"}>
              <h4>Cultivator</h4>
              <p>{batchInfo.farmerName}</p>
            </Col>
            <Col md={4} className={"data-info-box"}>
              <h4>Cultivator's Company</h4>
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
            {batchInfo.currentStatus.value >= 9 ? (
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
      {preloader ? <Loader message={"Fetching Data"} /> : null}
    </>
  );
};

export default ManufacturerBatchDetail;
