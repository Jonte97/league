import React from 'react';

const Kda = (props) => {
    let csScore = props.stats.totalMinionsKilled + props.stats.neutralMinionsKilled;
    let csScorePerMin = csScore / (props.matchDuration / 60);
console.log(csScorePerMin)
    return (
        <div className="history-kda">
            <h2>{props.stats.kills}/{props.stats.deaths}/{props.stats.assists}</h2>
            <h4>{csScore} ({csScorePerMin.toFixed(1)})</h4>
        </div>
    );
}
export default Kda