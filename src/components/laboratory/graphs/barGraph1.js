import React from 'react';
import {Bar} from 'react-chartjs-2';

const BarGraph1 = () => {
    const options = {

        maintainAspectRatio: false,
        title: {
            display: false,

        },
        height: '370px',
        responsive: true,
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                display: true,
                gridLines: {
                    display: false,
                    drawBorder: true
                },
                ticks: {
                    suggestedMin: 10,
                    suggestedMax: 100
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: true
                },
                barPercentage: 1
            }]
        }


    };
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May','July', 'August', 'September','October', 'November','December' ],
        datasets: [{


            label: 'Percentage of Samples Approved',
            data: [100, 90, 80,5, 70 ,60 ,40 ,76,50,54 ,65,10,30]
        }

        ]
    };
    return (
        <div>
            <Bar data={data} options={options} height={370}/>
        </div>
    );
};

export default BarGraph1;
