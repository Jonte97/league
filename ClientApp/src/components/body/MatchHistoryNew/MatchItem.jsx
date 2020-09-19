import React from 'react';
import { getMatchById, getMatchDataForSummoner } from '../../../functions/promiseHelper';
import { getSummonerSpell } from '../../../functions/summonerSpellHelper'
import { useState, useEffect } from 'react';
import './matchHistory.css';
import Items from './Items';
import Keystone from './Keystone';
import Kda from './Kda';
import PlayerList from './PlayerList'
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

    const getPlayerList = (teamId) => {
        let list = [];
        list = matchInfo.participants.filter((obj) => obj.teamId === teamId);

        return list;
    };

    const getPlayerIdentities = (list) => {

        let identities = [];

        for (let index = 0; index < list.length; index++) {
            identities.push(matchInfo.participantIdentities.find(
                (obj) => obj.participantId === list[index].participantId
            ))
        }
        return identities
    };

    return (
        matchInfo && gameInfo ?
            <div className="match-history-item">
                <div className="flex mb1">
                    <img className="history-thumbnail" src={thumbnails.ownerChampion} />
                    <div className="history-summonerspells">
                        <div>
                            <img className="history-summonerspell first" src={thumbnails.summonerSpell1} />
                        </div>
                        <div>
                            <img className="history-summonerspell" src={thumbnails.summonerSpell2} />
                        </div>
                    </div>
                    <Keystone runes={props.runes} stats={gameInfo.stats} />
                    <div className="history-mid-text">
                        <div className="history-mid-inner-text">
                            <h4>{matchInfo.gameMode}</h4>
                            <Kda stats={gameInfo.stats} matchDuration={matchInfo.gameDuration} />
                        </div>
                    </div>
                </div>
                <div className="history-player-lists">
                    <div className="history-list-blue">
                        <PlayerList ids={getPlayerList(100)} list={getPlayerIdentities(getPlayerList(100))} championList={props.championList} />
                    </div>
                    <div className="history-list-red">
                        <PlayerList ids={getPlayerList(200)} list={getPlayerIdentities(getPlayerList(200))} championList={props.championList} />
                    </div>
                </div>
                <Items stats={gameInfo} />
            </div> :
            <div>
                <h3>Loading game...</h3>
            </div>
    );
};

export default MatchItem;