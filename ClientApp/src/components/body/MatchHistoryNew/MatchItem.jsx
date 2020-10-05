import React from 'react';
import { getMatchById, getMatchDataForSummoner } from '../../../functions/promiseHelper';
import { getSummonerSpell } from '../../../functions/summonerSpellHelper'
import { useState, useEffect } from 'react';
import './matchHistory.css';
import Items from './Items';
import Keystone from './Keystone';
import Kda from './Kda';
import PlayerList from './PlayerList'
import MoreStats from './MoreStats';

const ownerWonGame = (teams, owner, participants) => {

    if (owner != null) {
        let part = participants.find((obj) => { return obj.participantId === owner.participantId })

        if (part.teamId === 100) {
            if (teams[0].teamId === 100) {
                if (teams[0].win === "Win") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if (teams[0].win === "Win") {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        else {
            if (teams[1].teamId === 200) {
                if (teams[1].win === "Win") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if (teams[0].win === "Win") {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    }
}

const MatchItem = (props) => {

    const [matchInfo, setMatchInfo] = useState();
    //TODO Rename this hook
    const [gameInfo, setGameInfo] = useState();

    let thumbnails = {
        ownerChampion: "",
        summonerSpell1: "",
        summonerSpell2: ""
    }
    console.log("rendering")
    let summonerSpell1;
    let summonerSpell2;
    useEffect(() => {
        getMatchById(props.match.gameId, setMatchInfo);
        getMatchDataForSummoner(props.match.gameId, props.owner.name, setGameInfo);
        
    }, [props.match.gameId])
    
    
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
    const styleWinner = () => {
            const winner = {
                backgroundColor: "#222451"
            }
            return winner
    }

    if (gameInfo != null) {
        let key;
        if (props.championList != null) {
            key = props.championList.find((v) => v.k == gameInfo.championId)
            thumbnails.ownerChampion = `https://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/${key.v.image.full}`

        }
        summonerSpell1 = getSummonerSpell(gameInfo.spell1Id, props.summonerSpells.data);
        summonerSpell2 = getSummonerSpell(gameInfo.spell2Id, props.summonerSpells.data);
    }

    summonerSpell1 ?
        thumbnails.summonerSpell1 = `https://ddragon.leagueoflegends.com/cdn/10.19.1/img/spell/${summonerSpell1.id}.png`
        :
        null;
    summonerSpell2 ?
        thumbnails.summonerSpell2 = `https://ddragon.leagueoflegends.com/cdn/10.19.1/img/spell/${summonerSpell2.id}.png`
        : null;
    return (
        matchInfo && gameInfo ?
            <div className="match-history-item" style={styleWinner()}>
                <div className="match-history-top">
                    <div className="match-hisrotry-top-gamemode">{matchInfo.gameMode}</div>
                </div>
                <div className="match-history-item-wrapper">

                    <div className="flex mb1 history-content-wrapper">
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
                                <Kda stats={gameInfo.stats} matchDuration={matchInfo.gameDuration} />
                            </div>
                        </div>
                        <Items stats={gameInfo} />
                    </div>
                    <div className="history-player-lists">
                        <div className="history-list-blue">
                            <PlayerList team="Blue team" ids={getPlayerList(100)} list={getPlayerIdentities(getPlayerList(100))} championList={props.championList} />
                        </div>
                        <div className="history-list-red">
                            <PlayerList team="Red team" ids={getPlayerList(200)} list={getPlayerIdentities(getPlayerList(200))} championList={props.championList} />
                        </div>
                    </div>
                    <MoreStats
                        championList={props.championList}
                        participantList={matchInfo.participants}
                        gameId={props.match.gameId}
                        participant={gameInfo.participantId}
                        runes={props.runes}
                        stats={gameInfo.stats}
                        owner={gameInfo.participantId}
                    />
                </div>
            </div> :
            <div>
                <h3>Loading game...</h3>
            </div>
    );
};

export default MatchItem;