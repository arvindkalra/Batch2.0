import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ProductTable from "./ProductTable";
import BarGraph from "./BarGraph";
import {setBreadcrumb} from "../../helpers";

const Dashboard = (props) => {


    return (<>
            <Row className={'title'}>
                <Col>
                    <h1>Product Details</h1>
                </Col>

            </Row>
            <Row>
                <Col>
                    {setBreadcrumb(props.location.pathname)}
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <section className={'status-tab'}>
                        <h3 className="status-tab-title">
                            Harvest Status
                        </h3>

                            <ProgressBar now={40} label={`${40}%`}/>
                        <p className={'status-tab-description'}>
                          40% of cultivation is ready for harvest
                        </p>

                    </section>
                </Col>
                <Col md={4}>
                    <section className="status-tab">
                        <h3 className="status-tab-title">
                            Annual Target
                        </h3>
                    <ProgressBar now={50} label={`${50}%`}/>
                    <p className={'status-tab-description'}>
                        You have completed  50% of your annual targets
                    </p>
                    </section>
                </Col>
                <Col md={4}>
                    <section className="status-tab">
                        <h3 className="status-tab-title">
                            Inventory Space Available
                        </h3>
                    <ProgressBar now={20} label={`${20}%`}/>
                    <p className={'status-tab-description'}>
                        You have 20% of inventory space available
                    </p>
                    </section>
                </Col>
            </Row>
            <Row>
                <Col md={6} className={'table-col'}>
                    <section className={'dashboard-section'}>
                        <h3 className={'section-title'}>
                            Currently Sown Seeds
                        </h3>

                        <div className={'table-section product-table-dashboard'}>


                            <ProductTable/>


                            <Row>


                                <div className={'ml-auto table-key'}>


                                    <ul>
                                        <li className={'ready-for-harvest'}>
                                            <span className={'key-color'}/> Ready for Harvest
                                        </li>
                                        <li className={'lab-tested'}>
                                            <span className={'key-color'}/> Lab Tested
                                        </li>
                                        <li className={'harvested'}>
                                            <span className={'key-color'}/> Harvested
                                        </li>
                                    </ul>

                                </div>


                            </Row>
                        </div>
                    </section>
                </Col>
                <Col md={{span: 6}} className={'chart-col'}>
                    <section className="dashboard-section">
                        <Row>
                            <Col>
                                <h3 className="section-title">
                                    Seeds Sown in Year 2019
                                </h3>
                            </Col>
                            <Col md={{span: 10, offset: 1}}>

                                <div className={'chart-section'}>


                                    <BarGraph/>


                                </div>
                            </Col>
                        </Row>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;