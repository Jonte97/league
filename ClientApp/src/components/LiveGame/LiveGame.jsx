import React, { useEffect, useState } from "react";
import {
  getLiveGame,
  getSummonerByNameAsync,
} from "../../functions/promiseHelper";
import { livegame } from "../../TestFiles/livegame";
import "../../StyleSheets/livegame.scss";
import TableRowLiveGame from "./TableRowLiveGame";
import { getChampionImageById } from "../../functions/ChampionHelper";
import { getSummonerSpell } from "../../functions/summonerSpellHelper";

const LiveGame = (props) => {
  const [summoner, setSummoner] = useState(null);
  useEffect(() => {
    const setup = async () => {
      setSummoner(props.summoner);
    };
    setup();
  }, [props.summoner]);

  const [liveGame, setLiveGame] = useState(null);
  useEffect(() => {
    const setup = async () => {
      //const game = await getLiveGame(summoner.id);
      //!For testing only should fetch by above
      const game = livegame;
      setLiveGame(game);
    };
    if (summoner != null) setup();
  }, [summoner]);

  const getChampionThumbNail = (id) => {
    try {
      const result = getChampionImageById(
        id,
        props.gameReferences.championList
      );
      return `https://ddragon.leagueoflegends.com/cdn/${props.ddragon.version}/img/champion/${result.full}`;
    } catch (error) {
      console.log(error);
    }
  };
  const getSummoners = (id) => {
    console.log(id)
    const spell = getSummonerSpell(id, props.gameReferences.summonerSpells.data);
    return spell;
  };
  return (
    <div className="container">
      <div className="wrapper">
        <div className="livegame-table">
          <table>
            <thead>
              <tr>
                <th>Blue Team</th>
              </tr>
              <tr>
                <th>champ</th>
                <th>summoners</th>
                <th>runes</th>
                <th>name</th>
                <th>rank</th>
              </tr>
            </thead>
            <tbody>
              {liveGame ? (
                <React.Fragment>
                  {liveGame.participants.map(
                    (player, key) =>
                      player.teamId == 100 && (
                        <tr key={key}>
                          <TableRowLiveGame
                            spell1={getSummoners(player.spell1Id)}
                            spell2={getSummoners(player.spell2Id)}
                            version={props.ddragon.version}
                            champThumbnail={getChampionThumbNail(
                              player.championId
                            )}
                            player={player}
                          />
                        </tr>
                      )
                  )}
                  <tr>
                    <th>Red team</th>
                  </tr>
                  {liveGame.participants.map(
                    (player, key) =>
                      player.teamId == 200 && (
                        <tr key={key}>
                          {/* <TableRowLiveGame
                            version={props.ddragon.version}
                            champThumbnail={getChampionThumbNail(
                              player.championId
                            )}
                            player={player}
                          /> */}
                        </tr>
                      )
                  )}
                </React.Fragment>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveGame;
