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
import { checkMined, convertToHex } from "../../dbController/init";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Manifesto from "./Manifesto";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import config from "../../config";

const ShipmentRow = ({
  index,
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
        rowObj.details.distributorAddress || config.ADDRESS,
        rowObj.details,
        openSignatureModal
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    } else {
      rowObj.details.manufacturerToDistributorDeliveryTime = new Date().toLocaleString();
      deliverFactoryToDistributorConsignment(
        value.uid,
        rowObj.details.distributorAddress || config.ADDRESS,
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
        rowObj.details.retailerAddress || config.ADDRESS,
        rowObj.details,
        openSignatureModal
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    } else {
      rowObj.details.distributorToRetailerDeliveryTime = new Date().toLocaleString();
      deliverDistributorToShopConsignment(
        value.uid,
        rowObj.details.retailerAddress || config.ADDRESS,
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
              : "Confirm Sample Delivery"}
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
              : "Confirm Harvest Delivery"}
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
              : "Confirm Product Delivery"}
          </Button>
        );

      case "retail":
        return (
          <Button
            className={"transporter-action"}
            onClick={handleRetailShipment}
          >
            {value.currentStatus.value === 2
              ? "Dispatch Batch"
              : "Confirm Batch Delivery"}
          </Button>
        );

      default:
        return;
    }
  }

  return (
    <>
      <tr>
        <td className={"uid"}>{convertToHex(index + 1)}</td>
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
                <main>
                  {" "}
                  <Manifesto
                    transporterDetails={transporterDetails}
                    rowObj={rowObj}
                    item={value}
                    sender={value.senderCompany}
                    receiver={value.receiverCompany}
                  />
                </main>
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
