import React from 'react';
import Layout from "../Layout";
import {setBreadcrumb} from "../../helpers";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProfileCard from "./ProfileCard";

const About = (props) => {
    return (
        <Layout>
            <Row className={'title'}>
                <Col>
                    <h1>Profile</h1>
                </Col>

            </Row>
            <Row>
                <Col>
                    {setBreadcrumb(props.location.pathname)}
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ProfileCard/>
                </Col>
            </Row>
        </Layout>
    );
};

export default About;
