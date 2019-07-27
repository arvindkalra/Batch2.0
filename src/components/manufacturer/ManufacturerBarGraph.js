import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const options = {
  maintainAspectRatio: false,
  title: {
    display: false
  },
  responsive: true,
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        display: false,
        gridLines: {
          display: true,
          drawBorder: true
        },
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false
        },
        barPercentage: 1
      }
    ]
  }
};
const colors = [
  "#b3e5fc",
  "#81d4fa",
  "#4fc3f7",
  "#29b6f6",
  "#03a9f4",
  "#039be5"
];

const ManufacturerBarGraph = ({ data }) => {
  const [barData, setBarData] = useState({});
  useEffect(() => {
    let labels = Object.keys(data);
    let values = [];
    labels.forEach(element => {
      values.push(data[element]);
    });
    let background = colors.slice(0, labels.length);
    let obj = {
      labels: labels,
      datasets: [
        {
          backgroundColor: background,
          label: "Pounds",
          data: values
        }
      ]
    };
    setBarData(obj);
  }, [data]);
  return (
    <div className={"bar-graph-container"}>
      <Bar data={barData}/>
    </div>
  );
};

export default ManufacturerBarGraph;
