import React from 'react'
import Emblem_Challenger from '../../../img/Emblem_Challenger.png';

const Queue = (props) => {
    console.log("here: " + JSON.stringify(props.data))
    
    return (
        <div>
            <h2>{props.data.queueType}</h2>
            <h2>{props.data.tier}</h2>
            <h4>LP: {props.data.leaguePoints}</h4>
            <img src={Emblem_Challenger} />
        </div>
    )
}
export default Queue
