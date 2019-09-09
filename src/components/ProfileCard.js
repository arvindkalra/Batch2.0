import React, { useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getFarmerDetails, setFarmerDetails } from "../dbController/farmerRole";
import { createTransactionModal, fileToString } from "../helpers";
import { checkMined, connectToMetamask } from "../dbController/init";
import {
  getLaboratoryDetails,
  setLaboratoryDetails
} from "../dbController/laboratoryRole";
import {
  getManufacturerDetails,
  setManufacturerDetails
} from "../dbController/manufacturerRole";
import {
  getDistributorDetails,
  setDistributorDetails
} from "../dbController/distributorRole";
import {
  getTransporterDetails,
  setTransporterDetails
} from "../dbController/transporterRole";
import {
  getRetailerDetails,
  setRetailerDetails
} from "../dbController/retailerRole";
import Loader from "./Loader";
import { Card } from "react-bootstrap";

const ProfileCard = ({ role, history, stopLoading }) => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [license, setLicense] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseType, setLicenseType] = useState("Light Tier 2");
  const [profileImage, setProfileImage] = useState(
    "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png"
  );
  const profileImageSetterRef = useRef(null);
  const profileImageRef = useRef(null);
  const [prevObject, setPrevObject] = useState({});
  const [transactionMining, setTransactionMining] = useState(false);
  const [transactionObject, setTransactionObject] = useState(null);

  useEffect(() => {
    connectToMetamask().then(() => {
      if (role === "cultivator") {
        getFarmerDetails().then(setStates);
      } else if (role === "laboratory") {
        getLaboratoryDetails().then(setStates);
      } else if (role === "manufacturer") {
        getManufacturerDetails().then(setStates);
      } else if (role === "distributor") {
        getDistributorDetails().then(setStates);
      } else if (role === "transporter") {
        getTransporterDetails().then(setStates);
      } else if (role === "retailer") {
        getRetailerDetails().then(setStates);
      }
    });
  }, []);

  const setStates = obj => {
    setPrevObject(obj);
    if(typeof obj !== 'undefined'){

    if (obj.name) setName(obj.name);
    if (obj.companyName) setCompanyName(obj.companyName);
    if (obj.address) setAddress(obj.address);
    if (obj.licenseType) setLicenseType(obj.licenseType);
    if (obj.profileImage) setProfileImage(obj.profileImage);
    if (obj.license) setLicense(obj.license);
    if (obj.licenseNumber) setLicenseNumber(obj.licenseNumber);
    }
    stopLoading();
  };

  const openLicense = e => {
    e.target.download = "license.pdf";
  };

  const redirectToDashboard = () => {
    history.push(`/${role}/dashboard`);
  };

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    let objToSet = {
      name,
      companyName,
      address,
      license,
      licenseType,
      licenseNumber,
      profileImage
    };
    if (JSON.stringify(objToSet) === JSON.stringify(prevObject)) {
      redirectToDashboard();
      return;
    }
    setTransactionMining(true);
    if (role === "cultivator") {
      setFarmerDetails(objToSet, openSignatureModal).then(txHash => {
        checkMined(txHash, redirectToDashboard);
      });
    } else if (role === "laboratory") {
      setLaboratoryDetails(objToSet, openSignatureModal).then(txHash => {
        checkMined(txHash, redirectToDashboard);
      });
    } else if (role === "manufacturer") {
      setManufacturerDetails(objToSet, openSignatureModal).then(txHash => {
        checkMined(txHash, redirectToDashboard);
      });
    } else if (role === "distributor") {
      setDistributorDetails(objToSet, openSignatureModal).then(txHash => {
        checkMined(txHash, redirectToDashboard);
      });
    } else if (role === "transporter") {
      setTransporterDetails(objToSet, openSignatureModal).then(txHash => {
        checkMined(txHash, redirectToDashboard);
      });
    } else if (role === "retailer") {
      setRetailerDetails(objToSet, openSignatureModal).then(txHash => {
        checkMined(txHash, redirectToDashboard);
      });
    }
  };

  const openSignatureModal = obj => {
    setTransactionObject({
      ...obj,
      showModal: true,
      setShowModal: () => {
        setTransactionObject(null);
      },
      cancel: () => {
        setTransactionMining(false);
        setTransactionObject(null);
      }
    });
  };

  const handleImageUpload = e => {
    fileToString(e.target.files[0]).then(result => {
      setProfileImage(result);
    });
  };

  const handleLicenseUpload = e => {
    fileToString(e.target.files[0]).then(result => {
      setLicense(result);
    });
  };

  const uploadProfileImage = e => {
    profileImageSetterRef.current.click();
  };

  return (
    <section className={"profile-section"}>
      <Form>
        <Row>
          <Col md={4}>
            <section className={"profile-image-section card"}>
              
              <img
                src={profileImage || "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png"}
                alt=""
                className={"profile-image"}
                ref={profileImageRef}
              />
              <div className={"image-overlay"} onClick={uploadProfileImage}>
                <Form.Control
                  type={"file"}
                  className={"hidden"}
                  ref={profileImageSetterRef}
                  onChange={handleImageUpload}
                />

                <section className={"upload-button-section"}>
                  <p> Upload New Image</p>
                  <p>
                    <i className="fas fa-camera" />
                  </p>
                </section>
              </div>
            </section>
          </Col>
          <Col md={8}>
            <Card>
              <div className={"card-header action-panel-head"}>
                <strong className={"utils__title"}>
                  Fill Your Details Below
                </strong>
              </div>
              <Row>
                <Col md={6}>
                  <Form.Group controlId={"farmer-name"}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type={"text"}
                      placeholder={"Enter Contact Name"}
                      onChange={e => {
                        setName(e.target.value);
                      }}
                      value={name}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId={"farmer-company-name"}>
                    <Form.Label>Legal Business Name</Form.Label>
                    <Form.Control
                      type={"text"}
                      placeholder={"Enter Business Name"}
                      onChange={e => {
                        setCompanyName(e.target.value);
                      }}
                      value={companyName}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId={"address"}>
                    <Form.Label>Premises Address</Form.Label>
                    <Form.Control
                      type={"text"}
                      placeholder={"Enter Address"}
                      onChange={e => {
                        setAddress(e.target.value);
                      }}
                      value={address}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId={"license-number"}>
                    <Form.Label>License Number</Form.Label>
                    <Form.Control
                      type={"text"}
                      placeholder={"Enter Your License Number"}
                      onChange={e => setLicenseNumber(e.target.value)}
                      value={licenseNumber}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId={"license-type"}>
                    <Form.Label>License Type</Form.Label>
                    <Form.Control
                      as={"select"}
                      value={licenseType}
                      onChange={e => setLicenseType(e.target.value)}
                    >
                      <option value="Light Tier 2">Light Tier 2</option>
                      <option value="Lab123">LAB123</option>
                      <option value="Manufacturing Lite">
                        Manufacturing Lite
                      </option>
                      <option value="Small Enterprise">Small Enterprise</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {license ? (
                    <a
                      href={license}
                      className={"license-link"}
                      target={"_blank"}
                      onClick={openLicense}
                    >
                      {" "}
                      view license{" "}
                    </a>
                  ) : (
                    <>
                      <Form.Group controlId={"license"}>
                        <Form.Label className={"custom-file-label"}>
                          License
                        </Form.Label>
                        <Form.Control
                          className={"custom-file-input"}
                          type={"file"}
                          placeholder={"Enter your License Number"}
                          onChange={handleLicenseUpload}
                        />
                      </Form.Group>
                    </>
                  )}
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                  <Button type={"submit"} onClick={handleClick}>
                    {" "}
                    Save Details{" "}
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
      {transactionMining ? <Loader /> : null}
      {transactionObject ? createTransactionModal(transactionObject) : null}
    </section>
  );
};

export default ProfileCard;
