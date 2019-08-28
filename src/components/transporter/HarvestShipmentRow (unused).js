import React from "react";
import Button from "react-bootstrap/Button";
import {
  deliverFarmToFactoryConsignment,
  deliverOrDispatchTransport,
  dispatchFarmToFactoryConsignment
} from "../../dbController/transporterRole";
import { checkMined } from "../../dbController/init";

const HarvestShipmentRowUnused = ({ value, rowObj }) => {
  const handleClick = e => {
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
  };

  return (
    <tr>
      <td className={"uid"}>{value.uid}</td>
      <td>{value.senderCompany}</td>
      <td>{value.receiverCompany}</td>
      <td>{value.amount}</td>
      <td>{value.dispatchTime ? value.dispatchTime : "--"}</td>
      <td>{value.currentStatus.status.captialize()}</td>
      <td>
        <Button onClick={handleClick}>
          {" "}
          {value.currentStatus.value === 7 ? "Dispatch Now" : "Deliver Now"}
        </Button>
      </td>
    </tr>
  );
};

export default HarvestShipmentRowUnused;
