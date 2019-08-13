import React from 'react';
import Layout from "../Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {setBreadcrumb} from "../../helpers";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewHarvest = ({location}) => {
    return (
        <Layout>

            <Row>
                <Col>
                    {setBreadcrumb(location.pathname)}
                </Col>
            </Row>
            <section className={'new-harvest-form-section'}>
                <Row>
                    <Col md={{span: 8, offset: 2}}>
                        <Form>
                            <Row>
                                <Col md={12}>
                                    <h1> Register a new Plant </h1>
                                </Col>

                                <Col md={12}>
                                    <Form.Group controlId={'lineage'}>
                                        <Form.Label>
                                            Lineage
                                        </Form.Label>
                                        <Form.Control as={'select'} placeholder={'Select Lineage'}>
                                            <option value=""> line1</option>
                                            <option value=""> line2</option>
                                            <option value=""> line3</option>
                                        </Form.Control>
                                    </Form.Group>

                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId={'flowering-time'}>
                                        <Form.Label>
                                            Flowering Time
                                        </Form.Label>
                                        <Form.Control as={'select'}>
                                            <option value="">10-20 days</option>
                                            <option value="">20-30 days</option>
                                            <option value="">30-40 days</option>
                                            <option value="">50-60 days</option>
                                            <option value="">60-70 days</option>
                                            <option value="">70-80 days</option>
                                        </Form.Control>


                                    </Form.Group>

                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId={'flowering-time'}>
                                        <Form.Label>
                                            Where is the plant sowed
                                        </Form.Label>
                                        <Form.Control as={'select'}>
                                            <option value="">Green House</option>
                                            <option value="">Outdoor Farm</option>

                                        </Form.Control>


                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>
                                            Soil Type
                                        </Form.Label>
                                        <Form.Control as={'select'}>
                                            <option value="">Slightly Acidic</option>
                                            <option value="">Another Soil Type</option>
                                            <option value="">Yet Another Soil Type</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>

                                            Nutrients
                                        </Form.Label>
                                        <Form.Control type={'text'}
                                                      placeholder={'Enter the Nutritional Information about the plant'}/>

                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>
                                            Quantity
                                        </Form.Label>
                                        <Form.Control type={'number'}
                                                      placeholder={'Enter the number of seeds you have sown'}/>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Button type={'submit'}> Register new Harvest </Button>
                                </Col>


                            </Row>
                        </Form>
                    </Col>
                </Row>
            </section>
        </Layout>
    );
};

export default NewHarvest;
