import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import FormModal from "./FormModal";

const TableRow = ({tableRow}) => {

    const [row, setRow] = useState([]);
    useEffect(() => {
        setRow(tableRow);
        console.log("inside table row useeffect", tableRow);
    }, [tableRow]);


    const getClassName = (data) => {
        data = data.toString().toLowerCase();
        switch (data) {
            case 'approved':
                return 'approve';
            case 'rejected':
                return 'reject'
            default:
                return ''
        }
    };
    const getDataTag = data => {
        let d = data.toString().toLowerCase();
        switch (d) {
            case 'upload report':
                return(<FormModal buttonText={data} />)
            default:
                return data

        }
    };


    return (
        <tr>
            {row.map((td, index) => {
                return (
                    <td className={getClassName(td)} key={index.toString() + td.toString()}> {getDataTag(td)}</td>
                )
            })}

        </tr>
    );
};

export default TableRow;
