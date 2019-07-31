import React,{useState, useEffect} from 'react';
import Table from "react-bootstrap/Table";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const TableLayout = (props) => {

    // tableHead, rows, tableParams

    const [tablehead, setTableHead] = useState([]);
    const [tableRows, setTableRows] = useState([]);

    useEffect(()=>{
        setTableHead(props.tableHead);
    },[props.tableHead]);

    useEffect(()=>{
        setTableRows(props.rows);
    },[props.rows]);
    return (
        <Table responsive>


            <TableHead tableHead={props.tableHead}/>

            <tbody>
            {
                tableRows.map((row,index) => {
                    return (
                        <TableRow key={index} tableRow={row} rowDetails={!props.tableParams? undefined: props.tableParams[row[0]] } />
                    )
                })
            }

            </tbody>

        </Table>
    );
};

export default TableLayout;
