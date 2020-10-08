import React from 'react';

const Kda = (props) => {
    const csScore = props.stats.totalMinionsKilled + props.stats.neutralMinionsKilled;
    const csScorePerMin = csScore / (props.matchDuration / 60);
    const kda = (props.stats.kills + props.stats.assists) / props.stats.deaths;

    return (
        <div className="history-kda">
            <div>
                <img className="kda-img" title="kda" src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/score.png" />{props.stats.kills}/{props.stats.deaths}/{props.stats.assists}
            </div>
            <div>
                <img className="cs-img" title="cs" src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png" />{csScore} ({csScorePerMin.toFixed(1)})
            </div>
            <div className="kda cs-img">{kda.toFixed(2)} KDA</div>
        </div>
    );
}
export default Kda