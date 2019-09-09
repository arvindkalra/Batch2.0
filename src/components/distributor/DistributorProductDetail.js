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
import DistributorActionPanel from "../actionPanel/DistributorActionPanel";
import Loader from "../Loader";

const DistributorProductDetail = props => {
  const [productInfo, setProductInfo] = useState({
    currentStatus: { value: 0 }
  });
  const [prevDetails, setPrevDetails] = useState({});
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
        console.log(object);
        productObject = object;
        setPrevDetails(productObject);
        return getManufacturerDetails(object.details.manufacturerAddress);
      })
      .then(({ name, companyName }) => {
        manufacturerName = name;
        manufacturerCompany = companyName;
        return fetchHarvestUnitDetailsUsingUID(
          productObject.details.harvestUnitId
        );
      })
      .then(({ details }) => {
        let alreadyUsed = productObject.details.totalPacketsUsed
          ? productObject.details.totalPacketsUsed
          : 0;
        setProductInfo({
          productUnitId: productObject.uid,
          plantName: details.plantName,
          dateHarvested: details.harvestTime,
          currentStatus: productObject.currentState,
          amountAlreadyUsed: alreadyUsed,
          amountManufactured: productObject.details.totalPacketsManufactured,
          amountLeft:
            productObject.details.totalPacketsManufactured - alreadyUsed,
          productType: productObject.details.productType,
          packetSize: productObject.details.packetSize,
          packedOn: productObject.details.packedOn,
          costPrice: productObject.details.manufacturerToDistributorPrice,
          productImage: productObject.details.productImage,
          manufacturerName,
          manufacturerCompany
        });
        setPreloader(false);
      });
  }, []);

  return (
    <>
      <Layout location={props.location}>
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
                          {productInfo.productUnitId || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Manufacturer Name</strong>
                        <span>
                          {productInfo.manufacturerName || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Manufacturer Company</strong>
                        <span>
                          {productInfo.manufacturerCompany || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Plant Name</strong>
                        <span>{productInfo.plantName || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Date of Packaging</strong>
                        <span>{productInfo.packedOn || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Date of Harvest</strong>
                        <span>{productInfo.dateHarvested || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Packet Size</strong>
                        <span>{productInfo.packetSize || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Cost Price</strong>
                        <span>
                          {productInfo.costPrice
                            ? "$" + productInfo.costPrice
                            : "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Units Bought</strong>
                        <span>
                          {productInfo.amountManufactured
                            ? productInfo.amountManufactured + "Units"
                            : "Loading..."}
                        </span>
                      </li>
                    </ul>
                  </section>
                </Col>
              </Row>
            </section>
            <Row>
              {productInfo.currentStatus.value === 4 ? (
                <DistributorActionPanel
                  left={productInfo.amountLeft}
                  total={productInfo.amountManufactured}
                  prevDetails={prevDetails}
                />
              ) : (
                <div className={"delivery-notification-manufacturer"}>
                  The Shipment is Yet to be Delivered by the Transporter
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Layout>
      {preloader ? <Loader message={"Fetching Details"} /> : null}
    </>
  );
};

export default DistributorProductDetail;
