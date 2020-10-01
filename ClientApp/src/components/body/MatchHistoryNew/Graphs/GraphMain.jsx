import React, { useRef, useEffect, useState } from 'react';
import Chartjs from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2';
import { GetReadableTimestamp } from '../../../../functions/TimeStampHelper';

const GraphMain = (props) => {
    const [displayData, setDisplayData] = useState([]);
    let part1 = props.data.participantFrames.find((obj) => { return obj.participantId === 1 });
    let part2 = props.data.participantFrames.find((obj) => { return obj.participantId === 2 });
    console.log(part1.frames);
    let gold = [];
    part2.frames.forEach(element => {
        gold.push(element.participantFrame.totalGold);
    });

    let gold1 = [];
    part1.frames.forEach(element => {
        gold1.push(element.participantFrame.totalGold);
    });
    console.log(gold)
    console.log(gold1)

    //*Array of timestamps to print if graph
    let timestamps = [];
    part1.frames.forEach(element => {
        timestamps.push("Min "+GetReadableTimestamp(element.timestamp));
    });

    // set data
    const [barData, setBarData] = useState({
        labels: timestamps,
        datasets: [
            {
                label: 'Total Gold',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: gold1
            },
            {
                label: 'Total Gold',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: gold
            }
        ]
    });
    // set options
    const [barOptions, setBarOptions] = useState({
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Data Orgranized In Bars',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    });

    // return JSX
    return (
        <div className="BarExample">
            <Line
                data={barData}
                options={barOptions.options} />
        </div>
    );
};

export default GraphMain;