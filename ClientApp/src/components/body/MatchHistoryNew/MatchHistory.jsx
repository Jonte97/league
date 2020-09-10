import React from 'react';
import { getMatchHistory, getChampionList, getSummonerSpellData } from '../../../functions/promiseHelper';
import { useState, useEffect } from 'react';
import MatchItem, { matchItem } from './MatchItem';

const MatchHistory = (props) => {
    const [matchHistory, setMatchHistory] = useState();
    const [championList, setChampionList] = useState();
    const [summonerSpells, setSummonerSpells] = useState();
    //! Hardcoded accid must be replaced    
    let accid = "";
    if (props.activeSummoner.name == "Lönnen") {
        accid = "ozMoiB-Krv93WBb4oX1nXjgKAif4kvcA1BolzEzjf_Bc4xQ"
    }
    else {
        accid = props.activeSummoner.accountId;
    }

    useEffect(() => {
        getChampionList(setChampionList);
        getSummonerSpellData(setSummonerSpells);
    }, []);

    //Hämtar matchHistory och uppdaterar state
    useEffect(() => {
        let matches = getMatchHistory(accid, setMatchHistory);
    }, [props.activeSummoner]);

    return (
        <div className="theme-bg">
            <div className="container">
                {matchHistory ? matchHistory.matches.map((match, i) => (
                    <div className="history-item">
                        <MatchItem
                            key={i}
                            championList={championList}
                            match={match}
                            owner={props.activeSummoner}
                            summonerSpells={summonerSpells}
                        />
                    </div>
                )) : null}
            </div>
        </div>
    )
};

export default MatchHistory;