import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import TableLayout from "../tables/TableLayout";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReportForm from "../laboratory/ReportForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { checkMined, connectToWeb3 } from "../../dbController/init";
import {
  fetchHarvestUnitDetailsUsingUID,
  sendProductToDistributor
} from "../../dbController/manufacturerRole";
import Loader from "../Loader";
import { OWN_ADDRESS } from "../../dbController/Web3Connections";
import { FormControl } from "react-bootstrap";
import config from "../../config";

const ManufacturedPacketsTable = ({
  array,
  setTransactionMining,
  setTransactionObject
}) => {
  const [showModal, setShowModal] = useState({ open: false, id: 0 });
  const [modalConfirmed, setModalConfirmed] = useState(false);
  const [distributorName, setDistributorName] = useState("Distributor A");
  const [transporterName, setTransporterName] = useState("Transporter A");
  const [price, setPrice] = useState(0);
  const [showLoader, setShowLoader] = useState("");

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

  const handleClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    let materialUsed = array[id].details.materialUsed;
    let harvestUnitId = array[id].details.harvestUnitId;
    let mrp = array[id].details.mrp;
    setShowLoader("Please Wait...");
    connectToWeb3().then(() => {
      fetchHarvestUnitDetailsUsingUID(harvestUnitId).then(obj => {
        let pricePerUnits = obj.details.farmerToManufacturerPrice;
        setShowLoader("");
        setShowModal({
          open: true,
          id: id,
          mrp,
          pricePerUnits,
          materialUsed
        });
      });
    });
  };

  const handleSend = e => {
    e.preventDefault();
    e.stopPropagation();
    setModalConfirmed(true);
    if (price <= 0) {
      return;
    }
    setTransactionMining();

    let prevDetails = array[showModal.id].details;
    let newDetails = {
      distributorAddress: config.ADDRESS,
      manufacturerToDistributorTransporter: config.ADDRESS,
      manufacturerToDistributorPrice: price,
      sentToDistributorOn: new Date().toLocaleString()
    };
    setShowModal({ open: false });
    connectToWeb3().then(() => {
      newDetails.manufacturerAddress = OWN_ADDRESS;
      sendProductToDistributor(
        array[showModal.id].productUnitId,
        newDetails.distributorAddress,
        newDetails.manufacturerToDistributorTransporter,
        { ...prevDetails, ...newDetails },
        openSignatureModal
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    });
  };
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Product Name</th>
            <th>Packet Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {array.map((element, id) => {
            return (
              <tr key={id + "" + element.productUnitId}>
                <td className={"uid"}>{element.productUnitId}</td>
                <td>{element.productName}</td>
                <td>{element.totalPacketsManufactured}</td>
                <td>
                  <Button onClick={e => handleClick(e, id)}>Sell</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal
        show={showModal.open}
        size={"xl"}
        onHide={() => {
          setShowModal({ open: false });
        }}
      >
        <Modal.Header>Send Product To Distributor</Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Cost Price ( $x.xx / Pound )</Form.Label>
                    <Form.Control
                      type={"number"}
                      value={showModal.pricePerUnits}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Label>
                    Total Cost Price ( $x.xx for {showModal.materialUsed} Pounds)
                  </Form.Label>
                  <Form.Control
                    type={"number"}
                    readOnly
                    value={showModal.materialUsed * showModal.pricePerUnits}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label>
                    M.R.P ( $x.xx /{" "}
                    {showModal.open
                      ? array[showModal.id].details.container
                      : null}
                    )
                  </Form.Label>
                  <Form.Control
                    type={"number"}
                    readOnly
                    value={showModal.mrp}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      Selling Price ( $x.xx /{" "}
                      {showModal.open
                        ? array[showModal.id].details.container
                        : null}
                      )
                    </Form.Label>
                    <Form.Control
                      type={"number"}
                      placeholder={"Enter the price to sell to the distributor"}
                      onChange={e => {
                        setPrice(parseFloat(e.target.value));
                      }}
                      isInvalid={modalConfirmed ? price <= 0 : false}
                    />
                    <FormControl.Feedback type={"invalid"}>
                      <strong>Required</strong> : Selling Price can not be zero
                    </FormControl.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Label>Total Price ( $x.xx )</Form.Label>
                  <Form.Control
                    type={"number"}
                    placeholder={"Enter the Selling Price"}
                    readOnly
                    value={
                      showModal.open
                        ? array[showModal.id].details.totalPacketsManufactured *
                          price
                        : 0
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Distributor Name</Form.Label>
                <Form.Control
                  as={"select"}
                  onChange={e => {
                    setDistributorName(e.target.value);
                  }}
                >
                  <option value={"Declan McVee"}>Declan McVee</option>

                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Transporter Name</Form.Label>
                <Form.Control
                  as={"select"}
                  onChange={e => {
                    setTransporterName(e.target.value);
                  }}
                >
                  <option value={"Kiran Kamal"}>Kiran Kamal</option>

                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className={"btn-success"} onClick={handleSend}>
            Send to Distributor
          </Button>
          <Button
            className={"btn-danger"}
            onClick={() => setShowModal({ open: false })}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {showLoader.length > 0 ? <Loader message={showLoader} /> : null}
    </>
  );
};

export default ManufacturedPacketsTable;
