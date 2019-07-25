import React from 'react';
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {setBreadcrumb} from "../../helpers";

const Product = (props) => {
    console.log(props)
    return (
        <Layout>
            <Row className={'title'}>
                <Col>
                    <h1> Product Name:  {props.match.params.product.captialize()} </h1>
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
                            <Col md={4}>
                                <h2>Lineage</h2>
                                <p>
                                    Urkle
                                </p>
                            </Col>
                            <Col md={4}>
                                <h2>Flowering Time</h2>
                                <p>
                                    65 Days
                                </p>
                            </Col>
                            <Col md={4}>
                                <h2>Lineage</h2>
                                <p>
                                    Urkle
                                </p>
                            </Col>
                            <Col md={4}>
                                <h2>Lineage</h2>
                                <p>
                                    Urkle
                                </p>
                            </Col>
                            <Col md={4}>
                                <h2>Flowering Time</h2>
                                <p>
                                    65 Days
                                </p>
                            </Col>
                            <Col md={4}>
                                <h2>Lineage</h2>
                                <p>
                                    Urkle
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
                                    04/23/19
                                </p>

                            </Col>
                            <Col md={4}>
                                <h2>

                                Batch Id
                                </h2>
                                <p>

                                #00PPQQRRSS
                                </p>
                            </Col>
                            <Col>
                                <h2>
                                    Quantity
                                </h2>
                                <p>
                                    100
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
                        <ProgressBar variant="info" now={20} label={'Sown'} />

                    </section>
                </Col>
            </Row>
            <Row>

            </Row>


        </Layout>
    );
};

export default Product;
