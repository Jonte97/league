import React from 'react';

const Kda = (props) => {
    let csScore = props.stats.totalMinionsKilled + props.stats.neutralMinionsKilled;
    let csScorePerMin = csScore / (props.matchDuration / 60);
console.log(csScorePerMin)
    return (
        <div className="history-kda">
            <h4><img className="kda-img" title="kda" src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/score.png" />{props.stats.kills}/{props.stats.deaths}/{props.stats.assists}</h4>
            
            <h4><img className="cs-img" title="cs" src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png" />{csScore} ({csScorePerMin.toFixed(1)})</h4>
        </div>
    );
}
export default Kda