import React from 'react';
import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';
import '../farmer.scss';
import Dashboard from "./Dashboard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const Farmer = () => {
    return (
        <Container fluid={true}>
            <Row>
                <Col>

                    <Navbar>
                        <Navbar.Brand href="/">
                            Batch
                        </Navbar.Brand>
                        <Navbar.Collapse className={'justify-content-end'}>
                            <Navbar.Text className={'profile-name'}>Peter Williams </Navbar.Text>
                            <img src="https://picsum.photos/id/1074/50" alt="" className={'profile-image'}/>

                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>

            <Dashboard/>
        </Container>
    );
};

export default Farmer;
