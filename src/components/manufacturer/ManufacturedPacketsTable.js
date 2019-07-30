import React from "react";
import Table from "react-bootstrap/Table";
import TableLayout from "../tables/TableLayout";

const ManufacturedPacketsTable = ({ array }) => {

    const tableHead = ['Packet ID', 'Type', 'Product Name', 'Quantity']
    return (
        <TableLayout tableHead={tableHead} rows={array} />
    );
};

export default ManufacturedPacketsTable;
