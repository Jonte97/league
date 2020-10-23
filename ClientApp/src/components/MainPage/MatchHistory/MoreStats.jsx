import React from 'react';
import { useState, useEffect } from 'react';
import Build from './Build';
import Overview from './Overview';
import { getTimeLineEvents } from '../../../functions/promiseHelper';
import GraphMain from './Graphs/GraphMain';


//TODO se om det går att fixa att inte fetcha om varje gång användare öppnar och stänger component
const MoreStats = (props) => {
    const [timeline, setTimelineState] = useState({ itemEvents: [], skillOrder: [], graphData: {} });
    useEffect(() => {
        const fetchTimeline = async () => {
            const result = await getTimeLineEvents(props.participant, props.gameId);
            setTimelineState({ itemEvents: result.items, skillOrder: result.skillOrder, graphData: result.graphData })
        }
        fetchTimeline();
    }, [props.gameId]);

    const [activePage, setActivePage] = useState("build");

    const active = {
        borderBottom: "4px solid #7d2267"
    };

    return (
        <div>
            <div className="slide-down more-stats-wrapper">
                {
                    activePage != "none" ?
                        <div>
                            <ul className="matchitem-navbar">
                                <li style={activePage === "build" ? active : null} className="matchitem-navbar-left" onClick={() => { setActivePage("build") }}>Build</li>
                                <li style={activePage === "graphs" ? active : null} className="matchitem-navbar-middle" onClick={() => { setActivePage("graphs") }}>Graphs</li>
                                <li style={activePage === "overview" ? active : null} className="matchitem-navbar-right" onClick={() => { setActivePage("overview") }}>Overview</li>
                            </ul>
                        </div> :
                        null
                }
                {
                    activePage === "build" ? (
                        <Build
                            gameId={props.gameId}
                            participant={props.participant}
                            runes={props.runes}
                            stats={props.stats}
                            itemEvents={timeline.itemEvents}
                            skillOrder={timeline.skillOrder}
                            champion={props.champion}
                        />)
                        : null
                }
                {activePage === "graphs" ? (
                    <GraphMain
                        participantList={props.participantList}
                        data={timeline.graphData}
                        championList={props.championList}
                        owner={props.owner}
                    />
                ) : null}
                {
                    activePage === "overview" ? (
                        <Overview 
                            champList={props.championList}
                            participantList={props.participantList}
                            summonerSpells={props.summonerSpells}
                            identities={props.identities}
                        />
                    )
                        : null
                }
                {activePage === "other" ? (<div />) : null}
            </div >
        </div>
    );
}

export default MoreStats