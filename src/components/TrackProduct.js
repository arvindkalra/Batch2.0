import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  connectToMetamask,
  fetchEntireChain,
  fetchEntireJourney
} from "../dbController/init";
import "../assets/stylesheets/trackProduct.scss";
import { getFarmerDetails } from "../dbController/farmerRole";
import { getManufacturerDetails } from "../dbController/manufacturerRole";
import { getLaboratoryDetails } from "../dbController/laboratoryRole";
import { getTransporterDetails } from "../dbController/transporterRole";
import { getRetailerDetails } from "../dbController/retailerRole";
import { getDistributorDetails } from "../dbController/distributorRole";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const TrackProduct = ({ location }) => {
  const [trackingId, setTrackingId] = useState(
    location.pathname.split("/")[location.pathname.split.length]
  );
  const [productImage, setProductImage] = useState("");
  const [journeyObj, setJourneyObj] = useState({
    retailer: {},
    farmer: {},
    laboratory: {},
    manufacturer: {},
    distributor: {},
    distributorToRetailerTransporter: {},
    manufacturerToDistributorTransporter: {},
    farmerToManufacturerTransporter: {},
    farmerToLaboratoryTransporter: {}
  });
  const [loading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    connectToMetamask().then(() => {
      let tempJourneyObj = {};
      fetchEntireJourney(trackingId)
        .then(obj => {
          tempJourneyObj = obj;
          return getDistributorDetails(obj.distributorAddress);
        })
        .then(obj => {
          tempJourneyObj.distributor = obj;
          return getTransporterDetails(
            tempJourneyObj.distributorToRetailerTransporter
          );
        })
        .then(obj => {
          tempJourneyObj.distributorToRetailerTransporter = obj;
          return getTransporterDetails(
            tempJourneyObj.farmToFactoryConsignmentTransporterAddress
          );
        })
        .then(obj => {
          tempJourneyObj.farmerToManufacturerTransporter = obj;
          return getTransporterDetails(
            tempJourneyObj.farmToLabConsignmentTransporterAddress
          );
        })
        .then(obj => {
          tempJourneyObj.farmerToLaboratoryTransporter = obj;
          return getFarmerDetails(tempJourneyObj.farmerAddress);
        })
        .then(obj => {
          tempJourneyObj.farmer = obj;
          return getLaboratoryDetails(tempJourneyObj.laboratoryAddress);
        })
        .then(obj => {
          tempJourneyObj.laboratory = obj;
          return getManufacturerDetails(tempJourneyObj.manufacturerAddress);
        })
        .then(obj => {
          tempJourneyObj.manufacturer = obj;
          return getTransporterDetails(
            tempJourneyObj.manufacturerToDistributorTransporter
          );
        })
        .then(obj => {
          tempJourneyObj.manufacturerToDistributorTransporter = obj;
          return getRetailerDetails(tempJourneyObj.retailerAddress);
        })
        .then(obj => {
          tempJourneyObj.retailer = obj;
          setJourneyObj(tempJourneyObj);
          setProductImage(tempJourneyObj.retailProductImage);
          console.log(tempJourneyObj);
          setLoader(false);
        });
    });
  }, [trackingId]);

  return (
    <Container fluid={true} className={"track-product"}>
      <main>
        <Row>
          <Col md={12}>
            <h1 className={"journey-title"}>Product Supply Chain Journey</h1>

            <p className={"journey-summary"}>
              Below is the journey of the product you just bought over the Batch
              Supply Chain <br /> Powered by the Ethereum Blockchain
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <section className={"product-details-section card"}>
              <div className={"card-header"}>
                <div className={"utils__title"}>
                  <strong>Product Details</strong>
                </div>
              </div>
              <Row>
                <Col md={6} sm={6}>
                  <section className={"product-image-section"}>
                    {journeyObj.productType ? (
                      <img src={productImage} alt={""} />
                    ) : null}
                  </section>
                </Col>
                <Col md={6} sm={6}>
                  <section className={"product-info"}>
                    <ul>
                      <li>
                        <strong>#ID</strong>
                        <span className={"uid"}>
                          {trackingId || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Packet Name</strong>
                        <span>{journeyObj.packetName || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Product Type</strong>
                        <span>{journeyObj.productType || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Units in Packet</strong>
                        <span>{journeyObj.unitsPerPacket || "Loading..."}</span>
                      </li>
                    </ul>
                  </section>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>

        <Row>
          <Col md={6} sm={6} className={"story-col"}>
            <Card>
              <div className={"story-div"}>
                <h2 className={"story-div-title"}>Retailer</h2>
                <div className={"info-box"}>
                  <ul>
                    <li>
                      Business Name:{" "}
                      <span className={"detail"}>
                        {journeyObj.retailer.companyName}
                      </span>
                    </li>
                    <li>
                      Contact Person:{" "}
                      <span className={"detail"}>
                        {journeyObj.retailer.name}
                      </span>
                    </li>
                    <li>
                      Mailing Address:{" "}
                      <span className={"detail"}>
                        {journeyObj.retailer.address}
                      </span>
                    </li>
                    <li>
                      License Number:{" "}
                      <span className={"detail"}>
                        {journeyObj.retailer.licenseNumber}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={{ span: 6, offset: 6 }} sm={{span:6, offset: 6}} className={"story-col"}>
            <Card>
              <div className={"story-div"}>
                <h2> Transporter </h2>
                <h3 className={"sub-heading"}> Distributor to Retailer </h3>
                <div className={"info-box"}>
                  <ul>
                    <li>
                      Business Name:{" "}
                      <span className={"detail"}>
                        {
                          journeyObj.distributorToRetailerTransporter
                            .companyName
                        }
                      </span>
                    </li>
                    <li>
                      Contact Person:{" "}
                      <span className={"detail"}>
                        {journeyObj.distributorToRetailerTransporter.name}
                      </span>
                    </li>
                    <li>
                      Dispatch Time:{" "}
                      <span className={"detail"}>
                        {journeyObj.distributorToRetailerDispatchTime}
                      </span>
                    </li>
                    <li>
                      Delivery Time:{" "}
                      <span className={"detail"}>
                        {journeyObj.distributorToRetailerDeliveryTime}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>{" "}
          </Col>

          <Col md={6} sm={6} className={"story-col"}>
            <Card>
              <div className={"story-div"}>
                <h2 className={"story-div-title"}>Distributor</h2>
                <div className={"info-box"}>
                  <ul>
                    <li>
                      Business Name:{" "}
                      <span className={"detail"}>
                        {journeyObj.distributor.companyName}
                      </span>
                    </li>
                    <li>
                      Contact Person:{" "}
                      <span className={"detail"}>
                        {journeyObj.distributor.name}
                      </span>
                    </li>
                    <li>
                      Mailing Address:{" "}
                      <span className={"detail"}>
                        {journeyObj.distributor.address}
                      </span>
                    </li>
                    <li>
                      License Number:{" "}
                      <span className={"detail"}>
                        {journeyObj.distributor.licenseNumber}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={{ span: 6, offset: 6 }} sm={{ span: 6, offset: 6 }} className={"story-col"}>
            <Card>
              <div className={"story-div"}>
                <h2> Transporter </h2>
                <h3 className={"sub-heading"}> Manufacturer to Distributor </h3>
                <div className={"info-box"}>
                  <ul>
                    <li>
                      Business Name:{" "}
                      <span className={"detail"}>
                        {
                          journeyObj.manufacturerToDistributorTransporter
                            .companyName
                        }
                      </span>
                    </li>
                    <li>
                      Contact Person:{" "}
                      <span className={"detail"}>
                        {journeyObj.manufacturerToDistributorTransporter.name}
                      </span>
                    </li>
                    <li>
                      Dispatch Time:{" "}
                      <span className={"detail"}>
                        {journeyObj.manufacturerToDistributorDispatchTime}
                      </span>
                    </li>
                    <li>
                      Delivery Time:{" "}
                      <span className={"detail"}>
                        {journeyObj.manufacturerToDistributorDeliveryTime}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={6} sm={6} className={"story-col"}>
            <Card>
              <div className={"story-div"}>
                <h2> Manufacturer </h2>
                <div className={"info-box"}>
                  <ul>
                    <li>
                      Business Name:{" "}
                      <span className={"detail"}>
                        {journeyObj.manufacturer.companyName}
                      </span>
                    </li>
                    <li>
                      Contact Person:{" "}
                      <span className={"detail"}>
                        {journeyObj.manufacturer.name}
                      </span>
                    </li>
                    <li>
                      Mailing Address:{" "}
                      <span className={"detail"}>
                        {journeyObj.manufacturer.address}
                      </span>
                    </li>
                    <li>
                      License Number:{" "}
                      <span className={"detail"}>
                        {journeyObj.manufacturer.licenseNumber}
                      </span>
                    </li>
                    <li>
                      Processing Completion Time:{" "}
                      <span className={"detail"}> {journeyObj.packedOn}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={{ span: 6, offset: 6 }} sm={{ span: 6, offset: 6 }} className={"story-col"}>
            <Card>
              <div className="story-div">
                <h2> Transporter </h2>
                <h3 className={"sub-heading"}> Cultivator to Manufacturer </h3>
                <div className={"info-box"}>
                  <ul>
                    <li>
                      Business Name:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmerToManufacturerTransporter.companyName}
                      </span>
                    </li>
                    <li>
                      Contact Person:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmerToManufacturerTransporter.name}
                      </span>
                    </li>
                    <li>
                      Dispatch Time:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmToFactoryConsignmentDispatchTime}
                      </span>
                    </li>
                    <li>
                      Delivery Time:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmToFactoryConsignmentDeliveryTime}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={6} sm={6} className={"story-col"}>
            <Card>
              <div className={"story-div"}>
                <h2>Laboratory</h2>
                <div className={"info-box"}>
                  <ul>
                    <li>
                      Business Name:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.laboratory.companyName}
                      </span>
                    </li>
                    <li>
                      Contact Person:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.laboratory.name}
                      </span>
                    </li>
                    <li>
                      Mailing Address:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.laboratory.address}
                      </span>
                    </li>
                    <li>
                      License Number:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.laboratory.licenseNumber}
                      </span>
                    </li>
                    <li>
                      Test Submission Time:{" "}
                      <span className={"detail"}>{journeyObj.testedOn}</span>
                    </li>
                    <li>
                      View Report:{" "}
                      <span className={"detail"}>
                        <Link
                          className={"under-linked"}
                          target={"_blank"}
                          to={`/laboratory/report/${journeyObj.harvestUnitId}`}
                        >
                          Click Here!
                        </Link>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={{ span: 6, offset: 6 }} sm={{ span: 6, offset: 6 }} className={"story-col"}>
            <Card>
              <div className="story-div">
                <h2> Transporter </h2>
                <h3 className={"sub-heading"}> Cultivator to Laboratory </h3>
                <div className={"info-box"}>
                  <ul>
                    <li>
                      Business Name:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmerToLaboratoryTransporter.companyName}
                      </span>
                    </li>
                    <li>
                      Contact Person:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmerToLaboratoryTransporter.name}
                      </span>
                    </li>
                    <li>
                      Dispatched on:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmToFactoryConsignmentDispatchTime}
                      </span>
                    </li>
                    <li>
                      Delivered on :{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmToFactoryConsignmentDeliveryTime}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={{ span: 6 }} sm={6} className={"story-col"}>
            <Card>
              <div className={"story-div"}>
                <h2> Cultivator</h2>
                <div className={"info-box"}>
                  <ul>
                    <li>
                      Business Name:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmer.companyName}
                      </span>
                    </li>
                    <li>
                      Contact Person:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmer.name}
                      </span>
                    </li>
                    <li>
                      Mailing Address:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmer.address}
                      </span>
                    </li>
                    <li>
                      License Number:{" "}
                      <span className={"detail"}>
                        {" "}
                        {journeyObj.farmer.licenseNumber}
                      </span>
                    </li>
                    <li>
                      Planted on:{" "}
                      <span className={"detail"}>{journeyObj.datePlanted}</span>
                    </li>
                    <li>
                      Harvested on:{" "}
                      <span className={"detail"}>{journeyObj.harvestTime}</span>
                    </li>

                    <li>
                      Number of Seeds Sown:{" "}
                      <span className={"detail"}>{journeyObj.seedCount}</span>
                    </li>

                    <li>
                      Sent to lab on:{" "}
                      <span className={"detail"}>{journeyObj.sentToLabOn}</span>
                    </li>
                    <li>
                      <ul className={"horizontal-list"}>
                        <li>
                          Lineage <br />{" "}
                          <span className={"detail"}>
                            {" "}
                            {journeyObj.lineage}{" "}
                          </span>
                        </li>
                        <li>
                          Flowering Time <br />{" "}
                          <span className={"detail"}>
                            {" "}
                            {journeyObj.floweringTime}{" "}
                          </span>
                        </li>
                        <li>
                          Nutrients <br />{" "}
                          <span className={"detail"}>
                            {" "}
                            {journeyObj.nutrients}{" "}
                          </span>
                        </li>
                        <li>
                          Soil Type <br />{" "}
                          <span className={"detail"}>
                            {journeyObj.soilType}{" "}
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        {loading ? <Loader message={"Fetching Product History"} /> : null}
      </main>
    </Container>
  );
};

export default TrackProduct;
