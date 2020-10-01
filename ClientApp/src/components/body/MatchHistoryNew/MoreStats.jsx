import React from 'react';
import { useState, useEffect } from 'react';
import Build from './Build';
import Overview from './Overview';
import { getTimeLineEvents } from '../../../functions/promiseHelper';
import GraphMain from './Graphs/GraphMain';


const MoreStats = (props) => {
    const [activePage, setActivePage] = useState("none");
    const [itemEvents, setItemEvents] = useState();
    const [skillOrder, setSkillOrder] = useState();
    const [graphData, setGraphData] = useState();
    const [fetched, setFetched] = useState(false);

    const fetchData = () => {
        if (!fetched) {
            getTimeLineEvents(setItemEvents, setSkillOrder, setGraphData, props.participant, props.gameId);
        }
        setActivePage("build");
        setFetched(true);
    }

    return (
        <React.Fragment>
            <a onClick={
                () => {
                    activePage == "none" ?
                        fetchData()
                        :
                        setActivePage("none")
                }}
            >See more stats</a>
            {
                activePage != "none" ?
                    < div >
                        <a className="text-left" onClick={() => { setActivePage("build") }}>Build</a>
                        <a className="text-center" onClick={() => { setActivePage("graphs") }}>Graphs</a>
                        <a className="text-right" onClick={() => { setActivePage("other") }}>Other</a>
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
                        itemEvents={itemEvents}
                        skillOrder={skillOrder}
                    />)
                    : null
            }
            {activePage === "graphs" ? (
                <GraphMain
                    data={graphData}
                />
            ) : null}
            { activePage === "graphs" ? (<div />) : null}
            { activePage === "other" ? (<div />) : null}
        </React.Fragment >
    );
}

export default MoreStats