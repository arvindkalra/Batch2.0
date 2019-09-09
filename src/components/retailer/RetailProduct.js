import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import { connectToWeb3 } from "../../dbController/init";
import { fetchBatchUnitDetailsUsingUID } from "../../dbController/distributorRole";
import { fetchProductUnitDetailsUsingUID } from "../../dbController/manufacturerRole";
import SaleActionForm from "./SaleActionForm";
import Loader from "../Loader";
import { Card } from "react-bootstrap";
import { getRetailerDetails } from "../../dbController/retailerRole";

const RetailProduct = props => {
  const [batchId, setBatchId] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [details, setDetails] = useState({});
  const [totalPackets, setTotalPackets] = useState("");
  const [packetsSold, setPacketsSold] = useState("");
  const [preloader, setPreloader] = useState(true);
  const [retailerDetails, setRetailerDetails] = useState({});

  useEffect(() => {
    connectToWeb3().then(txHash => {
      let puid = props.match.params.id;
      let batchUnit;
      getRetailerDetails().then(setRetailerDetails);
      fetchBatchUnitDetailsUsingUID(puid)
        .then(obj => {
          batchUnit = obj;
          console.log(batchUnit);
          return fetchProductUnitDetailsUsingUID(obj.details.productUnitId);
        })
        .then(productUnit => {
          setBatchId(batchUnit.uid);
          setCurrentState(batchUnit.currentState);
          let details = batchUnit.details;
          details.productType = productUnit.details.productType;
          setDetails(details);
          let unitsAlreadySold = batchUnit.details.totalUnitsAlreadySold
            ? batchUnit.details.totalUnitsAlreadySold
            : 0;
          setTotalPackets(batchUnit.details.totalUnitsForSale);
          setPacketsSold(unitsAlreadySold);
          setPreloader(false);
        });
    });
  }, []);

  return (
    <>
      <Layout location={props.location} history={props.history}>
        <Row>
          <Col>
            {setBreadcrumb(
              `/retailer/products/${details.packetName || "Loading Name..."}`
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
                    {details.productType ? (
                      details.retailProductImage ? (
                        <img src={details.retailProductImage} alt={""} />
                      ) : (
                        <img
                          src={
                            "https://amyshealthybaking.com/wp-content/uploads/2018/02/copycat-thin-mints-0818.jpg"
                          }
                          alt={""}
                        />
                      )
                    ) : null}
                  </section>
                </Col>
                <Col md={6}>
                  <section className={"product-info"}>
                    <ul>
                      <li>
                        <strong>#ID</strong>
                        <span className={"uid"}>{batchId || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Product Type</strong>
                        <span>{details.productType || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Total Packets Purchased</strong>
                        <span>
                          {totalPackets
                            ? totalPackets + " Packets"
                            : "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Units Per Packet</strong>
                        <span>
                          {details.unitsPerPacket
                            ? details.unitsPerPacket + " Units"
                            : "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Delivered On</strong>
                        <span>
                          {currentState ? (
                            currentState.value === 4 ? (
                              <span>
                                {details.distributorToRetailerDeliveryTime}
                              </span>
                            ) : (
                              <span> Not yet Delivered</span>
                            )
                          ) : (
                            "Loading..."
                          )}
                        </span>
                      </li>
                      <li>
                        <strong>Dispatched on</strong>
                        <span>
                          {currentState ? (
                            currentState.value >= 3 ? (
                              <span>
                                {details.distributorToRetailerDispatchTime}
                              </span>
                            ) : (
                              <span> Not yet Dispatched</span>
                            )
                          ) : (
                            "Loading..."
                          )}
                        </span>
                      </li>
                    </ul>
                  </section>
                </Col>
              </Row>
            </section>
            <Row>
              <Col md={12}>
                <section className="product-status-section card">
                  <div className={"card-header"}>
                    <div className="utils__title ">
                      <strong className="text-uppercase ">
                        Units Already Sold
                      </strong>
                    </div>
                  </div>
                  <ProgressBar
                    striped
                    variant="success"
                    now={
                      packetsSold
                        ? ((packetsSold / totalPackets) * 100).toFixed(2)
                        : 0
                    }
                    label={
                      packetsSold
                        ? ((packetsSold / totalPackets) * 100).toFixed(2) +
                          "" +
                          " % inventory moved"
                        : "None Sold Yet"
                    }
                  />
                  <p>
                    {totalPackets - packetsSold} out of {totalPackets} purchased
                    units left in the inventory
                  </p>
                </section>
              </Col>
              <SaleActionForm
                details={details}
                buid={batchId}
                left={totalPackets - packetsSold}
                retailerDetails={retailerDetails}
              />
            </Row>
          </Col>
        </Row>
      </Layout>
      {preloader ? <Loader message={"Fetching Details of Product"} /> : null}
    </>
  );
};

export default RetailProduct;
