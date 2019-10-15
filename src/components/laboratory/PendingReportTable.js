import React, {useEffect, useState} from "react";
import TableLayout from "../tables/TableLayout";

const PendingReportTable = ({array, seedObjArr, labDetails}) => {
    const tableHead = [
        "Batch Id",
        "Cultivator Name",
        "Plant Type",
        "Amount",
        "Date Harvested",
        "Action"
    ];
    return (
        <TableLayout tableHead={tableHead} rows={array} tableParams={seedObjArr} labDetails={labDetails}/>
    );
};

export default PendingReportTable;
