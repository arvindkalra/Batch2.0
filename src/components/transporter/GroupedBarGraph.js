import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { Bar } from "react-chartjs-2";
import Row from "react-bootstrap/Row";

const colors = ["#42aea3", "#ed553b"];

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

const GroupedBarGraph = ({ row1, row2 }) => {
  const [labels, setLabels] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  useEffect(() => {
    let objectKeys = Object.keys(row1);
    setLabels(objectKeys);
    let tempApproved = [];
    let tempRejected = [];
    for (let i = 0; i < objectKeys.length; i++) {
      tempApproved.push(row1[objectKeys[i]]);
      tempRejected.push(row2[objectKeys[i]]);
    }
    setApproved(tempApproved);
    setRejected(tempRejected);
  }, [JSON.stringify(row1), JSON.stringify(row2)]);

  return (
    <Row>
      <Col md={12}>
        <Bar
          data={{
            datasets: [
              {
                data: approved,
                label: "Approved",
                backgroundColor: colors[0]
              },
              {
                data: rejected,
                label: "Rejected",
                backgroundColor: colors[1]
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
