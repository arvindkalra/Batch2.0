import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { setLabelsForGraphs } from "../../../../helpers";
import colors from '../../../colors'
const PieChart3 = ({ numHarvested, numDestroyed }) => {
  const [total, setTotal] = useState(numHarvested + numDestroyed);
  useEffect(() => {
    setTotal(numHarvested + numDestroyed);
  }, [numDestroyed, numHarvested]);
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
            data: [
              ((numHarvested / total) * 100).toFixed(2),
              ((numDestroyed / total) * 100).toFixed(2)
            ],
            backgroundColor: [colors.green,colors.red],
            hoverBackgroundColor: [colors.green,colors.red]
          }
        ]
      }}
      options={options}
    />
  );
};

export default PieChart3;
