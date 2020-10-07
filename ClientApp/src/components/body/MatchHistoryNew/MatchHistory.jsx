import React from 'react';
import { getMatchHistory, getChampionList, getSummonerSpellData, getRunesData, getItemListAsync } from '../../../functions/promiseHelper';
import { useState, useEffect, useRef } from 'react';
import MatchItem from './MatchItem';
import Loader from '../loader';

const MatchHistory = (props) => {
    const [gameReferences, setGameReferences] = useState();
    useEffect(() => {
        const getReferencesAsync = async () => {
            const parseItemsToArray = input => {
                const itemArray = [];
                for (const [key, value] of Object.entries(input)) {
                    const obj = { id: key, data: value }
                    itemArray.push(obj);
                }

                return itemArray;
            }

            const champList = await getChampionList();
            const spellData = await getSummonerSpellData();
            const runesData = await getRunesData();
            const itemsPrimitive = await getItemListAsync();

            const items = parseItemsToArray(itemsPrimitive.data)
            setGameReferences({ championList: champList, summonerSpells: spellData, runesData: runesData, items: items });
        }
        getReferencesAsync();
    }, []);

    const [matchHistory, setMatchHistory] = useState({ matches: [] });
    useEffect(() => {
        const getMatches = async () => {
            const matches = await getMatchHistory(props.activeSummoner.accountId)
            setMatchHistory(matches);
        }
        getMatches();
    }, [props.activeSummoner]);

    console.log('render history')

    return (
        <div className="theme-bg">
            <div className="container">

                {gameReferences ? matchHistory.matches.map((match, i) => (
                    <div key={i} className="history-item">
                        <MatchItem
                            key={i}
                            championList={gameReferences.championList}
                            match={match}
                            owner={props.activeSummoner}
                            summonerSpells={gameReferences.summonerSpells}
                            runes={gameReferences.runesData}
                            itemRefs={gameReferences.items}
                        />
                    </div>
                ))
                    :
                    <Loader
                        className={"loader-matchHistory"}
                    />
                }
            </div>
        </div>
    )
};

export default MatchHistory;