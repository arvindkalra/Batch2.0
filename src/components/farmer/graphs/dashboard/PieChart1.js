import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { setLabelsForGraphs } from "../../../../helpers";
import colors from '../../../colors';
const PieChart1 = ({ numSown, numInventory, numSold }) => {
  const [total, setTotal] = useState(numSold + numSown + numInventory);
  useEffect(() => {
    setTotal(numSold + numSown + numInventory);
  }, [numInventory, numSown, numSold]);
  const labels = [
    "Plants To Be Harvested",
    "Plants in Inventory",
    "Plants Already Sold"
  ];
  const backgrounds = [colors.green, colors.red, colors.yellow];

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
            data: [
              ((numSown / total) * 100).toFixed(2),
              ((numInventory / total) * 100).toFixed(2),
              ((numSold / total) * 100).toFixed(2)
            ],
            backgroundColor: backgrounds
          }
        ]
      }}
      options={options}
    />
  );
};

export default PieChart1;
