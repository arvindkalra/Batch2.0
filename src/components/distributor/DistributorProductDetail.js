import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import { connectToWeb3 } from "../../dbController/init";
import {
  fetchHarvestUnitDetailsUsingUID,
  fetchProductUnitDetailsUsingUID,
  getManufacturerDetails
} from "../../dbController/manufacturerRole";
import DistributorActionPanelUnused from "../actionPanel/DistributorActionPanel(unused)";
import Loader from "../Loader";
import { Card } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

const DistributorProductDetail = props => {
  const [productInfo, setProductInfo] = useState({});
  const [harvestInfo, setHarvestInfo] = useState({});
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    let productObject;
    let puid = props.match.params.buid;
    let manufacturerName;
    let manufacturerCompany;
    connectToWeb3()
      .then(() => {
        return fetchProductUnitDetailsUsingUID(puid);
      })
      .then(object => {
        productObject = object.details;
        let alreadyUsed = productObject.totalPacketsUsed
          ? productObject.totalPacketsUsed
          : 0;
        setProductInfo({ ...productObject, puid, alreadyUsed });
        console.log("product", productObject);
        return getManufacturerDetails(object.manufacturerAddress);
      })
      .then(({ name, companyName }) => {
        manufacturerName = name;
        manufacturerCompany = companyName;
        return fetchHarvestUnitDetailsUsingUID(productObject.harvestUnitId);
      })
      .then(({ details }) => {
        setHarvestInfo({
          ...details,
          manufacturerName,
          manufacturerCompany
        });
        setPreloader(false);
      });
  }, []);

  return (
    <>
      <Layout location={props.location} history={props.history}>
        <Row>
          <Col>
            {setBreadcrumb(
              `/distributor/product/${
                productInfo.productType ? productInfo.productType : ""
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
                    {productInfo.productType ? (
                      productInfo.productImage ? (
                        <img src={productInfo.productImage} alt={""} />
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
                        <span className={"uid"}>
                          {productInfo.puid || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Manufacturer Name</strong>
                        <span>
                          {harvestInfo.manufacturerName || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Manufacturer Company</strong>
                        <span>
                          {harvestInfo.manufacturerCompany || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Date of Packaging</strong>
                        <span>{productInfo.packedOn || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Container Type</strong>
                        <span>{productInfo.container || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Cost Price</strong>
                        <span>
                          {productInfo.manufacturerToDistributorPrice
                            ? `$${productInfo.manufacturerToDistributorPrice} / ${productInfo.container}`
                            : "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Bought {productInfo.container} Count</strong>
                        <span>
                          {productInfo.totalPacketsManufactured
                            ? `${productInfo.totalPacketsManufactured} Units`
                            : "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>
                          {productInfo.productType} Count in Each{" "}
                          {productInfo.container}
                        </strong>
                        <span>
                          {productInfo.unitsPerPacket
                            ? `${productInfo.unitsPerPacket} Units`
                            : "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>M.R.P.</strong>
                        <span>
                          {productInfo.mrp
                            ? `$${productInfo.mrp}`
                            : "Loading..."}
                        </span>
                      </li>
                    </ul>
                  </section>
                </Col>
              </Row>
            </section>
            <Card>
              <Row>
                <Col md={12}>
                  <section className="product-status-section card">
                    <div className={"card-header"}>
                      <div className="utils__title ">
                        <strong className="text-uppercase ">
                          {productInfo.container} Available for Sale
                        </strong>
                      </div>
                    </div>
                    <ProgressBar
                      now={(
                        ((productInfo.totalPacketsManufactured -
                          productInfo.alreadyUsed) /
                          productInfo.totalPacketsManufactured) *
                        100
                      ).toFixed(2)}
                      label={`${productInfo.totalPacketsManufactured -
                        productInfo.alreadyUsed} Units`}
                      striped
                    />
                  </section>
                </Col>
              </Row>
            </Card>
            {/*<Row>*/}
            {/*  {productInfo.currentStatus.value === 4 ? (*/}
            {/*    <DistributorActionPanel*/}
            {/*      left={productInfo.amountLeft}*/}
            {/*      total={productInfo.amountManufactured}*/}
            {/*      prevDetails={prevDetails}*/}
            {/*    />*/}
            {/*  ) : (*/}
            {/*    <div className={"delivery-notification-manufacturer"}>*/}
            {/*      The Shipment is Yet to be Delivered by the Transporter*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</Row>*/}
          </Col>
        </Row>
      </Layout>
      {preloader ? <Loader message={"Fetching Details"} /> : null}
    </>
  );
};

export default DistributorProductDetail;
