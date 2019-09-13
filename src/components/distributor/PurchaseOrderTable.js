import React from "react";
import { Table } from "react-bootstrap";

const PurchaseOrderTable = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#ID</th>
          <th>Purchase Order ID</th>
          <th>Retailer Name</th>
          <th>Product Name</th>
          <th>Order Amount</th>
        </tr>
      </thead>
    </Table>
  );
};

export default PurchaseOrderTable;
