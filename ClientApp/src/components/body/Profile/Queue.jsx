import React from 'react'

const Queue = (props) => {
    console.log("here: " + JSON.stringify(props.data))
    return (
        <div>
            <h2>{props.data.queueType}</h2>
            <h2>{props.data.tier}</h2>
            <h4>LP: {props.data.leaguePoints}</h4>
            <img />
        </div>
    )
}
export default Queue
