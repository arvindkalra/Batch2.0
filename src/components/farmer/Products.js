import React from 'react';
import Row from "react-bootstrap/Row";
import Layout from "../Layout";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import CompleteProductsTable from "./CompleteProductsTable";

const Products = ({location}) => {


    return (
        <Layout>
            <Row>
                <Col md={12}>
                    {setBreadcrumb(location.pathname)}
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <CompleteProductsTable/>

                    <Col md={{span: 4, offset: 4}}>
                        <p className={'center-align'}>Load more</p>
                    </Col>
                </Col>

            </Row>

        </Layout>
    );
};

export default Products;
