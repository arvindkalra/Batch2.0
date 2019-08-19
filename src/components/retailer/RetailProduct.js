import React, {useEffect, useState} from "react";
import Layout from "../Layout";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import RetailerActionForm from "./RetailerActionForm";
import {connectToMetamask} from "../../dbController/init";
import {fetchBatchUnitDetailsUsingUID} from "../../dbController/distributorRole";
import {fetchProductUnitDetailsUsingUID} from "../../dbController/manufacturerRole";
import SaleActionForm from "./SaleActionForm";

const RetailProduct = props => {
    const [batchId, setBatchId] = useState("");
    const [currentState, setCurrentState] = useState("");
    const [details, setDetails] = useState({});
    const [totalPackets, setTotalPackets] = useState("");
    const [packetsSold, setPacketsSold] = useState("");

    useEffect(() => {
        connectToMetamask().then(txHash => {
            let puid = props.match.params.id;
            let batchUnit;
            fetchBatchUnitDetailsUsingUID(puid)
                .then(obj => {
                    batchUnit = obj;
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
                });
        });
    }, []);

    return (
        <Layout location={props.location}>
            <Row>
                <Col>
                    {setBreadcrumb(
                        `/retailer/products/${details.packetName || "Loading Name..."}`
                    )}
                </Col>
            </Row>
            <section className={"product-details-section"}>
                <Row>
                    <Col md={4} className={"product-info-tab"}>
                        <h2>Unique ID</h2>
                        <p># {batchId}</p>
                    </Col>
                    <Col md={4} className={"product-info-tab"}>
                        <h2>Product Type</h2>
                        <p>{details.productType}</p>
                    </Col>
                    <Col md={4} className={"product-info-tab"}>
                        <h2>Total Packets Purchased</h2>
                        <p> {totalPackets} </p>
                    </Col>

                    <Col md={4} className={"product-info-tab"}>
                        <h2>Units Per Packet</h2>
                        <p>{details.unitsPerPacket}</p>
                    </Col>

                    <Col md={4} className={"product-info-tab"}>
                        <h2> Delivered On </h2>
                        <p>
                            {" "}
                            {currentState.value === 4 ? (
                                <span>{details.distributorToRetailerDeliveryTime}</span>
                            ) : (
                                <span> Not yet Delivered</span>
                            )}{" "}
                        </p>
                    </Col>
                    <Col md={4} className={"product-info-tab"}>
                        <h2>Dispatched on</h2>
                        <p>
                            {" "}
                            {currentState.value >= 3 ? (
                                <span>{details.distributorToRetailerDispatchTime}</span>
                            ) : (
                                <span> Not yet Dispatched</span>
                            )}{" "}
                        </p>
                    </Col>
                </Row>
            </section>

            <section className={"product-status-section"}>
                <Row>
                    <Col md={12}>
                        <h3 className="status-tab-title">Product Status</h3>
                        <ProgressBar
                            striped
                            variant="success"
                            now={packetsSold ? (packetsSold / totalPackets) * 100 : 0}
                            label={
                                packetsSold
                                    ? (packetsSold / totalPackets) * 100 +
                                    "" +
                                    " % inventory moved"
                                    : "None Sold Yet"
                            }
                        />
                        <p>
                            {totalPackets - packetsSold} out of {totalPackets} purchased units
                            left in the inventory
                        </p>
                    </Col>
                </Row>
            </section>
            <section className={"retailer-actions-section"}>
                <Row>
                    <Col md={12}>
                        <section className={"action-panel-form-section"}>
                            <h1>Action Panel</h1>
                            <SaleActionForm details={details} buid={batchId}/>
                        </section>
                    </Col>
                </Row>
            </section>
        </Layout>
    );
};

export default RetailProduct;
