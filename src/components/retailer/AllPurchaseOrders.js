import React, { useState, useEffect } from "react";
import { makeXHR } from "../../helpers";
import { OWN_ADDRESS } from "../../dbController/Web3Connections";
import { connectToWeb3, convertToHex } from "../../dbController/init";
import { Table } from "react-bootstrap";
import index from "react-chartjs-2";
import { Link } from "react-router-dom";

const AllPurchaseOrders = ({ noPurchaseOrder, forRetailer }) => {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    connectToWeb3().then(() => {
      if (forRetailer) {
        makeXHR("GET", `getAllOrders?retailerAddress=${OWN_ADDRESS}`).then(
          ({ result }) => {
            setTableRows([...result]);
          }
        );
      } else {
        makeXHR("GET", `getAllOrders?distributorAddress=${OWN_ADDRESS}`).then(
          ({ result }) => {
            setTableRows([...result]);
          }
        );
      }
    });
  }, []);
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th># Order ID</th>
            <th>Number of Items</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((element, idx) => {
            return (
              <tr key={idx}>
                <td>
                  {forRetailer ? (
                    <span className={"under-linked"}>
                      <Link
                        to={`/retailer/order/${convertToHex(element.orderId)}`}
                      >
                        {convertToHex(element.orderId)}
                      </Link>
                    </span>
                  ) : (
                    <span className={"under-linked"}>
                      <Link
                        to={`/distributor/order/${convertToHex(
                          element.orderId
                        )}`}
                      >
                        {convertToHex(element.orderId)}
                      </Link>
                    </span>
                  )}
                </td>
                <td>{element.totalItems}</td>
                <td>{element.time}</td>
                <td>{element.orderStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AllPurchaseOrders;
