import React, {useEffect, useState} from "react";
import TableLayout from "../tables/TableLayout";

const AlreadyTestedReportTable = props => {
    const [tableHead, setTableHead] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    useEffect(() => {
        setTableRows(props.array);

        console.log("use effect called", props);
    }, [props]);
    useEffect(() => {
        setTableHead(['Batch Id', 'Farmer Name', 'Plant Name', 'Amount', 'Date Harvested', 'Date Tested', 'Report Result'])
    }, []);

    return (

        <TableLayout tableHead={tableHead} rows={tableRows} tableParams={props.seedObjArr}/>
    );
};

export default AlreadyTestedReportTable;
