import React from 'react';
import { getMatchById, getMatchDataForSummoner } from '../../../functions/promiseHelper';
import { useState, useEffect } from 'react';
import './matchHistory.css'

const MatchItem = (props) => {

    const [matchInfo, setMatchInfo] = useState();
    //TODO Rename this hook
    const [gameInfo, setGameInfo] = useState();
    let thumbnail = "";

    useEffect(() => {
        getMatchById(props.match.gameId, setMatchInfo);
        getMatchDataForSummoner(props.match.gameId, props.owner.name, setGameInfo);
    }, [props.match.gameId])

    if (gameInfo != null) {
        let key = props.championList.find((v) => v.k == gameInfo.championId);
        thumbnail = `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${key.v.image.full}`;
    }

    return (
        matchInfo ? 
        <div className="match-history-item">
            <div className="inline-block">
                <img className="history-thumbnail" src={thumbnail} />
                <h4>{matchInfo.gameMode}</h4>
            </div>
        </div> :
        <div>
            <h3>Loading match...</h3>
        </div>
    );
};

export default MatchItem;