import React from 'react';
import Table from "react-bootstrap/Table";
import HarvestShipmentRow from "./HarvestShipmentRow";

const HarvestShipmentTable = ({array}) => {
    return (
        <Table responsive>
            <thead>
            <tr>
                <th>Batch Id</th>
                <th>Sender Name</th>
                <th>Receiver Name</th>
                <th>Amount</th>
                <th>Dispatch Time</th>
                <th>Current Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {array.map((element, id) => {
                return <HarvestShipmentRow value={element} key={id + '' + element.buid}/>
            })}
            </tbody>
        </Table>
    );
};

export default HarvestShipmentTable;
