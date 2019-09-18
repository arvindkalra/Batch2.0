import React,{useEffect} from 'react';
import Layout from "../Layout";
import Col from "react-bootstrap/Col";
import {makeXHR, setBreadcrumb} from "../../helpers";
import Row from "react-bootstrap/Row";
import {Table} from "react-bootstrap";
import config from "../../config";

const PurchaseOrder = ({history,location,match}) => {
    const orderId = match.params.id;
    useEffect(()=>{
        console.log(orderId)
    })
    return (
        <Layout history={history} location={location}>
            <Row>
                <Col>{setBreadcrumb(location.pathname)}</Col>
            </Row>
            <Row>
                <Col>
                    <section className={'table-section card'}>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Retailer</th>
                            <th>Ordered Quantity</th>
                            <th>Available</th>
                            <th>Price( $ x.xx / unit)</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                    </section>

                </Col>
            </Row>
        </Layout>
    );
};

export default PurchaseOrder;
