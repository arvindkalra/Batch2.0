import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { getRowsForFarmer } from "../../dbController/farmerRole";
import { connectToMetamask } from "../../dbController/init";
import Loader from "../Loader";
import { Card } from "react-bootstrap";

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
      <Card>
        <Table responsive>
          <thead>
            <tr>
              <th>#ID</th>
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
                  <td className={"uid"}>{element.harvestUnitId}</td>
                  <td className={"product-name ready-for-harvest"}>
                    <span className={"under-linked"}>
                      <Link
                        to={`/cultivator/products/${element.harvestUnitId}`}
                      >
                        {" "}
                        {element.details.plantName}{" "}
                      </Link>
                    </span>
                  </td>
                  <td>{element.details.datePlanted}</td>
                  <td>{element.details.seedCount}</td>
                  <td>{element.currentState.status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
      {preloader ? <Loader message={"Fetching Inventory"} /> : null}
    </>
  );
};

export default CompleteProductsTable;
