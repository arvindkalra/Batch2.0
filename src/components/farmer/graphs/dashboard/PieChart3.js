import React from "react";
import { Pie } from "react-chartjs-2";
import { setLabelsForGraphs } from "../../../../helpers";

const PieChart3 = ({ numHarvested, numDestroyed }) => {
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
        labels: ["Successfully Harvested", "Destroyed"],

        datasets: [
          {
            data: [numHarvested, numDestroyed],
            backgroundColor: ["#007f02", "#ff0034"],
            hoverBackgroundColor: ["#007f02", "#ff0034"]
          }
        ]
      }}
      options={options}
    />
  );
};

export default PieChart3;
