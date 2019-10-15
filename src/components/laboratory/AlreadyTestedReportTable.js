import React, { useEffect, useState } from "react";
import TableLayout from "../tables/TableLayout";
import { createSortFunction } from "../../helpers";

const AlreadyTestedReportTable = props => {
  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  useEffect(() => {
    let temp = props.array;
    let sortFunction = createSortFunction("5", "string");
    temp.sort(sortFunction);
    setTableRows([...temp]);
  }, [props]);
  useEffect(() => {
    setTableHead([
      "Batch Id",
      "Cultivator",
      "Plant Type",
      "Amount",
      "Date Harvested",
      "Date Tested",
      "Report Result"
    ]);
  }, []);

  return (
    <TableLayout
      tableHead={tableHead}
      rows={tableRows}
      tableParams={props.seedObjArr}
      labDetails={props.labDetails}
    />
  );
};

export default AlreadyTestedReportTable;
