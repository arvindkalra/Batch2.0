import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0
        }
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
    console.log(obj);
  }, [data]);
  return (
    <div className={"bar-graph-container"}>
      <Bar data={barData} options={options}/>
    </div>
  );
};

export default ManufacturerBarGraph;
