import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { setLabelsForGraphs } from "../../../../helpers";

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
            backgroundColor: ['#4BC0C0','#FF6384'],
            hoverBackgroundColor: ['#4BC0C0','#FF6384']
          }
        ]
      }}
      options={options}
    />
  );
};

export default PieChart2;
