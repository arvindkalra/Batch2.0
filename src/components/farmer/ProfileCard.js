import React, {useEffect, useRef, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {getFarmerDetails, setFarmerDetails} from "../../dbController/farmerRole";
import {fileToString} from "../../helpers";
import {connectToMetamask} from "../../dbController/init";

const ProfileCard = () => {


    const [name, setName] = useState('Peter Willams');
    const [companyName, setCompanyName] = useState('Awesome Farmers');
    const [address, setAddress] = useState('route 66');
    const [license, setLicense] = useState('');
    const [profileImage, setProfileImage] = useState('https://picsum.photos/id/1074/480');
    const profileImageSetterRef = useRef(null);
    const profileImageRef = useRef(null);
    useEffect(() => {
        connectToMetamask().then(() => {

            getFarmerDetails('0x627306090abaB3A6e1400e9345bC60c78a8BEf57').then(farmerObj => {
                console.log(farmerObj);
                setName(farmerObj.name);
                setCompanyName(farmerObj.companyName);
                setAddress(farmerObj.address);
                setLicense(farmerObj.license);
                setProfileImage(farmerObj.profileImage)

            })
        })
    }, []);

    const openLicense = e => {
        e.target.download = 'test_download.pdf'
    }

    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        setFarmerDetails({name, companyName, address, license, profileImage}).then((txHash) => {
            console.log(txHash);
            console.log("details upadted")
        })
    };
    const handleImageUpload = e => {
        fileToString(e.target.files[0]).then(result => {
            console.log(result);
            const imagePath = result;

            setProfileImage(imagePath);
        })

    };

    const handleLicenseUpload = e => {

        fileToString((e.target.files[0])).then(result => {
            console.log(result);
            setLicense(result);

        })
    };

    const uploadProfileImage = e => {
        profileImageSetterRef.current.click()
    };


    return (
        <section className={'profile-section'}>
            <Form>
                <Row>
                    <Col md={4}>
                        <section className={'profile-image-section'}>
                            <img src={profileImage} alt="" className={'profile-image'} ref={profileImageRef}/>
                            <div className={'image-overlay'} onClick={uploadProfileImage}>

                                <Form.Control type={'file'} className={'hidden'} ref={profileImageSetterRef}
                                              onChange={handleImageUpload}/>

                                <section className={'upload-button-section'}>
                                    <p> Upload New Image</p>
                                    <p>
                                        <i className="fas fa-camera"></i>
                                    </p>
                                </section>

                            </div>

                        </section>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId={'farmer-name'}>
                                    <Form.Label>
                                        Name
                                    </Form.Label>
                                    <Form.Control type={'text'}
                                                  placeholder={'Enter the name as it appears on your license'}
                                                  onChange={e => {
                                                      setName(e.target.value)
                                                  }} value={name}/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={'farmer-company-name'}>
                                    <Form.Label>
                                        Company Name
                                    </Form.Label>
                                    <Form.Control type={'text'}
                                                  placeholder={'Enter the name of your company as it appears on your license'}
                                                  onChange={e => {
                                                      setCompanyName(e.target.value)
                                                  }} value={companyName}/>
                                </Form.Group>

                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={'farmer-farm-address'}>
                                    <Form.Label>
                                        Farm Location
                                    </Form.Label>
                                    <Form.Control type={'textarea'}
                                                  placeholder={'Enter the address of your farm as it appears on your license'}
                                                  onChange={e => {
                                                      setAddress(e.target.value)
                                                  }} value={address}/>
                                </Form.Group>

                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={'farmer-license'}>

                                    {license ? <a href={license} target={'_blank'} onClick={openLicense} > view license </a> :
                                        <>
                                            <Form.Label className={'custom-file-label'}>
                                                License
                                            </Form.Label>
                                            <Form.Control className={'custom-file-input'} type={'file'}
                                                          placeholder={'Enter your License Number'}
                                                          onChange={handleLicenseUpload}/>
                                        </>}


                                </Form.Group>

                            </Col>
                            <Col md={{span: 4, offset: 4}}>
                                <Button type={'submit'} onClick={handleClick}> Save Details </Button>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Form>
        </section>
    )
};

export default ProfileCard;
