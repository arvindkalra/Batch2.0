import React from 'react';

const TableHead = ({tableHead}) => {


    return (
        <thead>
        <tr>

        {tableHead.map((th, index)=>{
            return(
                <th key={index}>
                    {th}
                </th>
            )
            })}
        </tr>
        </thead>

    );
};

export default TableHead;
