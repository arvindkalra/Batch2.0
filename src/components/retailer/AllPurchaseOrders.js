import React, { useState, useEffect } from "react";
import { makeXHR } from "../../helpers";
import { OWN_ADDRESS } from "../../dbController/Web3Connections";
import { connectToWeb3, convertToHex } from "../../dbController/init";
import { Table } from "react-bootstrap";
import index from "react-chartjs-2";
import { Link } from "react-router-dom";

const AllPurchaseOrders = ({ noPurchaseOrder, forRetailer }) => {
  const [tableRows, setTableRows] = useState([]);

  //TODO address to be passed is supposed to be distributor, but passing OWN_ADDRESS since there is no such api endpoint to handle this situation
  useEffect(() => {
    connectToWeb3().then(() => {
      makeXHR("GET", `order/get/all?address=${OWN_ADDRESS}`).then(
        ({ result }) => findPurchaseOrdersForRetailer(result)
      );
    });
  }, []);

  const findPurchaseOrdersForRetailer = result => {
    let tempTableRows = tableRows;
    let purchaseOrders = [];
    if (result.length === 0) {
      console.log("No Purchase Order");
      noPurchaseOrder();
      return;
    }
    // Find purchase id's for this retailer
    result.forEach(element => {
      if (
        (forRetailer && element.retailerAddress === OWN_ADDRESS) ||
        !forRetailer
      ) {
        if (
          purchaseOrders.findIndex(ele => element.purchaseOrderId === ele) ===
          -1
        ) {
          purchaseOrders.push(element.purchaseOrderId);
        }
      }
    });

    purchaseOrders.forEach(orderId => {
      makeXHR("GET", `purchase-order/get?purchaseOrder=${orderId}`).then(
        ({ result }) => {
          let numOrders = result.orders.length;
          let purchaseOrderId = convertToHex(orderId);
          let orderTime = result.orders[0].orderDate;
          let status = "";
          let pending = false;
          let completed = false;
          for (let i = 0; i < result.orders.length; i++) {
            let order = result.orders[i];
            if (pending && completed) break;
            if (order.currentState === "Pending") {
              pending = true;
            } else if (order.currentState === "Completed") {
              completed = true;
            }
          }

          if (pending && completed) {
            status = "Partially Completed";
          } else if (pending) {
            status = "Pending";
          } else {
            status = "Completed";
          }

          let objToAdd = {
            numOrders,
            status,
            orderTime,
            purchaseOrderId,
            numOrderId: orderId
          };
          tempTableRows.push(objToAdd);
          tempTableRows.sort((a, b) => {
            return b.numOrderId - a.numOrderId;
          });
          setTableRows([...tempTableRows]);
        }
      );
    });
  };

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
                      <Link to={`/retailer/order/${element.purchaseOrderId}`}>
                        {element.purchaseOrderId}
                      </Link>
                    </span>
                  ) : (
                      <span className={'under-linked'}>
                      <Link to={`/distributor/order/${element.purchaseOrderId}`}>
                    {element.purchaseOrderId}
                      </Link>
                          </span>
                  )}
                </td>
                <td>{element.numOrders}</td>
                <td>{element.orderTime}</td>
                <td>{element.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AllPurchaseOrders;
