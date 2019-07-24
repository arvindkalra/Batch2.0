import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductTable from "./ProductTable";

const Dashboard = () => {
    return (<>
            <Row className={'title'}>
                <Col>
                    <h1>Dashboard</h1>
                </Col>

            </Row>
            <Row>
                <Col md={6} className={'table-col'}>
                    <div className={'table-section product-table-dashboard'}>

                        <ProductTable />

                        <Row>

                            <div className={'ml-auto table-key'}>


                                <ul>
                                    <li className={'ready-for-harvest'}>
                                        <span className={'key-color'}></span> Ready for Harvest
                                    </li>
                                    <li className={'lab-tested'}>
                                        <span className={'key-color'}></span> Lab Tested
                                    </li>
                                    <li className={'harvested'}>
                                        <span className={'key-color'}></span> Harvested
                                    </li>
                                </ul>

                            </div>


                        </Row>
                    </div>
                </Col>
                <Col md={6} className={'chart-col'}>
                    <div className={'chart-section'}>

                    </div>
                </Col>

            </Row>
        </>
    );
};

export default Dashboard;
