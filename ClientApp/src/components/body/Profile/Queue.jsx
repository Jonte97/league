import React from 'react'
import Emblem_Iron from '../../../img/icons/Emblem_Iron.png';
import Emblem_Bronze from '../../../img/icons/Emblem_Bronze.png';
import Emblem_Silver from '../../../img/icons/Emblem_Silver.png';
import Emblem_Gold from '../../../img/icons/Emblem_Gold.png';
import Emblem_Platinum from '../../../img/icons/Emblem_Platinum.png';
import Emblem_Diamond from '../../../img/icons/Emblem_Diamond.png';
import Emblem_Master from '../../../img/icons/Emblem_Master.png';
import Emblem_Grandmaster from '../../../img/icons/Emblem_Grandmaster.png';
import Emblem_Challenger from '../../../img/icons/Emblem_Challenger.png';

const Queue = (props) => {
    
    var emblem = props.data.tier;

    //* Handles displayed rank icon in ranked queue cards
    switch (emblem) {
        case "IRON":
            emblem = Emblem_Iron
            break;
        case "BRONZE":
            emblem = Emblem_Bronze
            break;
        case "SILVER":
            emblem = Emblem_Silver
            break;
        case "GOLD":
            emblem = Emblem_Gold
            break;
        case "PLATINUM":
            emblem = Emblem_Platinum
            break;
        case "DIAMOND":
            emblem = Emblem_Diamond
            break;
        case "MASTER":
            emblem = Emblem_Master
            break;
        case "GRANDMASTER":
            emblem = Emblem_Grandmaster
            break;
        case "CHALLENGER":
            emblem = Emblem_Challenger
            break;
        default:
            break;
    }

    //* Writing queue cards
    return (
        <div className="queue-card">
            <h4 className="queue-title">{props.data.queueType}</h4>
            <h2 className="queue-tier">{props.data.tier} {props.data.rank}</h2>
            <h4 className="queue-wins">wins: {props.data.wins}</h4>
            <h4 className="queue-losses">Losses: {props.data.losses}</h4>
            <h4 className="queue-lp">LP: {props.data.leaguePoints}</h4>
            <img className="emblem" src={emblem} />
        </div>
    );
};
export default Queue;
