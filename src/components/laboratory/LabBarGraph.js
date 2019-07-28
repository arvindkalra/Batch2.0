import React from 'react';
import {Bar} from "react-chartjs-2";

const LabBarGraph = ({labels,dataArray}) => {

    const options ={


        title: {
            display: false,

        },
        responsive: true,
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                display:true,
                gridLines:{
                    display: true,
                    drawBorder: false
                },
                ticks: {
                    suggestedMin: 0,
                    beginAtZero: true,
                    suggestedMax: 100
                }
            }],
            xAxes:[{
                gridLines:{
                    display: true,
                    drawBorder: false
                }

            }]
        }


    }
    return (
        <Bar data={{labels: labels, datasets:[{data:dataArray}]} }  options={options}/>
    );
};

export default LabBarGraph;
