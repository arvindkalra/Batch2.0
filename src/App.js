import React from 'react';
import './assets/stylesheets/App.scss';
import Container from "react-bootstrap/es/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";

function App() {

  const handleSelect = e => {
    const currentVal = e.target.value;

  };


    return (<>
            <Jumbotron fluid>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h1>
                                Welcome To Batch
                            </h1>
                            <h4>
                                The 'BlockChain' way of doing bussiness
                            </h4>
                        </Col>
                    </Row>

                </Container>
            </Jumbotron>
            <Container fluid={true}>

                <section className={'login-section'}>

                    <Row>

                        <Col md={12}>
                            <Form.Group>
                                <p className={'description'}>
                                    Choose your role from below
                                </p>
                                <Form.Control as={'select'} onChange={handleSelect}>
                                  <option value="">Select your role </option>
                                  <option value="">Farmer</option>
                                    <option value="">Laboratory</option>
                                    <option value="">Manufacturer</option>
                                    <option value="">Transporter</option>
                                    <option value="">Distributor</option>
                                    <option value="">Retailer</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </section>
            </Container>
        </>
    );
}

export default App;
