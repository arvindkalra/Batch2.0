import React from 'react';
import Button from "react-bootstrap/Button";
import {deliverOrDispatchTransport} from "../../dbController/transporterRole";

const HarvestShipmentRow = ({value, rowObj}) => {

    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
        if(value.currentStatus === 'packed'){
            rowObj.details.dispatchTime = new Date().toDateString();
        }else{
            rowObj.details.deliveryTime = new Date().toDateString();
        }
        console.log(rowObj.details);
        deliverOrDispatchTransport(rowObj.uid, true, rowObj.details).then(console.log)
    };

    return (
        <tr>
            <td>{value.buid}</td>
            <td>{value.senderCompany}</td>
            <td>{value.receiverCompany}</td>
            <td>{value.amount} Pounds</td>
            <td>{value.dispatchTime ? value.dispatchTime : '--'}</td>
            <td>{value.currentStatus.captialize()}</td>
            <td><Button
                onClick={handleClick}> {value.currentStatus === 'packed' ? 'Dispatch Now' : 'Deliver Now'}</Button></td>
        </tr>
    );
};

export default HarvestShipmentRow;
