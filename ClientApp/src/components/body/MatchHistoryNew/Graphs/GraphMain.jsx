import React, { useRef, useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { GetReadableTimestamp } from '../../../../functions/TimeStampHelper';
import { getDatasets } from '../../../../functions/GraphHelper'
import { configureGraphData } from '../../../../functions/GraphHelper'
import { getParticipantTeam } from '../../../../functions/GraphHelper'
const blueColors = [
    "#b0dfe5",
    "#7703fc",
    "#1d00c4",
    "#588bae",
    "#03fca5"
]
const redColors = [
    "#b1560f",
    "#7c0a02",
    "#b80f0a",
    "#fa8072",
    "#d2b55b"
]
const getCandidatesArray = (list, owner) => {
    let array = [];
    let b = 0;
    let r = 0;
    list.forEach(element => {

        let obj = {};
        if (element.teamId === 100) {
            if (element.participantId === owner) {
                obj = { participantId: element.participantId, active: true, color: blueColors[b] };
            }
            else {
                obj = { participantId: element.participantId, active: false, color: blueColors[b] };
            }
            b++;
        }
        else {
            if (element.participantId === owner) {
                obj = { participantId: element.participantId, active: true, color: redColors[r] };
            }
            else {
                obj = { participantId: element.participantId, active: false, color: redColors[r] };
            }
            r++;
        }
        array.push(obj);
    });
    return array;
}
//!!!! Potential solution remove labels and pass data for player as datasets when clicked
const GraphMain = (props) => {
    const options = [{ id: "gold", title: "Total Gold" }, { id: "xp", title: "Total experience points" }, { id: "cs", title: "Total minions killed" }];
    const [active, setActive] = useState(options[0]);
    const initialData = configureGraphData(props.data.participantFrames, props.participantList, props.championList);
    const activeColor = { borderBottom: '3px solid #9acd32' };
    const [navbarActive, setNavbarActive] = useState([activeColor, {}, {}, {}]);
    const [teamParticipants, setTeamParticipants] = useState();
    const [candidates, setCandidates] = useState(getCandidatesArray(props.participantList, props.owner));

    //*Array of timestamps to print if graph
    let timestamps = [];
    let x = props.data.participantFrames.find((obj) => { return obj.participantId === 1 });
    x.frames.forEach(element => {
        timestamps.push("Min " + GetReadableTimestamp(element.timestamp));
    });
    // set data
    const [barData, setBarData] = useState({});
    useEffect(() => {
        setTeamParticipants(getParticipantTeam(props.participantList, props.championList, candidates));
        let dataset = getDatasets(initialData, options[0], candidates);
        setBarData({ labels: timestamps, datasets: dataset });
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
                text: active.title,
                fontSize: 25,
                fontColor: "#FFF"
            },
            legend: {
                display: false,
                position: 'top'
            }
        }
    });

    const addRemoveCandidates = (participant) => {
        let index = null;
        let cand = null;
        let array = candidates;
        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i].participantId === participant.participantId) {
                index = i;
                cand = candidates[i];
            }
        }
        if (cand.active === true) {
            array[index].active = false;
        }
        else {
            array[index].active = true;
        }
        setCandidates(array);
        let newDataset = getDatasets(initialData, active, array);
        setBarData({ labels: timestamps, datasets: newDataset });
    }

    const updateChartSettings = (id) => {
        //TODO FIX For tomorow team gold
        let option = options[id];
        //* UPDATE states
        setActive(options[id]);
        setBarOptions({ ...barOptions, options: { title: { text: options[id].title } } })

        //*FETCH DATA
        let ndataset = getDatasets(initialData, option, candidates)
        setBarData({ labels: timestamps, datasets: ndataset })

        //* SET Border on navbar
        let replace = [{}, {}, {}];
        replace[id] = activeColor;
        setNavbarActive(replace);
    }
    const activeParticipant = (part) => {
        const partColor = candidates.find((obj) => { return obj.participantId === part.participantId })
        console.log(partColor);
        const activeParticipant = {
            borderBottom: `5px solid ${partColor.color}`
        }
        return activeParticipant;
    }
    const inactiveParticipant = {
        filter: 'grayscale(1)'
    }
    return (
        <div className="graph-container">
            <div className="graph-navbar-items">
                <ul className="graph-participantlist-blue">
                    {teamParticipants && candidates ?
                        teamParticipants.blue.map((participant, key) =>
                            <li
                                key={key}
                                style={
                                    candidates.find((obj) => obj.participantId === participant.participantId).active === false ?
                                        inactiveParticipant
                                        :
                                        activeParticipant(participant)}
                            >
                                <a onClick={() => addRemoveCandidates(participant)}>
                                    {candidates ?
                                        <img
                                            className="graph-list-thumbnail"
                                            alt="image"
                                            src={participant.champUrl}
                                        /> :
                                        null}
                                </a>
                            </li>
                        )
                        : null
                    }
                </ul>

                <ul className="graph-participantlist-red">
                    {teamParticipants && candidates ?
                        teamParticipants.red.map((participant, key) =>
                            <li
                                key={key}
                                style={
                                    candidates.find((obj) => obj.participantId === participant.participantId).active === false ?
                                        inactiveParticipant
                                        :
                                        activeParticipant(participant)}
                            >
                                <a onClick={() => addRemoveCandidates(participant)}>
                                    {candidates ?
                                        <img
                                            className="graph-list-thumbnail"
                                            alt="image"
                                            src={participant.champUrl}
                                        /> :
                                        null}
                                </a>
                            </li>
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