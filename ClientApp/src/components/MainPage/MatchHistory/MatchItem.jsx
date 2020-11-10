import React from "react";
import {
  getMatchById,
  getMatchDataForSummoner,
} from "../../../functions/promiseHelper";
import { getSummonerSpell } from "../../../functions/summonerSpellHelper";
import { useState, useEffect } from "react";
import "./matchHistory.css";
import Items from "./Items";
import Keystone from "./Keystone";
import Kda from "./Kda";
import PlayerList from "./PlayerList";
import MoreStats from "./MoreStats";
import MatchItemHeader from "./MatchItemHeader";
import { getChampionImageById } from "../../../functions/ChampionHelper";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ownerWonGame = (teams, participantId, participants) => {
  let part = participants.find((obj) => {
    return obj.participantId === participantId;
  });

  if (part.teamId === 100) {
    if (teams[0].teamId === 100) {
      if (teams[0].win === "Win") {
        return true;
      } else {
        return false;
      }
    } else {
      if (teams[0].win === "Win") {
        return false;
      } else {
        return true;
      }
    }
  } else {
    if (teams[1].teamId === 200) {
      if (teams[1].win === "Win") {
        return true;
      } else {
        return false;
      }
    } else {
      if (teams[0].win === "Win") {
        return false;
      } else {
        return true;
      }
    }
  }
};

const MatchItem = (props) => {
  const [matchInfo, setMatchInfo] = useState();
  useEffect(() => {
    const fetcMatch = async () => {
      try {
        const match = await getMatchById(props.match.gameId);
        setMatchInfo(match);
      } catch (error) {
        console.log(error);
      }
    };
    fetcMatch();
  }, [props.owner]);

  const [summonerGameInfo, setGameInfo] = useState();
  useEffect(() => {
    const makeAsyncCall = async () => {
      const info = await getMatchDataForSummoner(
        props.match.gameId,
        props.owner.name
      );
      setGameInfo(info);
    };
    makeAsyncCall();
  }, [props.owner]);

  const [thumbnails, setThumbNails] = useState({
    ownerChampion: "",
    summonerSpell1: "",
    summonerSpell2: "",
  });
  useEffect(() => {
    const getSummonerSpell1 = () => {
      const summonerSpell1 = getSummonerSpell(
        summonerGameInfo.spell1Id,
        props.summonerSpells.data
      );
      const result = `https://ddragon.leagueoflegends.com/cdn/10.19.1/img/spell/${summonerSpell1.id}.png`;
      return result;
    };
    const getSummonerSpell2 = () => {
      const summonerSpell2 = getSummonerSpell(
        summonerGameInfo.spell2Id,
        props.summonerSpells.data
      );
      const result = `https://ddragon.leagueoflegends.com/cdn/10.19.1/img/spell/${summonerSpell2.id}.png`;
      return result;
    };
    const getChampionThumbnail = () => {
      const img = getChampionImageById(
        summonerGameInfo.championId,
        props.champions
      );
      const championThumbnail = `https://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/${img.full}`;
      return championThumbnail;
    };
    if (summonerGameInfo != null) {
      const spell1 = getSummonerSpell1();
      const spell2 = getSummonerSpell2();
      const championThumbnail = getChampionThumbnail();
      setThumbNails({
        ownerChampion: championThumbnail,
        summonerSpell1: spell1,
        summonerSpell2: spell2,
      });
    }
  }, [summonerGameInfo]);

  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    setShowMore(false);
  }, [props.owner]);

  const getPlayerList = (teamId) => {
    let list = [];
    list = matchInfo.participants.filter((obj) => obj.teamId === teamId);
    return list;
  };

  const getPlayerIdentities = (list) => {
    let identities = [];
    for (let index = 0; index < list.length; index++) {
      identities.push(
        matchInfo.participantIdentities.find(
          (obj) => obj.participantId === list[index].participantId
        )
      );
    }
    return identities;
  };
  const styleWinner = () => {
    if (
      ownerWonGame(
        matchInfo.teams,
        summonerGameInfo.participantId,
        matchInfo.participants
      )
    )
      return true;
    else return false;
  };
  const matchColor = { backgroundColor: "#222451" };
  return matchInfo && summonerGameInfo ? (
    <div>
      <div className="match-history-item" style={matchColor}>
        <MatchItemHeader matchInfo={matchInfo} status={styleWinner()} />
        <div className="match-history-item-wrapper">
          <div className="flex mb1 history-content-wrapper">
            <img className="history-thumbnail" src={thumbnails.ownerChampion} />
            <div className="history-summonerspells">
              <div>
                <img
                  className="history-summonerspell first"
                  src={thumbnails.summonerSpell1}
                />
              </div>
              <div>
                <img
                  className="history-summonerspell"
                  src={thumbnails.summonerSpell2}
                />
              </div>
            </div>
            <Keystone runes={props.runes} stats={summonerGameInfo.stats} />
            <div className="history-mid-text">
              <div className="history-mid-inner-text">
                <Kda
                  stats={summonerGameInfo.stats}
                  matchDuration={matchInfo.gameDuration}
                />
              </div>
            </div>
            <Items itemRefs={props.itemRefs} stats={summonerGameInfo} />
          </div>
          <div className="history-player-lists">
            <div className="history-list-blue">
              <PlayerList
                team="Blue team"
                ids={getPlayerList(100)}
                list={getPlayerIdentities(getPlayerList(100))}
                championList={props.champions}
              />
            </div>
            <div className="history-list-red">
              <PlayerList
                team="Red team"
                ids={getPlayerList(200)}
                list={getPlayerIdentities(getPlayerList(200))}
                championList={props.champions}
              />
            </div>
          </div>

          {/* <div className="box-1">
            <div
              onClick={() => {
                !showMore ? setShowMore(true) : setShowMore(false);
              }}
              className="btn btn-one"
            >
              <span>{!showMore ? "More stats" : "Hide more stats"}</span>
            </div>
          </div> */}

          <div>
            <div
              className="showmore"
              onClick={() => {
                !showMore ? setShowMore(true) : setShowMore(false);
              }}
            >
              <span>
                {!showMore ? (
                  <IoIosArrowDown size="2em" />
                ) : (
                  <IoIosArrowUp size="2em" />
                )}
              </span>
            </div>
          </div>
        </div>
        {showMore ? (
          <MoreStats
            championList={props.champions}
            participantList={matchInfo.participants}
            gameId={props.match.gameId}
            participant={summonerGameInfo.participantId}
            runes={props.runes}
            stats={summonerGameInfo.stats}
            owner={summonerGameInfo.participantId}
            champion={props.match.champion}
            summonerSpells={props.summonerSpells.data}
            identities={matchInfo.participantIdentities}
            matchDuration={matchInfo.gameDuration}
            queue={props.match.queue}
          />
        ) : null}
      </div>
    </div>
  ) : (
    <div>
      <h3>Loading game...</h3>
    </div>
  );
};

export default MatchItem;
