import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { getRowsForFarmer } from "../../dbController/farmerRole";
import { connectToMetamask } from "../../dbController/init";
import Loader from "../Loader";

const CompleteProductsTable = () => {
  const [rows, setRows] = useState([]);
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    connectToMetamask().then(() => {
      let tempRows = rows;
      getRowsForFarmer((rowObj, total) => {
        tempRows.push(rowObj);
        setRows([...tempRows]);
        if (tempRows.length === total) {
          setPreloader(false);
        }
      });
    });
  }, []);

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Date Planted</th>
            <th>Quantity</th>
            <th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((element, key) => {
            return (
              <tr key={key}>
                <td>{element.harvestUnitId}</td>
                <td className={"product-name ready-for-harvest"}>
                  <Link to={`/cultivator/products/${element.harvestUnitId}`}>
                    {" "}
                    {element.details.plantName}{" "}
                  </Link>
                </td>
                <td>{element.details.datePlanted}</td>
                <td>{element.details.seedCount}</td>
                <td>{element.currentState.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {preloader ? <Loader message={"Fetching Inventory"} /> : null}
    </>
  );
};

export default CompleteProductsTable;
