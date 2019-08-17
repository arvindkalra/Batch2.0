import React from "react";
import Button from "react-bootstrap/Button";
import {
  deliverFactoryToDistributorConsignment,
  deliverOrDispatchTransport,
  dispatchFactoryToDistributorConsignment
} from "../../dbController/transporterRole";
import { checkMined } from "../../dbController/init";

const PackagedShipmentRowUnused = ({ value, rowObj }) => {
  let handleClick = e => {
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
  };
  return (
    <tr>
      <td>{value.uid}</td>
      <td>{value.senderCompany}</td>
      <td>{value.receiverCompany}</td>
      <td>{value.amount}</td>
      <td>{value.dispatchTime ? value.dispatchTime : "--"}</td>
      <td>{value.currentStatus.status.captialize()}</td>
      <td>
        <Button onClick={handleClick}>
          {value.currentStatus.value === 2 ? "Dispatch Now" : "Deliver Now"}
        </Button>
      </td>
    </tr>
  );
};

export default PackagedShipmentRowUnused;
