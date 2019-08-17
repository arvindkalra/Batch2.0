import React from "react";
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

const ShipmentRow = ({ value, rowObj, shipmentType }) => {
  function handleSampleShipment(e) {
    e.preventDefault();
    e.stopPropagation();
    if (value.currentStatus.value === 3) {
      rowObj.details.labSampleConsignmentDispatchTime = new Date().toLocaleString();
      dispatchLabSampleConsignment(
        value.uid,
        rowObj.details.laboratoryAddress,
        rowObj.details
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    } else {
      rowObj.details.labSampleConsignmentDeliveryTime = new Date().toLocaleString();
      deliverLabSampleConsignment(
        value.uid,
        rowObj.details.laboratoryAddress,
        rowObj.details
      ).then(hash => {
        checkMined(hash, () => window.location.reload());
      });
    }
  }

  function handleHarvestShipment(e) {
    e.preventDefault();
    e.stopPropagation();
    if (value.currentStatus.value === 7) {
      rowObj.details.farmToFactoryConsignmentDispatchTime = new Date().toLocaleString();
      console.log(rowObj.details);
      dispatchFarmToFactoryConsignment(
        value.uid,
        rowObj.details.manufacturerAddress,
        rowObj.details
      ).then(hash => {
        checkMined(hash, () => window.location.reload());
      });
    } else {
      rowObj.details.farmToFactoryConsignmentDeliveryTime = new Date().toLocaleString();
      deliverFarmToFactoryConsignment(
        value.uid,
        rowObj.details.manufacturerAddress,
        rowObj.details
      ).then(hash => {
        checkMined(hash, () => window.location.reload());
      });
    }
  }

  function handleProductShipment(e) {
    e.preventDefault();
    e.stopPropagation();
    if (value.currentStatus.value === 2) {
      rowObj.details.manufacturerToDistributorDispatchTime = new Date().toLocaleString();
      dispatchFactoryToDistributorConsignment(
        value.uid,
        rowObj.details.distributorAddress ||
          "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        rowObj.details
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    } else {
      rowObj.details.manufacturerToDistributorDeliveryTime = new Date().toLocaleString();
      deliverFactoryToDistributorConsignment(
        value.uid,
        rowObj.details.distributorAddress ||
          "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        rowObj.details
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    }
  }

  function handleRetailShipment(e) {
    e.preventDefault();
    e.stopPropagation();
    if (value.currentStatus.value === 2) {
      rowObj.details.distributorToRetailerDispatchTime = new Date().toLocaleString();
      dispatchDistributorToShopConsignment(
        value.uid,
        rowObj.details.retailerAddress ||
          "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        rowObj.details
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    } else {
      rowObj.details.distributorToRetailerDeliveryTime = new Date().toLocaleString();
      deliverDistributorToShopConsignment(
        value.uid,
        rowObj.details.retailerAddress ||
          "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
        rowObj.details
      ).then(txHash => {
        checkMined(txHash, () => window.location.reload());
      });
    }
  }

  let handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    switch (shipmentType) {
      case "sample":
        handleSampleShipment();
        return;

      case "harvest":
        handleHarvestShipment();
        return;

      case "product":
        handleProductShipment();
        return;

      case "retail":
        handleRetailShipment();
        return;

      default:
        return;
    }
  };

  function getButtonString() {
    switch (shipmentType) {
      case "sample":
        return (
          <Button onClick={handleSampleShipment}>
            {value.currentStatus.value === 3 ? "Dispatch Now" : "Deliver Now"}
          </Button>
        );

      case "harvest":
        return (
          <Button onClick={handleHarvestShipment}>
            {value.currentStatus.value === 7 ? "Dispatch Now" : "Deliver Now"}
          </Button>
        );

      case "product":
        return (
          <Button onClick={handleProductShipment}>
            {value.currentStatus.value === 2 ? "Dispatch Now" : "Deliver Now"}
          </Button>
        );

      case "retail":
        return (
          <Button onClick={handleRetailShipment}>
            {value.currentStatus.value === 2 ? "Dispatch Now" : "Deliver Now"}
          </Button>
        );

      default:
        return;
    }
  }

  return (
    <tr>
      <td>{value.uid}</td>
      <td>{value.senderCompany}</td>
      <td>{value.receiverCompany}</td>
      <td>{value.dispatchTime ? value.dispatchTime : "--"}</td>
      <td>{value.currentStatus.status.captialize()}</td>
      <td>{getButtonString()}</td>
    </tr>
  );
};

export default ShipmentRow;
