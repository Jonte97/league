import React from 'react';
import { useState, useEffect } from 'react';
import Build from './Build';
import Overview from './Overview';
import { getItemEventsForParticipant } from '../../../functions/promiseHelper';


const MoreStats = (props) => {
    const [activePage, setActivePage] = useState("none");
    const [itemEvents, setItemEvents] = useState();
    const [skillOrder, setSkillOrder] = useState();

    const fetchData = () => {
        getItemEventsForParticipant(setItemEvents, setSkillOrder, props.participant, props.gameId);
        setActivePage("build")
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
                        <a className="text-left" onClick={() => { activePage != "build" ? setActivePage("build") : setActivePage("none") }}>Build</a>
                        <a className="text-center" onClick={() => { activePage != "graph" ? setActivePage("graph") : setActivePage("none") }}>Graphs</a>
                        <a className="text-right" onClick={() => { activePage != "other" ? setActivePage("other") : setActivePage("none") }}>Other</a>
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
            {activePage === "overview" ? (
                <Overview />
            ) : null}
            { activePage === "graphs" ? (<div />) : null}
            { activePage === "other" ? (<div />) : null}
        </React.Fragment >
    );
}

export default MoreStats