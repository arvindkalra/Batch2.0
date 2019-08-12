import React from "react";
import {
  deliverLabSampleConsignment,
  deliverOrDispatchTransport,
  dispatchLabSampleConsignment
} from "../../dbController/transporterRole";
import { checkMined } from "../../dbController/init";
import Button from "react-bootstrap/Button";

const SampleShipmentRow = ({ value, rowObj }) => {
  let handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    if (value.currentStatus.value === 3) {
      rowObj.details.labSampleConsignmentDispatchTime  = new Date().toLocaleString();
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
  };
  return (
    <tr>
      <td>{value.uid}</td>
      <td>{value.senderCompany}</td>
      <td>{value.receiverCompany}</td>
      <td>{value.dispatchTime ? value.dispatchTime : "--"}</td>
      <td>{value.currentStatus.status.captialize()}</td>
      <td>
        <Button onClick={handleClick}>
          {value.currentStatus.value === 3 ? "Dispatch Now" : "Deliver Now"}
        </Button>
      </td>
    </tr>
  );
};

export default SampleShipmentRow;
