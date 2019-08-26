import React, { useState } from "react";
import {
  deliverDistributorToShopConsignment,
  deliverFactoryToDistributorConsignment,
  deliverFarmToFactoryConsignment,
  deliverLabSampleConsignment,
  dispatchDistributorToShopConsignment,
  dispatchFactoryToDistributorConsignment,
  dispatchFarmToFactoryConsignment,
  dispatchLabSampleConsignment
} from "../../dbController/transporterRole";
import { checkMined } from "../../dbController/init";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Manifesto from "./Manifesto";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";

const ShipmentRow = ({
  value,
  rowObj,
  shipmentType,
  setTransactionMining,
  setTransactionObject,
  tableType,
  transporterDetails
}) => {
  const [show, setShow] = useState(false);
  const [dispatchShow, setDispatchShow] = useState(false);
  const [transportationCost, setTransportationCost] = useState(0);
  const [costKey, setCostKey] = useState("");

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

  function handleSampleShipment(e) {
    e.preventDefault();
    e.stopPropagation();
    setTransactionMining();
    if (value.currentStatus.value === 3) {
      rowObj.details.labSampleConsignmentDispatchTime = new Date().toLocaleString();
      dispatchLabSampleConsignment(
        value.uid,
        rowObj.details.laboratoryAddress,
        rowObj.details,
        openSignatureModal
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    } else {
      rowObj.details.labSampleConsignmentDeliveryTime = new Date().toLocaleString();
      deliverLabSampleConsignment(
        value.uid,
        rowObj.details.laboratoryAddress,
        rowObj.details,
        openSignatureModal
      ).then(hash => {
        checkMined(hash, () => window.location.reload());
      });
    }
  }

  function handleHarvestShipment(e) {
    e.preventDefault();
    e.stopPropagation();
    setTransactionMining();
    if (value.currentStatus.value === 7) {
      rowObj.details.farmToFactoryConsignmentDispatchTime = new Date().toLocaleString();
      console.log(rowObj.details);
      dispatchFarmToFactoryConsignment(
        value.uid,
        rowObj.details.manufacturerAddress,
        rowObj.details,
        openSignatureModal
      ).then(hash => {
        checkMined(hash, () => window.location.reload());
      });
    } else {
      rowObj.details.farmToFactoryConsignmentDeliveryTime = new Date().toLocaleString();
      deliverFarmToFactoryConsignment(
        value.uid,
        rowObj.details.manufacturerAddress,
        rowObj.details,
        openSignatureModal
      ).then(hash => {
        checkMined(hash, () => window.location.reload());
      });
    }
  }

  function handleProductShipment(e) {
    e.preventDefault();
    e.stopPropagation();
    setTransactionMining();
    if (value.currentStatus.value === 2) {
      rowObj.details.manufacturerToDistributorDispatchTime = new Date().toLocaleString();
      dispatchFactoryToDistributorConsignment(
        value.uid,
        rowObj.details.distributorAddress ||
          "0x8d41001644db97DC0F7120F977f6ED0357AE43F6",
        rowObj.details,
        openSignatureModal
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    } else {
      rowObj.details.manufacturerToDistributorDeliveryTime = new Date().toLocaleString();
      deliverFactoryToDistributorConsignment(
        value.uid,
        rowObj.details.distributorAddress ||
          "0x8d41001644db97DC0F7120F977f6ED0357AE43F6",
        rowObj.details,
        openSignatureModal
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    }
  }

  function handleRetailShipment(e) {
    e.preventDefault();
    e.stopPropagation();
    setTransactionMining();
    if (value.currentStatus.value === 2) {
      rowObj.details.distributorToRetailerDispatchTime = new Date().toLocaleString();
      dispatchDistributorToShopConsignment(
        value.uid,
        rowObj.details.retailerAddress ||
          "0x8d41001644db97DC0F7120F977f6ED0357AE43F6",
        rowObj.details,
        openSignatureModal
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    } else {
      rowObj.details.distributorToRetailerDeliveryTime = new Date().toLocaleString();
      deliverDistributorToShopConsignment(
        value.uid,
        rowObj.details.retailerAddress ||
          "0x8d41001644db97DC0F7120F977f6ED0357AE43F6",
        rowObj.details,
        openSignatureModal
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    }
  }

  function getButtonString() {
    switch (shipmentType) {
      case "sample":
        return (
          <Button
            className={"transporter-action"}
            onClick={handleSampleShipment}
          >
            {value.currentStatus.value === 3
              ? "Dispatch Sample"
              : "Confirm Delivery"}
          </Button>
        );

      case "harvest":
        return (
          <Button
            className={"transporter-action"}
            onClick={handleHarvestShipment}
          >
            {value.currentStatus.value === 7
              ? "Dispatch Harvest"
              : "Confirm Delivery"}
          </Button>
        );

      case "product":
        return (
          <Button
            className={"transporter-action"}
            onClick={handleProductShipment}
          >
            {value.currentStatus.value === 2
              ? "Dispatch Product"
              : "Confirm Delivery"}
          </Button>
        );

      case "retail":
        return (
          <Button
            className={"transporter-action"}
            onClick={handleRetailShipment}
          >
            {value.currentStatus.value === 2
              ? "Dispatch Product"
              : "Confirm Delivery"}
          </Button>
        );

      default:
        return;
    }
  }

  return (
    <>
      <tr>
        <td>{value.uid}</td>
        <td>{value.senderCompany.name}</td>
        <td>{value.receiverCompany.name}</td>
        <td>{value.dispatchTime ? value.dispatchTime : "--"}</td>
        <td>
          {tableType !== "delivered" ? (
            getButtonString()
          ) : (
            <>
              {" "}
              <Button
                onClick={() => {
                  setShow(true);
                }}
              >
                {" "}
                View manifesto
              </Button>{" "}
              <Modal
                size={"xl"}
                show={show}
                onHide={() => {
                  setShow(false);
                }}
              >
                {" "}
                <Modal.Header closeButton>
                  <h1 className={"title-center"}>Transfer Manifesto</h1>
                </Modal.Header>{" "}
                <Modal.Body>
                  {" "}
                  <Manifesto
                    transporterDetails={transporterDetails}
                    rowObj={rowObj}
                    item={value}
                    sender={value.senderCompany}
                    receiver={value.receiverCompany}
                  />
                </Modal.Body>{" "}
              </Modal>{" "}
            </>
          )}
        </td>
      </tr>
      <Modal
        size={"l"}
        show={dispatchShow}
        onHide={() => {
          setDispatchShow(false);
        }}
      >
        <Modal.Header closeButton>
          <h1 className={"title-center"}>Dispatch Summary</h1>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Enter the Price of Transportation</Form.Label>
            <Form.Control
              type={"text"}
              placeholder={"The Price for Transportation"}
              onChange={e => {
                setTransportationCost(parseInt(e.target.value));
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {getButtonString()}
          <Button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setDispatchShow(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShipmentRow;
