import React, { useEffect, useState } from "react";
import { livegame, livegameUnranked } from "../../TestFiles/livegame";
import "../../StyleSheets/livegame.scss";
import TableRowLiveGame from "./TableRowLiveGame";
import { getChampionImageById } from "../../functions/ChampionHelper";
import { getSummonerSpell } from "../../functions/summonerSpellHelper";
import { getLiveGame } from "../../functions/promiseHelper";

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
      const game = livegameUnranked;
      setLiveGame(game);
    };
    if (summoner != null) setup();
  }, [summoner]);

  const getChampionThumbNail = (id) => {
    try {
      if (props.gameReferences != null) {
        const result = getChampionImageById(
          id,
          props.gameReferences.championList
        );
        return `https://ddragon.leagueoflegends.com/cdn/${props.ddragon.version}/img/champion/${result.full}`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSummoners = (id) => {
    const spell = getSummonerSpell(
      id,
      props.gameReferences.summonerSpells.data
    );
    return spell;
  };

  return liveGame ? (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="livegame-table">
            <React.Fragment>
              <table>
                <thead></thead>
                <tbody>
                  {liveGame && props.gameReferences ? (
                    <React.Fragment>
                      {liveGame.participants.map(
                        (player, key) =>
                          player.teamId == 100 && (
                            <TableRowLiveGame
                              key={key}
                              runesRefs={props.gameReferences.runesData}
                              spell1={getSummoners(player.spell1Id)}
                              spell2={getSummoners(player.spell2Id)}
                              version={props.ddragon.version}
                              champThumbnail={getChampionThumbNail(
                                player.championId
                              )}
                              player={player}
                            />
                          )
                      )}
                    </React.Fragment>
                  ) : null}
                </tbody>
              </table>
            </React.Fragment>
            <div className="banned-champions-wrapper">
              <div className="banned-champions-blue-wrapper">
                {liveGame.bannedChampions.map(
                  (champ, key) =>
                    champ.teamId == 100 && (
                      <div key={key} className="banned-champion-blue">
                        <img
                          src={getChampionThumbNail(champ.championId)}
                          alt=""
                          className="banned-champion"
                        />
                      </div>
                    )
                )}
              </div>
              <div className="banned-champions-red-wrapper">
                {liveGame.bannedChampions.map(
                  (champ, key) =>
                    champ.teamId == 200 && (
                      <div key={key} className="banned-champion-blue">
                        <img
                          src={getChampionThumbNail(champ.championId)}
                          alt=""
                          className="banned-champion"
                        />
                      </div>
                    )
                )}
              </div>
            </div>
            <table>
              <tbody>
                {liveGame.participants.map(
                  (player, key) =>
                    player.teamId == 200 && (
                      <TableRowLiveGame
                        key={key}
                        runesRefs={props.gameReferences.runesData}
                        spell1={getSummoners(player.spell1Id)}
                        spell2={getSummoners(player.spell2Id)}
                        version={props.ddragon.version}
                        champThumbnail={getChampionThumbNail(player.championId)}
                        player={player}
                      />
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default LiveGame;
