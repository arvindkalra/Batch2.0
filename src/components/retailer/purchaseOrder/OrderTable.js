import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import OrderRow from "./OrderRow";

const OrderTable = ({ setGrandTotal, productList, updateProduct }) => {
  const [total, setTotal] = useState([]);
  useEffect(() => {
    // fetch the available products and set them in the productList state
  }, []);
  const setAmount = (cost, amount, index) => {
    total[index] = cost;
    updateProduct(index, "orderedAmount", amount);

    setTotal(total);
    setGrandTotal(total);
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Product Id</th>
          <th>Product Name</th>
          <th>Distributor</th>
          <th>Quantity</th>
          <th>Available Units</th>
          <th>Price( Rs x.xx / unit)</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {productList.map((product, index) => {
          return (
            <OrderRow
              product={product}
              key={product.id}
              setAmount={(cost, amount) => {
                setAmount(cost, amount, index);
              }}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

export default OrderTable;
