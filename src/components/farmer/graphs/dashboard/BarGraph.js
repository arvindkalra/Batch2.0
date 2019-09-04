import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import colors from '../../../colors'
// const data = {
//     labels: ['Gundza', 'Ruddee', 'Tazzie'],
//     datasets:[{
//
//         backgroundColor : ['green','deepskyblue','#ff1493'],
//         label: 'Seeds Sown',
//         data:[100,90,80]
//     }
//     ]
// };
const graphColors = [
  colors.darkGreen,
  colors.darkGreen,
  colors.darkGreen,
  colors.darkGreen,
  colors.darkGreen,
  colors.darkGreen,
  colors.darkGreen,
  colors.darkGreen,
  colors.darkGreen,
  colors.darkGreen,
  colors.darkGreen,
  colors.darkGreen
];
const BarGraph = ({ ObjectToShow, changed, label }) => {
  let change = changed ? changed : JSON.stringify(ObjectToShow);
  const [dataArray, setDataArray] = useState([]);
  const [labels, setLabels] = useState([]);
  const options = {

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
          display: true,
          gridLines: {
            display: true,
            drawBorder: true
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 5
          }
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
  const graphLabel = label;
  useEffect(() => {

    let objectKeys = Object.keys(ObjectToShow);
    setLabels(objectKeys);
    let tempDataArray = [];
    for (let i = 0; i < objectKeys.length; i++) {
      tempDataArray.push(ObjectToShow[objectKeys[i]]);
    }
    setDataArray(tempDataArray);
  }, [JSON.stringify(ObjectToShow), change]);
  return (
    <Row>
      <Col md={12}>
        <Bar
          data={{
            datasets: [
              { data: dataArray, label: graphLabel, backgroundColor: graphColors }
            ],
            labels: labels
          }}
          options={options}
        />
      </Col>
      {/*<Col className={"graph-details"}>*/}
      {/*  <ul>*/}
      {/*    <h5>graph details</h5>*/}
      {/*    <li className={"ready-for-harvest"}> Gundza: 100 seeds sown </li>*/}
      {/*    <li className={"harvested"}>Ruddee: 90 seeds sown </li>*/}
      {/*    <li className={"lab-tested"}> Tazzie: 80 seeds sown</li>*/}
      {/*  </ul>*/}
      {/*</Col>*/}
    </Row>
  );
};

export default BarGraph;
