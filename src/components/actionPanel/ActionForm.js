import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Notification from "../Notification";
import {
  locationMovedByFarmer,
  plantDestroyedByFarmer,
  plantHarvestedByFarmer,
  sellHarvestByFarmer,
  sendToLaboratory
} from "../../dbController/farmerRole";
import { checkMined } from "../../dbController/init";
import Overlay from "react-bootstrap/Overlay";
import Loader from "../Loader";
import { createTransactionModal } from "../../helpers";
import { FormControl } from "react-bootstrap";
import config from "../../config";

const ActionForm = ({
  productState,
  setProductStatus,
  seedObj,
  destroyRequested,
  cancelDestroyRequest,
  history,
  moveRequested,
  cancelMoveRequested
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [transactionMining, setTransactionMining] = useState(false);
  const [transactionObject, setTransactionObject] = useState(null);
  const [clicked, setClicked] = useState(false);

  // Send to Manufacturer Form States
  const [pricePerUnit, setPricePerUnits] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  // Harvest For States
  const [formFieldValue, setFormFieldValue] = useState(0);

  // Send to Lab Form States
  const [labName, setLabName] = useState("Green Labs LLC");
  const [transporterName, setTransporterName] = useState("Transporter A");

  // Destroy Form States
  const [destroyQuantity, setDestroyQuantity] = useState(0);
  const [destroyCompanyName, setDestroyCompanyName] = useState("Company A");
  const [destroyReason, setDestroyReason] = useState("");

  // Move Location States
  const [newLocation, setNewLocation] = useState("");

  const sendHarvestReport = e => {
    e.preventDefault();
    e.stopPropagation();
    setClicked(true);
    if (formFieldValue <= 0) {
      return;
    }
    setTransactionMining(true);
    seedObj.details.harvestTime = new Date().toLocaleString();
    seedObj.details.totalHarvestAmount = formFieldValue;
    plantHarvestedByFarmer(
      seedObj.harvestUnitId,
      seedObj.details,
      openSignatureModal
    ).then(hash => {
      setNotificationMessage(" the tx is mining");
      setShowNotification(true);
      checkMined(hash, () => {
        setNotificationMessage(" the harvest report is submitted");
        history.push("/cultivator/dashboard", {
          setNotification: true,
          setMessage: "Your harvest report has been submitted"
        });
      });
    });
  };

  const sendToLab = e => {
    e.preventDefault();
    e.stopPropagation();
    setTransactionMining(true);
    seedObj.details.sentToLabOn = new Date().toLocaleString();
    seedObj.details.laboratoryAddress = config.ADDRESS;
    seedObj.details.farmToLabConsignmentTransporterAddress = config.ADDRESS;
    sendToLaboratory(
      seedObj.harvestUnitId,
      config.ADDRESS,
      config.ADDRESS,
      seedObj.details,
      openSignatureModal
    ).then(hash => {
      setNotificationMessage(" tx mining");
      setShowNotification(true);
      checkMined(hash, () => {
        history.push("/cultivator/dashboard", {
          setNotification: true,
          setMessage: "Your sample has been sent to the lab"
        });
      });
    });
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

  const sendToManufacturer = e => {
    e.preventDefault();
    e.stopPropagation();
    setClicked(true);
    if (pricePerUnit <= 0) {
      return;
    }
    setTransactionMining(true);
    seedObj.details.sentToManufacturerOn = new Date().toLocaleString();
    seedObj.details.farmerToManufacturerPrice = pricePerUnit;
    let transporter = config.ADDRESS;
    let manufacturer = config.ADDRESS;
    seedObj.details.manufacturerAddress = manufacturer;
    seedObj.details.farmToFactoryConsignmentTransporterAddress = transporter;
    sellHarvestByFarmer(
      seedObj.harvestUnitId,
      manufacturer,
      transporter,
      seedObj.details,
      openSignatureModal
    ).then(hash => {
      checkMined(hash, () => {
        history.push("/cultivator/dashboard", {
          setNotification: true,
          setMessage: "Your harvest has been sent to the manufacturer"
        });
      });
    });
  };

  const destroyCrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setClicked(true);
    if (destroyReason.length === 0 || destroyQuantity <= 0) {
      return;
    }
    setTransactionMining(true);
    seedObj.details.quantarineCompanyName = destroyCompanyName;
    seedObj.details.destroyReason = destroyReason;
    seedObj.details.destroyQuantity = destroyQuantity;
    plantDestroyedByFarmer(
      seedObj.harvestUnitId,
      seedObj.details,
      openSignatureModal
    ).then(hash => {
      checkMined(hash, () => {
        history.push("/cultivator/dashboard", {
          setNotification: true,
          setMessage: "Your crop has been destroyed"
        });
      });
    });
  };

  const moveLocation = e => {
    e.preventDefault();
    e.stopPropagation();
    setClicked(true);
    if (newLocation === "") {
      return;
    }
    let newLocationObject = {
      location: newLocation.captialize(),
      time: new Date().toLocaleString()
    };
    let currentState = seedObj.currentState.value;
    seedObj.details.currentLocation.push(newLocationObject);
    setTransactionMining(true);
    locationMovedByFarmer(
      seedObj.harvestUnitId,
      currentState,
      seedObj.details,
      openSignatureModal
    ).then(hash => {
      checkMined(hash, () => {
        history.push("/cultivator/dashboard", {
          setNotification: true,
          setMessage: "Your crop has been destroyed"
        });
      });
    });
  };

  const setPrice = (perUnitInput, totalInput) => {
    let quantity = seedObj.details.totalHarvestAmount;
    if (perUnitInput === pricePerUnit) {
      setTotalPrice(totalInput);
      setPricePerUnits((totalInput / quantity).toFixed(2));
    } else {
      setPricePerUnits(perUnitInput);
      setTotalPrice(quantity * perUnitInput);
    }
  };

  const setForm = () => {
    if (destroyRequested) {
      return (
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type={"number"}
                placeholder={"Enter the amount crop destroyed in pounds"}
                onChange={e => {
                  setDestroyQuantity(parseInt(e.target.value));
                }}
                isInvalid={clicked ? destroyQuantity <= 0 : false}
              />
              <FormControl.Feedback type={"invalid"}>
                <strong>Required</strong> : Enter the Destroy Quantity
              </FormControl.Feedback>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                as={"select"}
                onChange={e => {
                  setDestroyCompanyName(e.target.value);
                }}
              >
                <option>Company A</option>
                <option>Company B</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Destroy Reason</Form.Label>
              <Form.Control
                type={"textarea"}
                placeholder={"Enter the reason for destroying"}
                onChange={e => {
                  setDestroyReason(e.target.value);
                }}
                isInvalid={clicked ? destroyReason.length === 0 : false}
              />
              <FormControl.Feedback type={"invalid"}>
                <strong>Required</strong> : Enter a valid reason for destroy
              </FormControl.Feedback>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button type={"submit"} onClick={destroyCrop}>
              Destroy
            </Button>
          </Col>
          <Col md={1}>
            <Button
              type={"submit"}
              className={"btn-danger"}
              onClick={cancelDestroyRequest}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      );
    } else if (moveRequested) {
      return (
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label>New Location</Form.Label>
              <Form.Control
                type={"text"}
                placeholder={"Enter the new location"}
                onChange={e => {
                  setNewLocation(e.target.value);
                }}
                isInvalid={clicked ? newLocation.length === 0 : false}
              />
              <FormControl.Feedback type={"invalid"}>
                <strong>Required</strong> : Enter a valid new location
              </FormControl.Feedback>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button type={"submit"} onClick={moveLocation}>
              Move
            </Button>
          </Col>
          <Col md={1}>
            <Button
              type={"submit"}
              className={"btn-danger"}
              onClick={cancelMoveRequested}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      );
    } else if (productState.value === 1) {
      return (
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Harvested Amount(in Pounds)</Form.Label>
              <Form.Control
                type={"number"}
                placeholder={"Enter the amount harvested in pounds"}
                onChange={e => {
                  setFormFieldValue(parseInt(e.target.value));
                }}
                isInvalid={clicked ? formFieldValue <= 0 : false}
              />
              <FormControl.Feedback type={"invalid"}>
                <strong>Required</strong> : Harvest Amount Should be more than
                zero
              </FormControl.Feedback>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Button type={"submit"} onClick={sendHarvestReport}>
              Submit Report
            </Button>
          </Col>
        </Row>
      );
    }
    if (productState.value === 2) {
      return (
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Select Lab</Form.Label>
              <Form.Control
                as={"select"}
                required
                onChange={e => {
                  setLabName(e.target.value);
                }}
              >
                <option value="">Green Labs LLC</option>
                <option value="">LIME Labs INC</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Select Transporter</Form.Label>
              <Form.Control
                as={"select"}
                required
                onChange={e => {
                  setTransporterName(e.target.value);
                }}
              >
                <option value="">Transporter A</option>
                <option value="">Transporter B</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Button type={"submit"} onClick={sendToLab}>
              Send To Lab
            </Button>
          </Col>
        </Row>
      );
    } else if (productState.value === 3) {
      return (
        <p>
          Please wait for the lab tests before you can fill in a harvest report
        </p>
      );
    } else if (productState.value === 6) {
      return (
        <Row>
          <Col md={12}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price ($x.xx / Pound)</Form.Label>
                  <Form.Control
                    type={"number"}
                    placeholder={"Enter the Selling Price"}
                    value={pricePerUnit}
                    onChange={e =>
                      setPrice(parseInt(e.target.value), totalPrice)
                    }
                    isInvalid={clicked ? pricePerUnit <= 0 : false}
                  />
                  <FormControl.Feedback type={"invalid"}>
                    <strong>Required</strong> : Selling price should be more
                    than zero
                  </FormControl.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Total Price ($x.xx)</Form.Label>
                  <Form.Control
                    type={"number"}
                    placeholder={"Enter the Selling Price"}
                    value={totalPrice}
                    onChange={e =>
                      setPrice(pricePerUnit, parseInt(e.target.value))
                    }
                    readOnly
                    isInvalid={clicked ? totalPrice <= 0 : false}
                  />
                  <FormControl.Feedback type={"invalid"}>
                    <strong>Required</strong> : Selling price should be more
                    than zero
                  </FormControl.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Select Manufacturer</Form.Label>
              <Form.Control as={"select"} required>
                <option value="">ABC</option>
                <option value="">DEF</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Transporter</Form.Label>
              <Form.Control as={"select"} required>
                <option value="">EKart</option>
                <option value="">Delhivery</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Button type={"submit"} onClick={sendToManufacturer}>
              Send to Manufacturer
            </Button>
          </Col>
        </Row>
      );
    } else if (productState.value === 7) {
      return (
        <p>
          This product has been successfully harvested and sent to the
          manufacturer
        </p>
      );
    }
  };
  return (
    <Form>
      {setForm()}

      {transactionMining ? <Loader /> : null}
      {transactionObject ? createTransactionModal(transactionObject) : null}
    </Form>
  );
};

export default ActionForm;
