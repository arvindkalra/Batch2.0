import React from 'react';
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

const AvailableUnitsTable = ({array}) => {
    return (
        <>
            <Table>
                <thead>
                <tr>
                    <th>Unique Id</th>
                    <th>Product Type</th>
                    <th>Manufacturer Name</th>
                    <th>Available Units</th>
                </tr>
                </thead>
                <tbody>
                {array.map((element, id) => {
                    return (
                        <tr key={id + "" + element.packetUnitId}>
                            <td>{element.packetUnitId}</td>
                            <td>
                                <Link to={`/distributor/product/${element.packetUnitId}`}>
                                    {element.productType}
                                </Link>
                            </td>
                            <td>{element.manufacturerName}</td>
                            <td>{element.pendingAmount} Units</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </>
    );
};

export default AvailableUnitsTable;
