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
        gold.push(element.participantFrame.totalGold);
    });
    console.log(gold)
    console.log(gold1)

    //*Array of timestamps to print if graph
    let timestamps = [];
    part1.frames.forEach(element => {
        timestamps.push(GetReadableTimestamp(element.timestamp));
    });

    // set data
    const [barData, setBarData] = useState({
        labels: timestamps,
        datasets: [
            {
                label: 'First player',
                data: gold,
                borderWidth: 3
            },
            {
                label: 'OtherPlayer',
                data: gold1,
                borderWidth: 3
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