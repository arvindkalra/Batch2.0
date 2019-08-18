import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { Bar } from "react-chartjs-2";
import Row from "react-bootstrap/Row";

const colors = ["#1e88e5", "#0d47a1", "#82b1ff"];

const options = {
  responsive: true,
  legend: {
    position: "top"
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const GroupedBarGraph = ({ ObjectToShow }) => {
  const [labels, setLabels] = useState([]);
  const [packed, setPacked] = useState([]);
  const [dispatched, setDispatched] = useState([]);
  const [delivered, setDelivered] = useState([]);
  useEffect(() => {
    let objectKeys = Object.keys(ObjectToShow);
    setLabels(objectKeys);
    let tempPacked = [];
    let tempDispatched = [];
    let tempDelivered = [];
    for (let i = 0; i < objectKeys.length; i++) {
      let key = ObjectToShow[objectKeys[i]];
      tempPacked.push(key[0]);
      tempDispatched.push(key[1]);
      tempDelivered.push(key[2]);
    }
    console.log(tempPacked);
    setPacked(tempPacked);
    setDelivered(tempDelivered);
    setDispatched(tempDispatched);
  }, [JSON.stringify(ObjectToShow)]);

  return (
    <Row>
      <Col md={12}>
        <Bar
          data={{
            datasets: [
              { data: packed, label: "Packed", backgroundColor: colors[0] },
              {
                data: dispatched,
                label: "Dispatched",
                backgroundColor: colors[1]
              },
              {
                data: delivered,
                label: "Delivered",
                backgroundColor: colors[2]
              }
            ],
            labels: labels
          }}
          options={options}
        />
      </Col>
    </Row>
  );
};

export default GroupedBarGraph;
