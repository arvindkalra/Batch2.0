import React from "react";
import TableLayout from "../tables/TableLayout";

const AvailableRawMaterialTable = ({array}) => {
    console.log(array);
    const tableHead = ['Batch Id', 'Farmer Name', 'Amount','Plant Name'];
    return (
        <>
            <TableLayout tableHead={tableHead} rows={array}/>
        </>
    );
};

export default AvailableRawMaterialTable;
