import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createTransactionModal, setBreadcrumb } from "../../helpers";
import { checkMined, connectToWeb3 } from "../../dbController/init";
import {
  fetchHarvestUnitDetailsUsingUID,
  fetchProductUnitDetailsUsingUID,
  getManufacturerDetails
} from "../../dbController/manufacturerRole";
import Loader from "../Loader";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { setSalePrice } from "../../dbController/distributorRole";

const DistributorProductDetail = props => {
  const [productInfo, setProductInfo] = useState({});
  const [harvestInfo, setHarvestInfo] = useState({});
  const [cleanDetails, setCleanDetails] = useState({});
  const [preloader, setPreloader] = useState(true);
  const [distributorSalePrice, setDistributorSalePrice] = useState(0);
  const [clicked, setClicked] = useState(false);

  const [transactionMining, setTransactionMining] = useState(false);
  const [transactionObject, setTransactionObject] = useState(null);

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
        setCleanDetails(productObject);
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

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setClicked(true);
    if (distributorSalePrice <= 0) return;

    setTransactionMining(true);
    let newDetail = cleanDetails;
    newDetail.distributorToRetailerPrice = distributorSalePrice;
    setSalePrice(productInfo.puid, newDetail, openSignatureModal).then(hash => {
      checkMined(hash, () => window.location.reload());
    });
  };

  const openSignatureModal = obj => {
    setTransactionObject({
      ...obj,
      showModal: true,
      setShowModal: () => {
        setTransactionObject(null);
      },
      cancel: () => {
        setTransactionMining(false);
        setTransactionObject(null);
      }
    });
  };

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
                      {productInfo.distributorToRetailerPrice ? (
                        <li>
                          <strong>Sale Price</strong>
                          <span>
                            {`$${productInfo.distributorToRetailerPrice} / ${productInfo.container}`}
                          </span>
                        </li>
                      ) : null}
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
            {productInfo.productName && !productInfo.distributorToRetailerPrice ? (
              <Card>
                <Card.Header>
                  <div className="utils__title ">
                    <strong className="text-uppercase ">
                      Set Selling Price
                    </strong>
                  </div>
                </Card.Header>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type={"text"}
                        min={0}
                        onChange={e =>
                          setDistributorSalePrice(parseFloat(e.target.value))
                        }
                        isInvalid={clicked && distributorSalePrice <= 0}
                      />
                      <FormControl.Feedback type={"invalid"}>
                        <strong>Required</strong>
                      </FormControl.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Button onClick={handleClick}>Set Price</Button>
                  </Col>
                </Row>
              </Card>
            ) : null}

            <Card className={"product-status-section"}>
              <Row>
                <Col md={12}>
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
      {transactionMining ? <Loader /> : null}
      {transactionObject ? createTransactionModal(transactionObject) : null}
      {preloader ? <Loader message={"Fetching Details"} /> : null}
    </>
  );
};

export default DistributorProductDetail;
