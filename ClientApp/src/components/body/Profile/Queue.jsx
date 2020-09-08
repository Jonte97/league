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
    var queueType = "";
    var winrate = (props.data.wins / (props.data.wins + props.data.losses) * 100).toFixed(0);

    //TODO kanske skriva ut namnet på ligan?
    switch (props.data.queueType) {
        case "RANKED_SOLO_5x5":
            queueType = "Ranked solo";
            break;
        case "RANKED_FLEX_SR":
            queueType = "Ranked flex"
            break;
        default:
            queueType = "Unknown"
            break;
    }

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

    //* To set border on the left queue card
    let id = "right";
    if(props.id == 0){
        id="left";
    }
    //TODO fix so solo queue is always left
    //* Writing queue cards
    return (
        <div className="queue-card" id={id}>
            <div className="queue-content-holder">
                <img className="emblem" src={emblem} />
                <div className="queue-h4-container">
                    <h2 className="queue-tier">{props.data.tier} {props.data.rank}</h2>
                    <br />
                    <h4 className="queue-title">{queueType}</h4>
                    <br />
                    <h4 className="queue-wins">{props.data.leaguePoints} lp {props.data.wins}w {props.data.losses}L</h4>
                    <br />
                    <h4 className="queue-winrate">Win ratio: {winrate}%</h4>
                </div>
            </div>
        </div>
    );
};
export default Queue;
