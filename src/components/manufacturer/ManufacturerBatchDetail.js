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
                        src="https://www.ilovegrowingmarijuana.com/wp-content/uploads/2017/05/Trinity.jpg"
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
                        <span>{batchInfo.plantName || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Lineage</strong>
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
                            ? batchInfo.amountHarvested + " Pounds"
                            : "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Date of Testing</strong>
                        <span>{batchInfo.dateTested || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Nutrients</strong>
                        <span>{batchInfo.nutrients || "Loading..."}</span>
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
