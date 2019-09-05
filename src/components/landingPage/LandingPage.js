import React from 'react';
import {Col, Row} from "react-bootstrap";
import '../../assets/stylesheets/LandingPage.scss'
import AdminTab from "./AdminTab";

const LandingPage = ({dashboards}) => {
    return (
        <main>
            <Row>
                <Col md={12}>
                    <div className="utils__title ">
                        <strong className="text-uppercase ">
                            Admin Panel
                        </strong>
                    </div>
                </Col>
            </Row>
            <Row>
                {dashboards.map(role => {
                    return (

                        <AdminTab key={role} role={role}/>
                    )
                })}

            </Row>
        </main>
    );
};

export default LandingPage;
