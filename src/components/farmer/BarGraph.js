import React from 'react';
import {Bar} from 'react-chartjs-2';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const data = {
    labels: ['Gundza', 'Ruddee', 'Tazzie'],
    datasets:[{

        backgroundColor : ['green','deepskyblue','#ff1493'],
        label: 'Seeds Sown',
        data:[100,90,80]
    }

    ]
};
const options ={

    maintainAspectRatio: false,
    title: {
        display: false,

    },
    responsive: true,
    legend: {
        display: false,
    },
    scales: {
        yAxes: [{
            display:false,
            gridLines:{
                display: false,
                drawBorder: false
            },
            ticks: {
                suggestedMin: 70,
                suggestedMax: 100
            }
        }],
        xAxes:[{
            gridLines:{
                display: false,
                drawBorder: false
            },
            barPercentage: 1
        }]
    }


}

const BarGraph = () => {
    return (
        <Row >
            <Col md={6}>
            <Bar data={data} options={options} />
            </Col>
            <Col className={'graph-details'}>
                <ul>
                    <h5>graph details</h5>
                    <li className={'ready-for-harvest'}> Gundza: 100 seeds sown </li>
                    <li className={'harvested'}>Ruddee: 90 seeds sown </li>
                    <li className={'lab-tested'}> Tazzie: 80 seeds sown</li>
                </ul>
            </Col>
        </Row>
    );
};

export default BarGraph;
