import React, {useEffect, useState} from "react";
import TableLayout from "../tables/TableLayout";

const PendingReportTable = ({head, array}) => {
    const [tableHead, setTableHead] = useState(['Batch Id', 'Farmer Name', 'Plant Name', 'Amount', 'Date Harvested', 'Action']);
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        setTableRows(array);
    }, [array]);
    return (
        <TableLayout tableHead={tableHead} rows={tableRows}/>

    );
};

export default PendingReportTable;
