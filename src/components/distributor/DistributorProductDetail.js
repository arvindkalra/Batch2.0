import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setBreadcrumb } from "../../helpers";
import { connectToMetamask } from "../../dbController/init";
import {
  fetchHarvestUnitDetailsUsingUID,
  fetchProductUnitDetailsUsingUID,
  getManufacturerDetails
} from "../../dbController/manufacturerRole";
import DistributorActionPanel from "../actionPanel/DistributorActionPanel";

const DistributorProductDetail = props => {
  const [productInfo, setProductInfo] = useState({currentStatus: {value : 0}});
  const [prevDetails, setPrevDetails] = useState({});

  useEffect(() => {
    let productObject;
    let puid = props.match.params.buid;
    let manufacturerName;
    let manufacturerCompany;
    connectToMetamask()
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
          parseInt(productObject.details.harvestUnitId)
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
          manufacturerName,
          manufacturerCompany
        });
      });
  }, []);

  return (
    <Layout>
      <Row>
        <Col>
          {setBreadcrumb(
            `/distributor/product/${
              productInfo.productType ? productInfo.productType : ""
            }`
          )}
        </Col>
      </Row>
      <section
        className={"harvest-detail-section-manufacturer container-fluid"}
      >
        <Row>
          <Col md={4} className={"data-info-box"}>
            <h4>Product Id</h4>
            <p>{productInfo.productUnitId}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Manufacturer Name</h4>
            <p>{productInfo.manufacturerName}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Manufacturer Company</h4>
            <p>{productInfo.manufacturerCompany}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Plant Name</h4>
            <p>{productInfo.plantName}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Date of Harvest</h4>
            <p>{productInfo.dateHarvested}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Packet Size</h4>
            <p>{productInfo.packetSize}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Date of Packaging</h4>
            <p>{productInfo.packedOn}</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Cost Price</h4>
            <p>{productInfo.costPrice} $</p>
          </Col>
          <Col md={4} className={"data-info-box"}>
            <h4>Units Bought</h4>
            <p>{productInfo.amountManufactured} Units</p>
          </Col>
        </Row>
      </section>
      <section className={"manufacturer-actions container-fluid"}>
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
      </section>
    </Layout>
  );
};

export default DistributorProductDetail;
