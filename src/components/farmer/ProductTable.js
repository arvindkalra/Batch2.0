import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const ProductTable = ({ rows, showForMore }) => {
  console.log(rows);
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>Unit Id</th>
            <th>Product Name</th>
            <th>Date Planted</th>
            <th>Seed Count</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((element, id) => {
            return (
              <tr key={id}>
                <td>{element.harvestUnitId}</td>
                <td>
                  <Link to={`/farmer/products/${element.harvestUnitId}`}>
                    {element.plantName}
                  </Link>
                </td>
                <td>{element.datePlanted}</td>
                <td>{element.seedCount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ul className={"table-links-list"}>
        {showForMore ? (
          <li>
            <Link to={"/all-products"}>See all harvests </Link>
          </li>
        ) : (
          <></>
        )}
        <li>
          <Link to={"/farmer/add-new-harvest"}> Add a new harvest</Link>
        </li>
      </ul>
    </>
  );
};

export default ProductTable;
