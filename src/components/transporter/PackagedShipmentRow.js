import React from 'react';
import Button from "react-bootstrap/Button";
import {deliverOrDispatchTransport} from "../../dbController/transporterRole";
import {checkMined} from "../../dbController/init";

const PackagedShipmentRow = ({value, rowObj}) => {
    let handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(value.currentStatus === 'packed'){
            rowObj.details.dispatchTime = new Date().toDateString();
        }else{
            rowObj.details.deliveryTime = new Date().toDateString();
        }
        deliverOrDispatchTransport(rowObj.uid, false, rowObj.details).then(txHash => {
            checkMined(txHash, () => {
                window.location.reload();
            })
        })
    };
    return (
        <tr>
            <td>{value.puid}</td>
            <td>{value.senderCompany}</td>
            <td>{value.receiverCompany}</td>
            <td>{value.amount}</td>
            <td>{value.dispatchTime ? value.dispatchTime : '--'}</td>
            <td>{value.currentStatus.captialize()}</td>
            <td><Button onClick={handleClick}>{value.currentStatus === 'packed' ? 'Dispatch Now' : 'Deliver Now'}</Button></td>
        </tr>
    );
};

export default PackagedShipmentRow;
