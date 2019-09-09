import React from 'react';
import Row from "react-bootstrap/Row";
import Layout from "../Layout";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import CompleteProductsTable from "./CompleteProductsTable";

const Products = ({location, history}) => {


    return (
        <Layout location={location} history={history}>
            <Row>
                <Col md={12}>
                    {setBreadcrumb(location.pathname)}
                </Col>
            </Row>
            <Row>
                <Col md={12} className={"farmer-all-products"}>
                    <CompleteProductsTable/>
                </Col>

            </Row>

        </Layout>
    );
};

export default Products;
