import React from "react";
import { Doughnut } from "react-chartjs-2";
import { setLabelsForGraphs } from "../../../../helpers";

const PieChart1 = ({ numSown, numInventory, numSold }) => {
  const labels = [
    "Plants To Be Harvested",
    "Plants in Inventory",
    "Plants Already Sold"
  ];
  const backgrounds = ["#FF6384", "#36A2EB", "#007f02"];
  console.log(numSown, numInventory, numSold);
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
    <Doughnut
      data={{
        labels: labels,
        datasets: [
          {
            data: [numSown, numInventory, numSold],
            backgroundColor: backgrounds
          }
        ]
      }}
      options={options}
    />
  );
};

export default PieChart1;
