import React,{useState, useEffect} from 'react';
import Table from "react-bootstrap/Table";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const TableLayout = ({tableHead, rows, tableParams}) => {


    const [tablehead, setTableHead] = useState([]);
    const [tableRows, setTableRows] = useState([]);

    useEffect(()=>{
        setTableHead(tableHead);
    },[tableHead]);

    useEffect(()=>{
        setTableRows(rows);
    },[rows]);
    return (
        <Table responsive>


            <TableHead tableHead={tableHead}/>

            <tbody>
            {
                tableRows.map((row,index) => {
                    return (
                        <TableRow key={index} tableRow={row} />
                    )
                })
            }

            </tbody>

        </Table>
    );
};

export default TableLayout;
