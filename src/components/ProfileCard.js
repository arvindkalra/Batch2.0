import React, {useEffect, useRef, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {getFarmerDetails, setFarmerDetails} from "../dbController/farmerRole";
import {fileToString} from "../helpers";
import {checkMined, connectToMetamask, OWN_ADDRESS} from "../dbController/init";
import {getLaboratoryDetails, setLaboratoryDetails} from "../dbController/laboratoryRole";
import {getManufacturerDetails, setManufacturerDetails} from "../dbController/manufacturerRole";
import {getDistributorDetails, setDistributorDetails} from "../dbController/distributorRole";
import {getTransporterDetails, setTransporterDetails} from "../dbController/transporterRole";
import {getRetailerDetails, setRetailerDetails} from "../dbController/retailerRole";
import Loader from "./Loader";

const ProfileCard = ({role}) => {


    const [name, setName] = useState('Peter Willams');
    const [companyName, setCompanyName] = useState('Awesome Cultivators');
    const [address, setAddress] = useState('route 66');
    const [license, setLicense] = useState('');
    const [profileImage, setProfileImage] = useState('https://picsum.photos/id/1074/480');
    const profileImageSetterRef = useRef(null);
    const profileImageRef = useRef(null);
    const [transactionMining, setTransactionMining] = useState(false);
    useEffect(() => {
        connectToMetamask().then(() => {


            if (role === 'farmer') {

                getFarmerDetails(OWN_ADDRESS).then(farmerObj => {

                    setName(farmerObj.name);
                    setCompanyName(farmerObj.companyName);
                    setAddress(farmerObj.address);
                    setLicense(farmerObj.license);

                    setProfileImage(farmerObj.profileImage)

                })
            } else if (role === 'laboratory') {
                getLaboratoryDetails(OWN_ADDRESS).then(infoObject => {
                    setName(infoObject.name);
                    setCompanyName(infoObject.companyName);
                    setAddress(infoObject.address);
                    setLicense(infoObject.license);
                    if (infoObject.profileImage) {

                        setProfileImage(infoObject.profileImage)
                    }
                })
            } else if (role === 'manufacturer') {
                getManufacturerDetails(OWN_ADDRESS).then(infoObject => {
                    setName(infoObject.name);
                    setCompanyName(infoObject.name);
                    setAddress(infoObject.address);
                    setLicense(infoObject.license);
                    if (infoObject.profileImage) {
                        setProfileImage(infoObject.profileImage)
                    }
                })
            } else if (role === 'distributor') {
                getDistributorDetails(OWN_ADDRESS).then(infoObject => {

                    setName(infoObject.name);
                    setCompanyName(infoObject.name);
                    setAddress(infoObject.address);
                    setLicense(infoObject.license);
                    if (infoObject.profileImage) {
                        setProfileImage(infoObject.profileImage)
                    }
                })
            } else if (role === 'transporter') {
                getTransporterDetails(OWN_ADDRESS).then(infoObject => {


                    setName(infoObject.name);
                    setCompanyName(infoObject.name);
                    setAddress(infoObject.address);
                    setLicense(infoObject.license);
                    if (infoObject.profileImage) {
                        setProfileImage(infoObject.profileImage)
                    }
                })
            } else if (role === 'retailer') {
                getRetailerDetails(OWN_ADDRESS).then(infoObject => {


                    setName(infoObject.name);
                    setCompanyName(infoObject.name);
                    setAddress(infoObject.address);
                    setLicense(infoObject.license);
                    if (infoObject.profileImage) {
                        setProfileImage(infoObject.profileImage)
                    }
                })
            }
        })
    }, []);

    const openLicense = e => {
        e.target.download = 'test_download.pdf'
    };

    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        setTransactionMining(true);
        if (role === 'farmer') {

            setFarmerDetails({name, companyName, address, license, profileImage}).then((txHash) => {
                console.log(txHash);

            })
        } else if (role === 'laboratory') {
            setLaboratoryDetails({name, companyName, address, license, profileImage}).then(txHash => {
                checkMined(txHash, () => window.location.reload());
                console.log(txHash)
            })
        } else if (role === 'manufacturer') {
            setManufacturerDetails({name, companyName, address, license, profileImage}).then(txHash => {
                checkMined(txHash, () => window.location.reload());
                console.log(txHash)
            })
        } else if (role === 'distributor') {
            setDistributorDetails({name, companyName, address, license, profileImage}).then(txHash => {
                checkMined(txHash, () => window.location.reload());
                console.log(txHash)
            })
        } else if (role === 'transporter') {
            setTransporterDetails({name, companyName, address, license, profileImage}).then(txHash => {
                checkMined(txHash, () => window.location.reload());
                console.log(txHash)
            })
        } else if (role === 'retailer') {
            setRetailerDetails({name, companyName, address, license, profileImage}).then(txHash => {
                checkMined(txHash, () => window.location.reload());
                console.log(txHash)
            })
        }

    };
    const handleImageUpload = e => {
        fileToString(e.target.files[0]).then(result => {

            const imagePath = result;

            setProfileImage(imagePath);
        })

    };

    const handleLicenseUpload = e => {

        fileToString((e.target.files[0])).then(result => {

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
                            <img src={profileImage || 'https://picsum.photos/id/1074/450'} alt=""
                                 className={'profile-image'} ref={profileImageRef}/>
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

                                <Form.Group controlId={'address'}>
                                    <Form.Label>
                                        Address
                                    </Form.Label>
                                    <Form.Control type={'text'}
                                                  placeholder={'Enter Your Address'}
                                                  onChange={e => {
                                                      setAddress(e.target.value)
                                                  }} value={address || ''}/>
                                </Form.Group>

                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={'license'}>

                                    {license ?
                                        <a href={license} target={'_blank'} onClick={openLicense}> view license </a> :
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
            {transactionMining ? <Loader/> : null}
        </section>
    )
};

export default ProfileCard;
