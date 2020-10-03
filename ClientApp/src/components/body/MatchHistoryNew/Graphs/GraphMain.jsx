import React, { useRef, useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { GetReadableTimestamp } from '../../../../functions/TimeStampHelper';
import { getDatasets } from '../../../../functions/GraphHelper'
import { configureGraphData } from '../../../../functions/GraphHelper'


//!!!! Potential solution remove labels and pass data for player as datasets when clicked
const GraphMain = (props) => {
    const options = [{ id: "gold", title: "Total Gold" }, { id: "xp", title: "Total experience points" }, { id: "cs", title: "Total minions killed" }];
    const [active, setActive] = useState(options[0].title);
    const initialData = configureGraphData(props.data.participantFrames, props.participantList, props.championList);
    const activeColor = { borderBottom: '3px solid #9acd32' };
    const [navbarActive, setNavbarActive] = useState([ activeColor, {}, {}]);

    //*Array of timestamps to print if graph
    let timestamps = [];
    let x = props.data.participantFrames.find((obj) => { return obj.participantId === 1 });
    x.frames.forEach(element => {
        timestamps.push("Min " + GetReadableTimestamp(element.timestamp));
    });
    // set data
    const [barData, setBarData] = useState({});
    useEffect(() => {
        let dataset = getDatasets(initialData, options[0]);
        setBarData({ labels: timestamps, datasets: dataset })
    }, [])

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
                text: active,
                fontSize: 25,
                fontColor: "#FFF"
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    });

    const updateChartSettings = (id) => {
        let option = options[id];
        setActive(options[id].title);
        setBarOptions({ ...barOptions, options: { title: { text: options[id].title } } })
        let ndataset = getDatasets(initialData, option)
        setBarData({ labels: timestamps, datasets: ndataset })
        let replace = [{},{},{}];
        replace[id] = activeColor;
        setNavbarActive(replace);
    }

    return (
        <div>
            <div>
                <ul className="graph-nav">
                    <li className="graph-nav-listitem">
                        <a style={navbarActive[0]} onClick={() => updateChartSettings(0)}>Show gold</a>
                    </li>
                    <li className="graph-nav-listitem">
                        <a style={navbarActive[1]} onClick={() => updateChartSettings(1)}>Show experiencepoints</a>
                    </li>
                    <li className="graph-nav-listitem">
                        <a style={navbarActive[2]} onClick={() => updateChartSettings(2)}>Show creep score</a>
                    </li>
                </ul>
            </div>
            <div className="line-chart">
                <Line
                    data={barData}
                    options={barOptions.options} />
            </div>
        </div>
    );
};


export default GraphMain;