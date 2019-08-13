import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
const colors = [
  "#b3e5fc",
  "#81d4fa",
  "#4fc3f7",
  "#29b6f6",
  "#03a9f4",
  "#039be5"
];
const BarGraph = ({ ObjectToShow }) => {
  const [dataArray, setDataArray] = useState([]);
  const [labels, setLabels] = useState([]);
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
            drawBorder: false
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100
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
  const graphLabel = "Seeds Sown";
  useEffect(() => {
    console.log(ObjectToShow);
    let objectKeys = Object.keys(ObjectToShow);
    setLabels(objectKeys);
    let tempDataArray = [];
    for (let i = 0; i < objectKeys.length; i++) {
      tempDataArray.push(ObjectToShow[objectKeys[i]]);
    }
    setDataArray(tempDataArray);
  }, [JSON.stringify(ObjectToShow)]);
  return (
    <Row>
      <Col md={12}>
        <Bar
          data={{ datasets: [{ data: dataArray, label: graphLabel, backgroundColor: colors }], labels: labels }}
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
