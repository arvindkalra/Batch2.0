import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


import LabBarGraph from "./LabBarGraph";

const ReportForm = () => {
    const [thc, setThc] = useState(0);
    const [cbd, setCbd] = useState(0);
    const [cannabinoids, setCannabinoids] = useState(0);

    return (
        <section>
            <section className={'lab-header-section'}>

                <Row>
                    <Col md={6}>
                        <h1 className={'title'}>
                            Green Labs LLC
                        </h1>

                    </Col>
                    <Col md={6}>
                        <section className={'lab-details-section'}>


                            <p className={'lab-details'}>

                                1234 Market Street, San Francisco CA 94611

                            </p>
                            <p className={'lab-details'}>
                                Tel: <span> +91-987654321 </span> <br/>
                                Email: <a href={'/'} target={'_blank'}> lab@example.com </a> <br/>
                                Website: <a href={'/'} target={'_blank'}> www.example.com </a>

                            </p>
                        </section>

                    </Col>
                </Row>
            </section>
            <section className={'lab-product-details-section'}>

                <Row>
                    <Col>
                        <ul>
                            <li>
                                Farmer: <span> Peter Williams</span>
                            </li>
                            <li>
                                License Number: # <span>LB123456</span>
                            </li>
                            <li>
                                Batch Id: # <span>00AABBCCDD</span>

                            </li>
                            <li> Sample Number: # <span>1</span></li>
                            <li>
                                Date Accepted: <span> 1/1/2019</span>
                            </li>


                        </ul>
                    </Col>
                </Row>

            </section>
            <section className={'lab-report-form'}>
                <Row>
                    <Col md={4}>

                        <Form>
                            <Row>
                                <Col md={12}>
                                    <Form.Group controlId={'thc-content'}>
                                        <Form.Label>
                                            THC MAX
                                        </Form.Label>
                                        <Form.Control min={"0"} max={"100"} type={'number'}
                                                      placeholder={'Enter the THC content'}
                                                      onChange={e => {
                                                          setThc(e.target.value)
                                                      }}/>

                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId={'cbd-content'}>
                                        <Form.Label>
                                            CBDMAX
                                        </Form.Label>
                                        <Form.Control min={"0"} max={"100"} type={'number'}
                                                      placeholder={'Enter the CBD content'}
                                                      onChange={e => {
                                                          setCbd(e.target.value)
                                                      }}/>

                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId={'thc-content'}>
                                        <Form.Label>
                                            Cannabiniods
                                        </Form.Label>
                                        <Form.Control min={"0"} max={"100"} type={'number'}
                                                      placeholder={'Enter the Cannabiniods content'}
                                                      onChange={e => {
                                                          setCannabinoids(e.target.value)
                                                      }}/>

                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group controlId={'report-status'}>
                                        <Form.Label>
                                            Test Result
                                        </Form.Label>
                                        <Form.Control as={'select'}>
                                            <option value="">Passed</option>
                                            <option value=""> Failed</option>

                                        </Form.Control>

                                    </Form.Group>
                                </Col>
                                <Col md={12}>

                                    <Button type={'submit'}> Submit Report </Button>
                                </Col>

                            </Row>
                        </Form>
                    </Col>

                    <Col md={8}>
                        <LabBarGraph labels={['THC %', 'CBD %', 'Cannabinoids %']}
                                     dataArray={[thc, cbd, cannabinoids]}/>

                    </Col>
                </Row>

            </section>

        </section>
    );
};

export default ReportForm;
