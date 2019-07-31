import React, {useEffect, useState} from 'react';
import FormModal from "./FormModal";

const TableRow = ({tableRow, rowDetails}) => {


    const [row, setRow] = useState([]);
    useEffect(() => {
        setRow(tableRow);

    }, [tableRow]);


    const getClassName = (data) => {
        data = data.toString().toLowerCase();
        switch (data) {
            case 'approved':
                return 'approve';
            case 'rejected':
                return 'reject';
            default:
                return ''
        }
    };
    const getDataTag = data => {
        let d = data.toString().toLowerCase();
        switch (d) {
            case 'upload report':
                return (<FormModal formDetails={rowDetails} tableRow={tableRow} buttonText={data}/>);
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
