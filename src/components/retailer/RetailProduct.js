import React,{useEffect, useState} from 'react';
import Layout from "../Layout";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import RetailerActionForm from "./RetailerActionForm";
import {connectToMetamask} from "../../dbController/init";
import {getPacketUnitDetailsForRetailer} from "../../dbController/retailerRole";


// currentState: "delivered"
// details:
//     deliveryTime: "Mon Aug 05 2019"
// dispatchTime: "Mon Aug 05 2019"
// packetName: "Gummy"
// packetSize: "1.5oz"
// productType: "Preroll"
// __proto__: Object
// packetsSold: 0
// totalPackets: 25
// uid: 1

const RetailProduct = () => {

    const [batchId, setBatchId] = useState('')
    const [currentState, setCurrentState] = useState('')
    const [details, setDetails] = useState({})
    const [totalPackets, setTotalPackets] = useState('')
    const [packetsSold, setPacketsSold] = useState('')

    useEffect(() => {
        connectToMetamask().then( txHash => {
            console.log(txHash);
            getPacketUnitDetailsForRetailer(1).then( obj => {
                console.log(obj.totalPackets);
                setBatchId(obj.uid);
                setCurrentState(obj.currentState);
                setDetails(obj.details);
                setTotalPackets(obj.totalPackets);
                setPacketsSold(obj.packetsSold);


            })
        })
    },[]);

    return (
        <Layout>
            <Row>

                <Col>
                    {setBreadcrumb(`/retailer/products/1`)}
                </Col>
            </Row>
                <section className={'product-details-section'}>
                    <Row>
                        <Col md={4} className={"product-info-tab"}>
                            <h2>Batch Id</h2>
                            <p> 123143434</p>
                        </Col>
                        <Col md={4} className={"product-info-tab"}>
                            <h2>Product Type</h2>
                            <p> Pre roll </p>
                        </Col>
                        <Col md={4} className={"product-info-tab"}>
                            <h2> Units Purchased </h2>
                            <p> {totalPackets} </p>
                        </Col>

                        <Col md={4} className={'product-info-tab'}>
                            <h2> Unit Size</h2>
                            <p>
                                {details.packetSize}
                            </p>
                        </Col>

                        <Col md={4} className={"product-info-tab"}>
                            <h2> Delivered On </h2>
                            <p> {currentState === 'delivered'? <span>{details.deliveryTime}</span> : <span> Not yet Delivered</span> } </p>
                        </Col>
                        <Col md={4} className={'product-info-tab'}>
                            <h2>
                                Dispatched on
                            </h2>
                            <p> {currentState === 'delivered' || currentState === 'dispatched' ? details.dispatchTime: <span> Not yet Dispatched</span> } </p>
                        </Col>

                    </Row>
                </section>

            <section className={'product-status-section'}>
                <Row>
                    <Col md={12}>

                <h3 className="status-tab-title">
                    Product Status
                </h3>
                <ProgressBar striped variant="success" now={(packetsSold/totalPackets)*100}
                             label={(packetsSold/totalPackets)*100 + '' + ' % inventory moved'}/>
                <p>
                    {totalPackets - packetsSold} out of {totalPackets} purchased units left in the inventory
                </p>
                    </Col>
                </Row>
            </section>
            <section className={'retailer-actions-section'}>
                <Row>
                <Col md={12}>
                    <section className={'action-panel-form-section'}>
                        <h1>Action Panel</h1>
                        <RetailerActionForm  puid={batchId} />
                    </section>
                </Col>

                </Row>

            </section>



        </Layout>
    );
};

export default RetailProduct;
