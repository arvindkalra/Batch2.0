import React,{useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {setFarmerDetails} from "../../dbController/farmerRole";

const ProfileCard = () => {

    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [license, setLicense] = useState('')

    const handleClick = e =>{
        e.preventDefault();
        e.stopPropagation();
        // setFarmerDetails({name,companyName,address, license:"license goes here"});
    }
    return (
        <section className={'profile-section'}>
            <Row>
                <Col md={4}>
                    <section className={'profile-image-section'}>
                    <img src="https://picsum.photos/id/1074/480" alt="" className={'profile-image'}/>
                    </section>
                </Col>
                <Col md={8}>
                    <Form>
                        <Row>
                            <Col md={6}>
                              <Form.Group controlId={'farmer-name'}>
                                  <Form.Label>
                                      Name
                                  </Form.Label>
                                  <Form.Control type={'text'} placeholder={'Enter the name as it appears on your license'} onChange={e => {setName(e.target.Value)}} />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={'farmer-company-name'}>
                                    <Form.Label>
                                        Company Name
                                    </Form.Label>
                                    <Form.Control type={'text'} placeholder={'Enter the name of your company as it appears on your license'} onChange={e => {setCompanyName(e.target.Value)}} />
                                </Form.Group>

                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={'farmer-farm-address'}>
                                    <Form.Label>
                                        Farm Location
                                    </Form.Label>
                                    <Form.Control type={'textarea'} placeholder={'Enter the address of your farm as it appears on your license'} onChange={e => {setAddress(e.target.Value)}} />
                                </Form.Group>

                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={'farmer-license'} >
                                    <Form.Label className={'custom-file-label'}>
                                        License
                                    </Form.Label>
                                    <Form.Control className={'custom-file-input'} type={'file'} placeholder={'Enter your License Number'} onChange={e =>{setLicense(e.target.files[0])}} />
                                </Form.Group>

                            </Col>
                            <Col md={{span:4, offset:4}}>
                                <Button type={'submit'} onClick={handleClick} > Save Details </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>

            </Row>
</section>
)
};

export default ProfileCard;
