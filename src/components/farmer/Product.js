import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import { getSeedProgress, setBreadcrumb } from "../../helpers";
import ActionPanel from "../actionPanel/ActionPanel";
import { getSeedUnitDetails } from "../../dbController/farmerRole";
import { connectToMetamask } from "../../dbController/init";
import Loader from "../Loader";
import Button from "react-bootstrap/Button";
import ActionForm from "../actionPanel/ActionForm";

const Product = props => {
  useEffect(() => {
    const buid = parseInt(props.match.params.product);
    connectToMetamask().then(() => {
      getSeedUnitDetails(buid).then(seedDetails => {
        console.log(seedDetails.details.currentLocation[-1])

        setSeedObject(seedDetails);
        setProductStatus(seedDetails.currentState);
        setPreloader(false);
      });
    });
  }, []);
  const [productStatus, setProductStatus] = useState({
    state: "",
    progress: 0
  });
  const [seedObject, setSeedObject] = useState({ details: {currentLocation:[{location:'' , time: ''}]} });
  const [preloader, setPreloader] = useState(true);
  return (
    <>
      <Layout location={props.location}>
        <Row className={"title"}>
          <Col>
            <h1> Product Name: {seedObject.details.plantName} </h1>
          </Col>
        </Row>
        <Row>
          <Col>{setBreadcrumb(props.location.pathname)}</Col>
        </Row>
        <Row>
          <Col>
            <section className={"product-image-section"}>
              <img
                src="https://www.ilovegrowingmarijuana.com/wp-content/uploads/2017/05/Trinity.jpg"
                alt=""
              />
            </section>
          </Col>
        </Row>
        <Row>
          <Col>
            <section className={"product-details-section"}>
              <Row>
                <Col md={4} className={"product-info-tab"}>
                  <h2>Lineage</h2>
                  <p>{seedObject.details.lineage}</p>
                </Col>
                <Col md={4} className={"product-info-tab"}>
                  <h2>Flowering Time</h2>
                  <p>{seedObject.details.floweringTime}</p>
                </Col>
                <Col md={4} className={"product-info-tab"}>
                  <h2>Current Location</h2>
                  <p>{seedObject.details.currentLocation[ seedObject.details.currentLocation.length -1].location}</p>
                </Col>
                <Col md={{ span: 4, offset: 2 }} className={"product-info-tab"}>
                  <h2>Soil Type</h2>
                  <p>{seedObject.details.soilType}</p>
                </Col>
                <Col md={{ span: 4 }} className={"product-info-tab"}>
                  <h2>Nutrients</h2>
                  <p>{seedObject.details.nutrients}</p>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <section className="product-details-section">
              <Row>
                <Col md={4}>
                  <h2>Date Planted</h2>
                  <p>{seedObject.details.datePlanted}</p>
                </Col>
                <Col md={4}>
                  <h2>Batch Id</h2>
                  <p>#{seedObject.harvestUnitId}</p>
                </Col>
                <Col>
                  <h2>Quantity</h2>
                  <p>{seedObject.details.seedCount}</p>
                </Col>
              </Row>
            </section>
          </Col>
          <Col md={12}>
            <section className="product-status-section">
              <h3 className="status-tab-title">Product Status</h3>
              <ProgressBar
                striped
                variant={
                  productStatus.value === 10 || productStatus.value === 11
                    ? "danger"
                    : "Success"
                }
                now={getSeedProgress(productStatus.value)}
                label={productStatus.status}
              />
            </section>
          </Col>
        </Row>
        <Row className={"action-panel"}>
          {productStatus.value < 7 ? (
            <ActionPanel
              seedObj={seedObject}
              productState={productStatus}
              setProductStatus={newProductStatus => {
                setProductStatus(newProductStatus);
              }}
              history={props.history}
            />
          ) : productStatus.value === 10 ? (
            <Col md={{ offset: 1, span: 10 }}>
              <ActionForm
                history={props.history}
                seedObj={seedObject}
                productState={productStatus}
                setProductStatus={newProductStatus => {
                  setProductStatus(newProductStatus);
                }}
                destroyRequested={true}
                cancelDestroyRequest={() => {}}
              />
            </Col>
          ) : null}
        </Row>
      </Layout>
      {preloader ? <Loader message={"Fetching Data"} /> : null}
    </>
  );
};

export default Product;
