import React from "react";
import Table from "react-bootstrap/Table";
import PendingReportTableRow from "./PendingReportTableRow";

const PendingReportTable = ({ array }) => {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>Batch Id</th>
            <th>Farmer Name</th>
            <th>Plant Name</th>
            <th>Amount</th>
            <th>Date Harvested</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {array.map((element, id) => {
            return (
              <PendingReportTableRow
                key={id.toString() + element.buid}
                values={element}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default PendingReportTable;
