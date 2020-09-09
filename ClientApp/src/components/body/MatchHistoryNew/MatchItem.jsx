import React from 'react';
import {getMatchById} from '../../../functions/promiseHelper';
import {useState, useEffect} from 'react';

const MatchItem = (props) => {

    const [MatchInfo, setMatchInfo] = useState();
    useEffect(() => {
        getMatchById(props.match.gameId, setMatchInfo);
    }, [props.match.gameId])

    return (
        <React.Fragment>

        </React.Fragment>
    );
};

export default MatchItem;