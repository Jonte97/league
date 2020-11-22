import React, { useEffect, useState } from "react";
import { livegame, livegameUnranked } from "../../TestFiles/livegame";
import "../../StyleSheets/livegame.scss";
import TableRowLiveGame from "./TableRowLiveGame";
import { getChampionImageById } from "../../functions/ChampionHelper";
import { getSummonerSpell } from "../../functions/summonerSpellHelper";

const LiveGame = (props) => {
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

  return props.livegame ? (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="livegame-table">
            <React.Fragment>
              <table>
                <thead></thead>
                <tbody>
                  {props.livegame && props.gameReferences ? (
                    <React.Fragment>
                      {props.livegame.participants.map(
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
                {props.livegame.bannedChampions.map(
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
                {props.livegame.bannedChampions.map(
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
                {props.livegame.participants.map(
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
