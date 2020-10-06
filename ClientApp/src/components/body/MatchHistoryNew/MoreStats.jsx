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

    return (
        <div>
            <div className="slide-down more-stats-wrapper">
                {
                    activePage != "none" ?
                        <div>
                            <ul className="matchitem-navbar">
                                <li><a className="text-left" onClick={() => { setActivePage("build") }}>Build</a></li>
                                <li><a className="text-center" onClick={() => { setActivePage("graphs") }}>Graphs</a></li>
                                <li><a className="text-right" onClick={() => { setActivePage("other") }}>Other</a></li>
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
                {activePage === "graphs" ? (<div />) : null}
                {activePage === "other" ? (<div />) : null}
            </div >
        </div>
    );
}

export default MoreStats