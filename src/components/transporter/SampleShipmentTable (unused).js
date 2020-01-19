import React from 'react';
import Table from "react-bootstrap/Table";
import SampleShipmentRowUnused from "./SampleShipmentRow (unused)";

const SampleShipmentTableUnused = ({ array, rowObjArr }) => {
    return (
        <Table responsive>
            <thead>
            <tr>
                <th>Unique Identifier</th>
                <th>Sender Name</th>
                <th>Receiver Name</th>
                <th>Dispatch Time</th>
                <th>Current Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {array.length === 0 ? (
                <tr className={"no-pending-shipment"}>
                    <td colSpan={7}>You do not have any pending shipments</td>
                </tr>
            ) : (
                array.map((element, id) => {
                    return (
                        <SampleShipmentRowUnused
                            value={element}
                            key={id + "" + element.uid}
                            rowObj={rowObjArr[element.uid]}
                        />
                    );
                })
            )}
            </tbody>
        </Table>
    );
};

export default SampleShipmentTableUnused;
