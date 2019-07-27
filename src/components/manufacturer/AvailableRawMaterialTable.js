import React from "react";
import Table from "react-bootstrap/Table";
import AvailableRawMaterialRow from "./AvailableRawMaterialRow";

const AvailableRawMaterialTable = ({ array }) => {
  return (<>
      <Table>
          <thead>
            <tr>
                <th>Batch Id</th>
                <th>Farmer Name</th>
                <th>Plant Name</th>
                <th>Amount Left</th>
                <th>Date Harvested</th>
                <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {array.map((element, id) =>{
              return(
                  <AvailableRawMaterialRow values={element} key={id + '' + element.buid}/>
              )
          })}
          </tbody>
      </Table>
  </>);
};

export default AvailableRawMaterialTable;
