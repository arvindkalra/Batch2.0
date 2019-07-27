import React from 'react';
import Button from "react-bootstrap/Button";

const HarvestShipmentRow = ({value}) => {
    return (
        <tr>
            <td>{value.buid}</td>
            <td>{value.senderCompany}</td>
            <td>{value.receiverCompany}</td>
            <td>{value.amount} Pounds</td>
            <td>{value.dispatchTime ? value.dispatchTime : '--'}</td>
            <td>{value.currentStatus.captialize()}</td>
            <td><Button>{value.currentStatus === 'packed' ? 'Dispatch Now' : 'Deliver Now'}</Button></td>
        </tr>
    );
};

export default HarvestShipmentRow;
