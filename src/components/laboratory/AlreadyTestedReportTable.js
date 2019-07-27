import React from "react";
import { Table } from "react-bootstrap";

const AlreadyTestedReportTable = props => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Batch Id</th>
          <th>Farmer Name</th>
          <th>Plant Name</th>
          <th>Amount</th>
          <th>Date Harvested</th>
          <th>Date Tested</th>
          <th>Report Result</th>
        </tr>
      </thead>
      <tbody>
        {props.array.map((element, id) => {
          return (
            <tr key={id.toString() + element.buid}>
              <td>{element.buid}</td>
              <td>{element.farmerName}</td>
              <td>{element.plantName}</td>
              <td>{element.amount}</td>
              <td>{element.dateHarvested}</td>
              <td>{element.dateTested}</td>
              <td
                className={
                  element.result === "Approved" ? "approve" : "reject"
                }
              >
                {element.result}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AlreadyTestedReportTable;
