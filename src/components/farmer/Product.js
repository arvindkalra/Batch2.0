import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import { getSeedProgress, setBreadcrumb } from "../../helpers";
import ActionPanel from "../actionPanel/ActionPanel";
import { getSeedUnitDetails } from "../../dbController/farmerRole";
import { connectToWeb3 } from "../../dbController/init";
import Loader from "../Loader";

import ActionForm from "../actionPanel/ActionForm";

const Product = props => {
  useEffect(() => {
    const buid = props.match.params.product;
    connectToWeb3().then(() => {
      getSeedUnitDetails(buid).then(seedDetails => {
        console.log(seedDetails);
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
  const [seedObject, setSeedObject] = useState({
    details: { currentLocation: [{ location: "", time: "" }] }
  });
  const [preloader, setPreloader] = useState(true);
  return (
    <>
      <Layout location={props.location}>
        <Row>
          <Col>
            {setBreadcrumb(
              `/cultivator/products/${
                seedObject.details.plantName
                  ? seedObject.details.plantName
                  : "Loading..."
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
                    {seedObject.details.plantImage ? (
                      <img src={seedObject.details.plantImage} alt={""} />
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
                        <strong>Batch Id:</strong>
                        <span>#{seedObject.harvestUnitId || "Loading..."}</span>
                      </li>
                      <li>
                        <strong>Lineage : </strong>{" "}
                        <span>
                          {seedObject.details.lineage || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Flowering Time:</strong>
                        <span>
                          {seedObject.details.floweringTime || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Current Location:</strong>
                        <span>
                          {seedObject.details.currentLocation
                            ? seedObject.details.currentLocation[
                                seedObject.details.currentLocation.length - 1
                              ].location
                            : "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Soil Type:</strong>
                        <span>
                          {seedObject.details.soilType || "Loading..."}
                        </span>
                      </li>

                      <li>
                        <strong>Nutrients:</strong>
                        <span>
                          {seedObject.details.nutrients || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Date Planted:</strong>
                        <span>
                          {seedObject.details.datePlanted || "Loading..."}
                        </span>
                      </li>
                      <li>
                        <strong>Quantity:</strong>
                        <span>
                          {seedObject.details.seedCount || "Loading..."}
                        </span>
                      </li>
                    </ul>
                  </section>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <section className="product-status-section card">
              <div className={"card-header"}>
                <div className="utils__title ">
                  <strong className="text-uppercase ">Product Status</strong>
                </div>
              </div>
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
