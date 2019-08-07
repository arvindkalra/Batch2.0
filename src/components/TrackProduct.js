import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {connectToMetamask, fetchEntireChain} from "../dbController/init";
import '../assets/stylesheets/trackProduct.scss';
import {getFarmerDetails} from "../dbController/farmerRole";
import {getManufacturerDetails} from "../dbController/manufacturerRole";
import {getLaboratoryDetails} from "../dbController/laboratoryRole";
import {getTransporterDetails} from "../dbController/transporterRole";
import {getRetailerDetails} from "../dbController/retailerRole";

const TrackProduct = ({location}) => {
    const [trackingId, setTrackingId] = useState(location.pathname.split('/')[location.pathname.split.length]);
    const [journeyObj, setJourneyObj] = useState({});



    useEffect(() => {
        connectToMetamask().then(() => {
            let tempJourneyObj = {};
            fetchEntireChain(trackingId).then(obj => {
                tempJourneyObj = obj;
                return getFarmerDetails(obj.farmerAddress)
            }).then(({name}) => {
                tempJourneyObj.farmerName = name;
                return getManufacturerDetails(tempJourneyObj.manufacturerAddress)
            }).then(({name}) => {
                tempJourneyObj.manufacturerName = name;
                return getLaboratoryDetails(tempJourneyObj.laboratoryAddress)
            }).then(({name}) => {
                tempJourneyObj.labName = name;
                return getTransporterDetails(tempJourneyObj.farmerToManufacturerTransporterAddress)
            }).then(({name}) => {
                tempJourneyObj.farmToFactoryTransporterName = name;
                return getTransporterDetails(tempJourneyObj.manufacturerToRetailerTransporter)
            }).then(({name}) => {
                tempJourneyObj.factoryToRetailerTransporterName = name;
                return getRetailerDetails(tempJourneyObj.retailerAddress)
            }).then(({name}) => {
                tempJourneyObj.retailerName = name;
                setJourneyObj(tempJourneyObj);
                console.log(tempJourneyObj);


            })
        })

    }, [trackingId]);


    return (
        <Container fluid={true} className={'track-product'}>


            <Row>
                <Col md={12}>
                    <h1 className={'journey-title'}>
                        Product Supply Chain Journey
                    </h1>

                    <p className={'journey-summary'}>
                        Below is the journey of the product you just bought over the Batch Supply Chain <br/> Powered by the Ethereum Blockchain
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={6} className={'story-col'}>
                    <div className={'story-div'}>
                        <h2 className={'story-div-title'}>Retailer</h2>
                        <div className={'info-box'}>
                            <ul>

                                <li>

                                    Address: <span className={'detail'}> {journeyObj.retailerAddress}</span>
                                </li>
                                <li>

                                    Retailer Name: <span className={'detail'}>{journeyObj.retailerName}</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                </Col>
                <Col md={{span: 6, offset: 6}} className={'story-col'}>
                    <div className={'story-div'}>
                        <h2> Transporter </h2>
                        <h3 className={'sub-heading'}> Manufacturer to Retailer </h3>
                        <div className={'info-box'}>
                            <ul>
                                <li>


                                    Name: <span className={'detail'}>{journeyObj.factoryToRetailerTransporterName}</span>

                                </li>
                                <li>
                                    Dispatched on : <span className={'detail'}>{journeyObj.packetsDispatchTime}</span>

                                </li>
                                <li>
                                    Delivered on :  <span className={'detail'}>{journeyObj.packetsDeliveryTime}</span>


                                </li>

                            </ul>
                        </div>

                    </div>
                </Col>


                <Col md={6} className={'story-col'}>
                    <div className={'story-div'}>
                        <h2> Manufacturer </h2>
                        <div className={'info-box'}>
                            <ul>

                                <li>
                                     Name: <span className={'detail'}>{journeyObj.manufacturerName}</span>
                                </li>
                                <li>
                                    Address: <span className={'detail'}>{journeyObj.manufacturerAddress}</span>

                                </li>
                                <li>
                                     Packed on: <span className={'detail'}> {journeyObj.packedOn}</span>
                                </li>
                                <li>
                                    Packet Size : <span className={'detail'}>{journeyObj.packetSize}</span>
                                </li>
                                <li>
                                    Product Name: <span className={'detail'}> {journeyObj.packetName}</span>
                                </li>
                                <li>
                                    Product Type: <span className={'detail'}> {journeyObj.productType}</span>
                                </li>
                            </ul>

                        </div>
                    </div>
                </Col>
                <Col md={{span: 6, offset: 6}} className={'story-col'}>
                    <div className="story-div">
                        <h2> Transporter </h2>
                        <h3 className={'sub-heading'}> Farmer to Manufacturer </h3>
                        <div className={'info-box'}>
                            <ul>


                                <li>
                                    Name: <span className={'detail'}> {journeyObj.farmToFactoryTransporterName}</span>

                                </li>
                                <li>
                                    Dispatched on: <span className={'detail'}> {journeyObj.harvestDispatchTime}</span>

                                </li>
                                <li>
                                    Delivered on : <span className={'detail'}> {journeyObj.harvestDeliveryTime}</span>
                                </li>
                                

                            </ul>
                        </div>
                    </div>
                </Col>
                <Col md={6} className={'story-col'}>
                    <div className={'story-div'}>
                        <h2>Laboratory</h2>
                        <div className={'info-box'}>
                            <ul>
                                <li>
                                    Address: <span className={'detail'}> {journeyObj.laboratoryAddress}</span>

                                </li>
                                <li>
                                    Test Submitted on: <span className={'detail'}>{journeyObj.testedOn}</span>
                                </li>
                                <li>
                                    <ul className={'horizontal-list'}>
                                        <li> CBD <br/> <span className={'detail'}> {journeyObj.cbd} %</span> </li>
                                        <li>
                                            THC <br/><span className={'detail'}>{journeyObj.thc} %</span>
                                        </li>
                                        <li>
                                            Cannabinoids <br/> <span className={'detail'}> {journeyObj.cannabinoids} %</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col md={{span: 6, offset: 6}} className={'story-col'}>
                    <div className={'story-div'}>
                        <h2> Farmer</h2>
                        <div className={'info-box'}>
                            <ul>
                                <li>
                                    Name : <span className={'detail'}> {journeyObj.farmerName}</span>

                                </li>
                                <li>
                                    Planted on : <span className={'detail'}>{journeyObj.datePlanted}</span>
                                </li>
                                <li>
                                    Harvested on : <span className={'detail'}>{journeyObj.harvestTime}</span>
                                </li>


                                <li>
                                    Number of Seeds Sown: <span className={'detail'}>{journeyObj.seedCount}</span>
                                </li>

                                <li>
                                    Sent to lab on : <span className={'detail'}>{journeyObj.sentToLabOn}</span>
                                </li>
                                <li>
                                    <ul className={'horizontal-list'}>
                                        <li>
                                            Lineage <br/> <span className={'detail'}> {journeyObj.lineage} </span>
                                        </li>
                                        <li>
                                            Flowering Time <br/> <span className={'detail'}> {journeyObj.floweringTime} </span>
                                        </li>
                                        <li>
                                            Nutrients <br/> <span className={'detail'}> {journeyObj.nutrients}  </span>
                                        </li>
                                        <li>
                                            Soil Type <br/> <span className={'detail'}>{journeyObj.soilType}  </span>
                                        </li>

                                    </ul>
                                </li>


                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    );
};

export default TrackProduct;
