import React from 'react'

const Queue = (props) => {
    return (
        <div>
            <h2>{props.data.queueType}</h2>
            <p>LP: {props.data.lp}</p>
            <img />
        </div>
    )
}

export default Queue
