import React, {useEffect, useState} from "react";
import {Doughnut} from "react-chartjs-2";
import {setLabelsForGraphs} from "../../../helpers";
import colors from '../../colors'

const PieChart1 = ({numApproved, numRejected}) => {
    const [total, setTotal] = useState(numRejected + numApproved);
    useEffect(() => {
        setTotal(numRejected + numApproved);
    }, [numRejected, numApproved]);
    const labels = ["Plant Samples Approved", "Plant Samples Rejected"];
    const backgrounds = [colors.red, colors.green];

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
                            ((numApproved / total) * 100).toFixed(2),
                            ((numRejected / total) * 100).toFixed(2)
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
