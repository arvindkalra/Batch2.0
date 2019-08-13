import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {setLabelsForGraphs} from "../../../../helpers";


const PieChart1 = () => {
    const data = {
        labels: [
            'crop to be harvested',
            'crop already harvested',
            'crop in inventory',
            'crop already  sold'
        ],

        datasets: [{
            data: [30, 30,20 ,10],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#007f02',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };

    const options={
        legend: {
            position: 'left'
        },
        tooltips: {
            callbacks: {
                label: (item, obj) => {
                    return(setLabelsForGraphs(item,obj))
                }
            }
        }
    };
    return (
        <Doughnut data={data} options={options} />

    );
};

export default PieChart1;
