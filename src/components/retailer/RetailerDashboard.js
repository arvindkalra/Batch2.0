import React from 'react';
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import '../../assets/stylesheets/App.scss';

const RetailerDashboard = ({location}) => {
    return (
        <>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>

            </Row>
            <Row>
                <Col md={6}>
                    <section className={'status-tab'}>
                        <h3 className={'status-tab-title'}>
                            Products received
                        </h3>
                        <ProgressBar now={40} label={`${40}%`}/>
                        <p className={'status-tab-description'}>
                            40% of the Sales targets met
                        </p>

                    </section>
                </Col>
                <Col md={6}>
                    <section className={'status-tab'}>
                        <h3 className={'status-tab-title'}>
                            Inventory status</h3>
                        <ProgressBar now={80} label={`${80}%`}/>
                        <p className={'status-tab-description'}>
                            80% of inventory cleared
                        </p>
                    </section>
                </Col>
            </Row>

        </>
    );
};

export default RetailerDashboard;
