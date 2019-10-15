import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Layout from "../Layout";
import ManufacturerActionPanel from "../actionPanel/ManufacturerActionPanel";
import { fetchHarvestUnitDetailsUsingUID } from "../../dbController/manufacturerRole";
import { connectToWeb3 } from "../../dbController/init";
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
    connectToWeb3().then(() => {
      fetchHarvestUnitDetailsUsingUID(buid).then(object => {
        getFarmerDetails(object.details.farmerAddress).then(farmerObj => {
          let alreadyUsed = object.details.totalHarvestUsed
            ? object.details.totalHarvestUsed
            : 0;
          setPrevDetails(object);
          setBatchInfo({
            buid: object.uid,
            plantType: object.details.plantType.captialize(),
            dateHarvested: object.details.harvestTime,
            nutrients: object.details.nutrients,
            dateTested: object.details.testResults.testedOn,
            farmerName: farmerObj.name,
            farmerAddress: farmerObj.companyName,
            currentStatus: object.currentState,
            amountAlreadyUsed: alreadyUsed,
            amountHarvested: object.details.totalHarvestAmount,
            amountLeft: object.details.totalHarvestAmount - alreadyUsed,
            plantImage: object.details.plantImage
          });
          setPreloader(false);
        });
      });
    });
  }, []);

  return (
    <>
      <Layout location={props.location} history={props.history}>
        <Row>
          <Col>
            {setBreadcrumb(
              `/manufacturer/harvests/${
                batchInfo.plantType ? batchInfo.plantType : "Loading..."
              }`
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <section className={"product-details-section card"}>
              <div className={"card-header"}>
                <div className={"utils__title"}>
                  <strong>Product Details</strong>
                </div>
              </div>
              <Row>
                <Col md={6}>
                  <section className={"product-image-section"}>
                    {batchInfo.plantImage ? (
                      <img src={batchInfo.plantImage} alt={""} />
                    ) : (
                      <img
                        src="https://i.pinimg.com/736x/a4/36/cd/a436cd3a7400ba01fc2fcdb7947bd40a.jpg"
                        alt=""
                      />
                    )}
                  </section>
                </Col>
                <Col md={6}>
                  <section className={"product-info"}>
                    <ul>
                      <li>
                        <strong>#ID</strong>
                        <span className={"uid"}>
                          {batchInfo.buid || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Cultivator</strong>
                        <span>{batchInfo.farmerName || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Cultivator's Company</strong>
                        <span>{batchInfo.farmerAddress || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Plant Name</strong>
                        <span>{batchInfo.plantType || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Date of Harvest</strong>
                        <span>{batchInfo.dateHarvested || "Loading.."}</span>
                      </li>
                      <li>
                        <strong>Units of Raw Material Bought</strong>
                        <span>
                          {batchInfo.amountHarvested
                            ? batchInfo.amountHarvested + " Kilograms"
                            : "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Date of Testing</strong>
                        <span>{batchInfo.dateTested || "Loading..."}</span>
                      </li>
                    </ul>
                  </section>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
        <Row>
          {batchInfo.currentStatus.value >= 9 ? (
            <ManufacturerActionPanel
              left={batchInfo.amountLeft}
              total={batchInfo.amountHarvested}
              prevDetails={prevDetails}
              history={props.history}
            />
          ) : (
            <Col md={12}>
              <div className={"card"}>
                The Harvest Unit is yet to be delivered by the transporter
              </div>
            </Col>
          )}
        </Row>
      </Layout>
      {preloader ? <Loader message={"Fetching Data"} /> : null}
    </>
  );
};

export default ManufacturerBatchDetail;
