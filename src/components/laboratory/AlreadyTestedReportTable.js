import React, {useEffect, useState} from "react";
import TableLayout from "../tables/TableLayout";

const AlreadyTestedReportTable = props => {
    const [tableHead, setTableHead] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    useEffect(() => {
        setTableRows(props.array);


    }, [props]);
    useEffect(() => {
        setTableHead(['Batch Id', 'Cultivator', 'Plant Name', 'Amount', 'Date Harvested', 'Date Tested', 'Report Result'])
    }, []);

    return (

        <TableLayout tableHead={tableHead} rows={tableRows} tableParams={props.seedObjArr} labDetails={props.labDetails}/>
    );
};

export default AlreadyTestedReportTable;
