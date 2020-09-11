import React from 'react';
import { getMatchById, getMatchDataForSummoner } from '../../../functions/promiseHelper';
import { getSummonerSpell } from '../../../functions/summonerSpellHelper'
import { useState, useEffect } from 'react';
import './matchHistory.css';
import Items from './Items';
import Keystone from './Keystone';

const MatchItem = (props) => {

    const [matchInfo, setMatchInfo] = useState();
    //TODO Rename this hook
    const [gameInfo, setGameInfo] = useState();
    let thumbnails = {
        ownerChampion: "",
        summonerSpell1: "",
        summonerSpell2: ""
    }

    let summonerSpell1;
    let summonerSpell2;
    useEffect(() => {
        getMatchById(props.match.gameId, setMatchInfo);
        getMatchDataForSummoner(props.match.gameId, props.owner.name, setGameInfo);
    }, [props.match.gameId])

    if (gameInfo != null) {
        let key;
        if (props.championList != null) {
            key = props.championList.find((v) => v.k == gameInfo.championId)
            thumbnails.ownerChampion = `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/champion/${key.v.image.full}`

        }
        summonerSpell1 = getSummonerSpell(gameInfo.spell1Id, props.summonerSpells.data);
        summonerSpell2 = getSummonerSpell(gameInfo.spell2Id, props.summonerSpells.data);
    }

    summonerSpell1 ?
        thumbnails.summonerSpell1 = `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/spell/${summonerSpell1.id}.png`
        :
        null;
    summonerSpell2 ?
        thumbnails.summonerSpell2 = `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/spell/${summonerSpell2.id}.png`
        : null;
    //TODO Lägg till loadanimation
    return (
        matchInfo && gameInfo ?
            <div className="match-history-item">
                <div className="inline-flex">
                    <img className="history-thumbnail" src={thumbnails.ownerChampion} />
                <div className="history-summonerspells">
                    <div>
                        <img className="history-summonerspell" src={thumbnails.summonerSpell1} />
                    </div>
                    <div>
                        <img className="history-summonerspell" src={thumbnails.summonerSpell2} />
                    </div>
                    <Keystone />
                </div>
                </div>
                    <h4>{matchInfo.gameMode}</h4>
                    <Items stats={gameInfo} />
            </div> :
            <div>
                <h3>Loading game...</h3>
            </div>
    );
};

export default MatchItem;