import React, {useEffect, useState} from "react";
import TableLayout from "../tables/TableLayout";

const PendingReportTable = ({array, seedObjArr}) => {
    const tableHead = [
        "Batch Id",
        "Farmer Name",
        "Plant Name",
        "Amount",
        "Date Harvested",
        "Action"
    ];

    return (
        <TableLayout tableHead={tableHead} rows={array} tableParams={seedObjArr}/>
    );
};

export default PendingReportTable;
