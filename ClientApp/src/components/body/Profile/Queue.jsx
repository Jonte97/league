import React from 'react'
import Emblem_Challenger from '../../../img/icons/Emblem_Challenger.png';
import Emblem_Platinum from '../../../img/icons/Emblem_Platinum.png';
import Emblem_Bronze from '../../../img/icons/Emblem_Bronze.png';
import Emblem_Silver from '../../../img/icons/Emblem_Silver.png';
import Emblem_Gold from '../../../img/icons/Emblem_Gold.png';
import Emblem_Master from '../../../img/icons/Emblem_Master.png';
import Emblem_Grandmaster from '../../../img/icons/Emblem_Grandmaster.png';
import Emblem_Iron from '../../../img/icons/Emblem_Iron.png';
import Emblem_Diamond from '../../../img/icons/Emblem_Diamond.png';

const Queue = (props) => {
    
    let icon = "";

    switch (props.data.tier) {
        case "PLATINUM":
            icon = Emblem_Platinum;
            break;
        case "BRONZE" :
            icon = Emblem_Bronze; 
            break;
        case "IRON" :
                icon = Emblem_Iron; 
                break;
        case "SILVER" :
                icon = Emblem_Silver; 
                break;                
        case "GOLD" :
                icon = Emblem_Gold; 
                break;
        case "CHALLENGER" :
            icon = Emblem_Challenger; 
            break;
        case "MASTER" :
            icon = Emblem_Master; 
            break;
        case "GRANDMASTER" :
            icon = Emblem_Grandmaster; 
            break;
        case "DIAMOND" :
            icon = Emblem_Diamond; 
            break;
        default:
            break;
    }
    return (
        <div className="queue-card">
            <h4 className="queue-title">{props.data.queueType}</h4>
            <h2 className="queue-tier">{props.data.tier} {props.data.rank}</h2>
            <h4 className="queue-wins">wins: {props.data.wins}</h4>
            <h4 className="queue-losses">Losses: {props.data.losses}</h4>
            <h4 className="queue-lp">LP: {props.data.leaguePoints}</h4>
            <img className="emblem" src={icon} />
        </div>
    );
};
export default Queue;
