import React from 'react';
import Layout from "../Layout";
import {setBreadcrumb} from "../../helpers";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/Col";

const DistDashboard = ({location}) => {
    return (
        <>
           <Row>
               <Col md={12}>
                   {setBreadcrumb(location.pathname)}
               </Col>
           </Row>
        </>

    );
};

export default DistDashboard;
