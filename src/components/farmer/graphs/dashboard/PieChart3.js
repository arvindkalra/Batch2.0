import React from 'react';
import {Pie} from 'react-chartjs-2';
import {setLabelsForGraphs} from "../../../../helpers";



const PieChart3 = () => {
    const data = {
        labels: [
            'Successfully harvested',
            'Disposed',

        ],

        datasets: [{
            data: [80,20],
            backgroundColor: [
                '#007f02',
                '#ff0034',

            ],
            hoverBackgroundColor: [
                '#007f02',
                '#ff0034',

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
        <Pie data={data} options={options} />

    );
};

export default PieChart3;
