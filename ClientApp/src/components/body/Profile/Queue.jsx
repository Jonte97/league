import React from 'react'
import Emblem_Challenger from '../../../img/icons/Emblem_Challenger.png';

const Queue = (props) => {

    return (
        <div className="queue-card">
            <h4 className="queue-title">{props.data.queueType}</h4>
            <h2 className="queue-tier">{props.data.tier} {props.data.rank}</h2>
            <h4 className="queue-wins">wins: {props.data.wins}</h4>
            <h4 className="queue-losses">Losses: {props.data.losses}</h4>
            <h4 className="queue-lp">LP: {props.data.leaguePoints}</h4>
            <img className="emblem" src={Emblem_Challenger} />
        </div>
    );
};
export default Queue;
