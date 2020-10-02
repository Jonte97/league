import React, { useRef, useEffect, useState } from 'react';
import Chartjs from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2';
import { GetReadableTimestamp } from '../../../../functions/TimeStampHelper';

//TODO fix colors for each elememnt. Another array for that?
const getDatasets = (displayData, option) => {
    let data = [];

    for (let i = 0; i < 10; i++) {
        const element = {
            label: displayData[i].champion,
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
            data: displayData[i].gold
        }
        data.push(element);
    }
    return data;
}

const setupGrafData = (participantFrames, participantList, championList) => {
    let data = [];
    for (let i = 0; i < participantFrames.length; i++) {
        let x = participantFrames.find((obj) => { return obj.participantId === i + 1 });
        let obj = { participantId: x.participantId, gold: [], cs: [], exp: [] }
        data.push({});
        x.frames.forEach(element => {
            obj.gold.push(element.participantFrame.totalGold);
            obj.cs.push(element.participantFrame.minionsKilled);
            obj.exp.push(element.participantFrame.xp);
        });
        data[i].gold = obj.gold;
        data[i].cs = obj.cs;
        data[i].exp = obj.exp;
        data[i].participantId = obj.participantId;
        let champId = participantList.find((y) => { return y.participantId === obj.participantId })
        let champion = championList.find((y) => { return y.k == champId.championId })
        //TODO should be img later
        data[i].champion = champion.v.name;
    }
    return data;
}
const GraphMain = (props) => {
    const [displayData, setDisplayData] = useState(setupGrafData(props.data.participantFrames, props.participantList, props.championList));

    //*Array of timestamps to print if graph
    let timestamps = [];
    let x = props.data.participantFrames.find((obj) => { return obj.participantId === 1 });
    x.frames.forEach(element => {
        timestamps.push("Min " + GetReadableTimestamp(element.timestamp));
    });
    const options = ["Total Gold", "Total experience points", "Total minions killed"];
    const [chartSettings, setChartSettings] = useState({
        options: options,
        active: options[0]
    });
    const dataset = getDatasets(displayData, options);
    console.log(dataset);
    // set data
    const [barData, setBarData] = useState({
        labels: timestamps,
        datasets: dataset
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
                text: chartSettings.active,
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