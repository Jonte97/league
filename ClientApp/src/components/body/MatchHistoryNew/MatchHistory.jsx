import React from 'react';
import { getMatchHistory } from '../../../functions/promiseHelper';
import { useState, useEffect } from 'react';
import MatchItem, { matchItem } from './MatchItem';

const MatchHistory = (props) => {
    let matches = [];
    const [matchHistory, setMatchHistory] = useState();
    //! Hardcoded accid must be replaced    
    let accid = "";
    if (props.activeSummoner.name == "Lönnen") {
        accid = "ozMoiB-Krv93WBb4oX1nXjgKAif4kvcA1BolzEzjf_Bc4xQ"
    }
    else {
        accid = props.activeSummoner.accountId;
    }

    //Hämtar matchHistory och uppdaterar state
    useEffect(() => {
        let matches = getMatchHistory(accid, setMatchHistory);
        console.log(matches);
    }, [props.activeSummoner]);

    return (
        <div className="theme-bg">
            <div className="container">
                {matchHistory ? matchHistory.matches.map((match, i) => (
                    <MatchItem key={i} match={match} />
                )) : null}
            </div>
        </div>
    )
};

export default MatchHistory;