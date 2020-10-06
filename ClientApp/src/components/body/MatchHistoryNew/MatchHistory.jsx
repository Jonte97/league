import React from 'react';
import { getMatchHistory, getChampionList, getSummonerSpellData, getRunesData } from '../../../functions/promiseHelper';
import { useState, useEffect, useRef } from 'react';
import MatchItem from './MatchItem';

const MatchHistory = (props) => {
    const [matchHistory, setMatchHistory] = useState({ matches: [] });
    useEffect(() => {
        const getMatches = async () => {
            const matches = await getMatchHistory(props.activeSummoner.accountId)
            setMatchHistory(matches);
        }
        getMatches();
    }, [props.activeSummoner]);

    const [championList, setChampionList] = useState();
    useEffect(() => {
        const getChampionListAsync = async () => {
            const champList = await getChampionList()
            setChampionList(champList);
        }
        getChampionListAsync();
    }, []);

    const [summonerSpells, setSummonerSpells] = useState();
    useEffect(() => {
        const getSummonerSpellAsync = async () => {
            const spellData = await getSummonerSpellData()
            setSummonerSpells(spellData);
        }
        getSummonerSpellAsync();
    }, []);
    const [runesData, setRunesData] = useState();
    useEffect(() => {
        const getRunesAsync = async () => {
            const runesData = await getRunesData()
            setRunesData(runesData);
        }
        getRunesAsync();
    }, []);

    console.log('rendering history')

    return (
        <div className="theme-bg">
            <div className="container">
                {matchHistory.matches.map((match, i) => (
                    <div key={i} className="history-item">
                        <MatchItem
                            key={i}
                            championList={championList}
                            match={match}
                            owner={props.activeSummoner}
                            summonerSpells={summonerSpells}
                            runes={runesData}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default MatchHistory;