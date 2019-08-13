import React from "react";
import { Pie } from "react-chartjs-2";
import { setLabelsForGraphs } from "../../../../helpers";

const PieChart2 = ({numApproved, numRejected}) => {
  const options = {
    legend: {
      position: "left"
    },
    tooltips: {
      callbacks: {
        label: (item, obj) => {
          return setLabelsForGraphs(item, obj);
        }
      }
    }
  };
  return (
    <Pie
      data={{
        labels: ["Approved Tests", "Rejected Tests"],

        datasets: [
          {
            data: [numApproved, numRejected],
            backgroundColor: ["#007f02", "#ff0034"],
            hoverBackgroundColor: ["#007f02", "#ff0034"]
          }
        ]
      }}
      options={options}
    />
  );
};

// datasetIndex: 0
// index: 0
// label: ""
// value: ""
// x: 383.1259078979492
// xLabel: ""
// y: 142
// yLabel: ""
// __proto__: Object
//
// {labels: Array(2), datasets: Array(1)}
// datasets: Array(1)
// 0:
// backgroundColor: (2) ["#007f02", "#ff0034"]
// data: (2) [80, 20, _chartjs: {…}, push: ƒ, pop: ƒ, shift: ƒ, splice: ƒ, …]
// hoverBackgroundColor: (2) ["#007f02", "#ff0034"]
// _meta: {2: {…}}
// __proto__: Object
// length: 1
// __proto__: Array(0)
// labels: (2) ["passed tests ", "Samples that failed tests"]
// __proto__: Object

export default PieChart2;
