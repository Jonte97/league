import React, { useRef, useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { GetReadableTimestamp } from '../../../../functions/TimeStampHelper';
import { getDatasets } from '../../../../functions/GraphHelper'
import { configureGraphData } from '../../../../functions/GraphHelper'
import { getParticipantTeam } from '../../../../functions/GraphHelper'

const getCandidatesArray = (list, owner) => {
    let array = [];
    list.forEach(element => {

        let obj = {};
        if (element.participantId === owner) {
            obj = { participantId: element.participantId, active: true };
        }
        else {
            obj = { participantId: element.participantId, active: false };
        }
        array.push(obj);
    });
    return array;
}
//!!!! Potential solution remove labels and pass data for player as datasets when clicked
const GraphMain = (props) => {
    const options = [{ id: "gold", title: "Total Gold" }, { id: "xp", title: "Total experience points" }, { id: "cs", title: "Total minions killed" }];
    const [active, setActive] = useState(options[0].title);
    const initialData = configureGraphData(props.data.participantFrames, props.participantList, props.championList);
    const activeColor = { borderBottom: '3px solid #9acd32' };
    const [navbarActive, setNavbarActive] = useState([activeColor, {}, {}, {}]);
    const [teamParticipants, setTeamParticipants] = useState();
    const [candidates, setCandidates] = useState();

    //*Array of timestamps to print if graph
    let timestamps = [];
    let x = props.data.participantFrames.find((obj) => { return obj.participantId === 1 });
    x.frames.forEach(element => {
        timestamps.push("Min " + GetReadableTimestamp(element.timestamp));
    });
    // set data
    const [barData, setBarData] = useState({});
    useEffect(() => {
        setCandidates(getCandidatesArray(props.participantList, props.owner))
        setTeamParticipants(getParticipantTeam(props.participantList, props.championList, candidates));
        let dataset = getDatasets(initialData, options[0], candidates);
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

    const addRemoveCandidates = (id) => {

    }

    const updateChartSettings = (id) => {
        //TODO FIX For tomorow team gold
        let option = options[id];
        //* UPDATE states
        setActive(options[id].title);
        setBarOptions({ ...barOptions, options: { title: { text: options[id].title } } })

        //*FETCH DATA
        let ndataset = getDatasets(initialData, option, candidates)
        setBarData({ labels: timestamps, datasets: ndataset })

        //* SET Border on navbar
        let replace = [{}, {}, {}];
        replace[id] = activeColor;
        setNavbarActive(replace);
    }

    return (
        <div className="graph-container">
            <div className="graph-navbar-items">
                <ul className="graph-participantlist-blue">
                    {teamParticipants ?
                        teamParticipants.blue.map((participant, key) =>
                            <li key={key}><img className="graph-list-thumbnail" alt="image" src={participant.champUrl} /></li>
                        )
                        : null
                    }
                </ul>

                <ul className="graph-participantlist-red">
                    {teamParticipants ?
                        teamParticipants.red.map((participant, key) =>
                            <li key={key}><a ><img className="graph-list-thumbnail" alt="image" src={participant.champUrl} /></a></li>
                        )
                        : null
                    }
                </ul>
            </div>
            <div>
                <ul className="graph-nav">
                    <li className="graph-nav-listitem">
                        <a style={navbarActive[0]} onClick={() => updateChartSettings(0)}>Total gold</a>
                    </li>
                    <li className="graph-nav-listitem">
                        <a style={navbarActive[1]} onClick={() => updateChartSettings(1)}>Xp gained</a>
                    </li>
                    <li className="graph-nav-listitem">
                        <a style={navbarActive[2]} onClick={() => updateChartSettings(2)}>Minions killed</a>
                    </li>
                    <li className="graph-nav-listitem">
                        <a style={navbarActive[3]} onClick={() => updateChartSettings(3)}>Team gold</a>
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