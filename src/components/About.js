import React,{useEffect} from 'react';
import Layout from "./Layout";
import {setBreadcrumb} from "../helpers";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProfileCard from "./ProfileCard";
import {connectToMetamask} from "../dbController/init";

const About = (props) => {
    useEffect(()=> {
        connectToMetamask()
    })

    return (
        <Layout>
            <Row>
                <Col>
                    {setBreadcrumb(props.location.pathname)}
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <p className={'description'}>
                        Fill your details below
                    </p>
                </Col>
                <Col md={12}>
                    <ProfileCard role={props.location.pathname.split('/')[1]} />
                </Col>
            </Row>
        </Layout>
    );
};

export default About;
