import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { setLabelsForGraphs } from "../../../../helpers";
import colors from '../../../colors'
const PieChart2 = ({ numApproved, numRejected }) => {
  const [total, setTotal] = useState(numRejected + numApproved);
  useEffect(() => {
    setTotal(numApproved + numRejected);
  }, [numApproved, numRejected]);
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
            data: [
              ((numApproved / total) * 100).toFixed(2),
              ((numRejected / total) * 100).toFixed(2)
            ],
            backgroundColor: [colors.green, colors.red],
            hoverBackgroundColor: [colors.green, colors.red]
          }
        ]
      }}
      options={options}
    />
  );
};

export default PieChart2;
