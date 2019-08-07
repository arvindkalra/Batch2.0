import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {getSeedProgress, setBreadcrumb} from "../../helpers";
import ActionPanel from "../actionPanel/ActionPanel";
import {getSeedUnitDetais} from "../../dbController/farmerRole";
import {connectToMetamask} from "../../dbController/init";

const Product = (props) => {


    const [transactionIsMining, setTransactionIsMining] = useState(false);


    useEffect(() => {
        const buid = parseInt(props.match.params.product);
        connectToMetamask().then(() => {
            console.log('connected to metamask');

            getSeedUnitDetais(buid).then(seedDetails => {
                console.log(seedDetails);
                const seedProgress = getSeedProgress(seedDetails.currentState);
                setProductStatus({state: seedDetails.currentState.captialize(), progress: seedProgress});
                setSeedObject(seedDetails);


            })
        })
    }, [transactionIsMining]);
// TODO progress not showing properly for sent to lab
    const [productStatus, setProductStatus] = useState({state: '', progress: 0});
    const [seedObject, setSeedObject] = useState({details: {}});
    return (
        <Layout>
            <Row className={'title'}>
                <Col>
                    <h1> Product Name: {seedObject.details.plantName}  </h1>

                </Col>

            </Row>
            <Row>
                <Col>
                    {setBreadcrumb(props.location.pathname)}
                </Col>
            </Row>
            <Row>
                <Col>
                    <section className={'product-image-section'}>
                        <img src="https://www.ilovegrowingmarijuana.com/wp-content/uploads/2017/05/Trinity.jpg" alt=""/>
                    </section>
                </Col>
            </Row>
            <Row>
                <Col>
                    <section className={'product-details-section'}>
                        <Row>
                            <Col md={4} className={'product-info-tab'}>
                                <h2>Lineage</h2>
                                <p>
                                    {seedObject.details.lineage}
                                </p>
                            </Col>
                            <Col md={4} className={'product-info-tab'}>
                                <h2>Flowering Time</h2>
                                <p>
                                    {seedObject.details.floweringTime}
                                </p>
                            </Col>
                            <Col md={4} className={'product-info-tab'}>
                                <h2>Current Location</h2>
                                <p>
                                    {seedObject.details.currentLocation}
                                </p>
                            </Col>
                            <Col md={{span: 4, offset: 2}} className={'product-info-tab'}>
                                <h2>Soil Type</h2>
                                <p>
                                    {seedObject.details.soilType}
                                </p>
                            </Col>
                            <Col md={{span: 4}} className={'product-info-tab'}>
                                <h2>Nutrients</h2>
                                <p>
                                    {seedObject.details.nutrients}
                                </p>
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
                                <h2>
                                    Date Planted
                                </h2>
                                <p>
                                    {seedObject.details.datePlanted}
                                </p>

                            </Col>
                            <Col md={4}>
                                <h2>

                                    Batch Id
                                </h2>
                                <p>

                                    #{seedObject.buid}
                                </p>
                            </Col>
                            <Col>
                                <h2>
                                    Quantity
                                </h2>
                                <p>
                                    {seedObject.details.seedCount}
                                </p>

                            </Col>

                        </Row>
                    </section>
                </Col>
                <Col md={12}>
                    <section className="product-status-section">
                        <h3 className="status-tab-title">
                            Product Status
                        </h3>

                        <ProgressBar striped variant="success" now={productStatus.progress}
                                     label={productStatus.state}/>
                        {productStatus.state === 'Sown' ? <p>
                            Current Location:<span className={'info'}>{seedObject.details.location}</span>
                        </p> : null}


                    </section>

                </Col>

            </Row>
            <Row>
                <ActionPanel seedObj={seedObject} productState={productStatus.state}
                             setProductStatus={(newProductStatus) => {
                                 setProductStatus(newProductStatus)
                             }}/>
            </Row>


        </Layout>
    );
};

export default Product;
