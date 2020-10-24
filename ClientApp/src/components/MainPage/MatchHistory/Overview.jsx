import React, { useEffect, useState } from "react";
import {
  championDictionary,
  getChampionImageById,
  getChampionNameById,
} from "../../../functions/ChampionHelper";
import { getLeagueEntries } from "../../../functions/promiseHelper";
import { getSummonerSpell } from "../../../functions/summonerSpellHelper";
import { patch } from "../../../TestFiles/Configuration";
import Loader from "../loader";
import OverviewItems from "./OverviewItems";

import Emblem_Iron from "../../../img/icons/Emblem_Iron.png";
import Emblem_Bronze from "../../../img/icons/Emblem_Bronze.png";
import Emblem_Silver from "../../../img/icons/Emblem_Silver.png";
import Emblem_Gold from "../../../img/icons/Emblem_Gold.png";
import Emblem_Platinum from "../../../img/icons/Emblem_Platinum.png";
import Emblem_Diamond from "../../../img/icons/Emblem_Diamond.png";
import Emblem_Master from "../../../img/icons/Emblem_Master.png";
import Emblem_Grandmaster from "../../../img/icons/Emblem_Grandmaster.png";
import Emblem_Challenger from "../../../img/icons/Emblem_Challenger.png";

import { getEmblem } from "../../../functions/RankedEmblemHelper";

const Overview = (props) => {
  const [players, setPlayers] = useState(null);
  const champList = championDictionary();
  useEffect(() => {
    setPlayers(props.participantList);
  }, [props.participantList]);

  const [teams, setTeams] = useState(null);
  useEffect(() => {
    const redTeam = [];
    const blueTeam = [];
    const missingIdsRed = [];
    const missingIdsBlue = [];

    const getRoles = (arr, team, missing) => {
      if (players != null) {
        const top = players.find((obj) => {
          return obj.teamId === team && obj.timeline.lane === "TOP";
        });
        if (top != undefined) {
          arr.push(top);
        }
        const jungle = players.find((obj) => {
          return obj.teamId === team && obj.timeline.lane === "JUNGLE";
        });
        if (jungle != undefined) {
          arr.push(jungle);
        }
        const mid = players.find((obj) => {
          return obj.teamId === team && obj.timeline.lane === "MIDDLE";
        });
        if (mid != undefined) {
          arr.push(mid);
        }
        const adc = players.find((obj) => {
          return (
            obj.teamId === team &&
            obj.timeline.lane === "BOTTOM" &&
            obj.timeline.role === "DUO_CARRY"
          );
        });
        if (adc != undefined) {
          arr.push(adc);
        }
        const supp = players.find((obj) => {
          return (
            obj.teamId === team &&
            obj.timeline.lane === "BOTTOM" &&
            obj.timeline.role === "DUO_SUPPORT"
          );
        });
        if (supp != undefined) {
          arr.push(supp);
        }

        if (team === 100) {
          for (let i = 1; i < 6; i++) {
            const exist = arr.find((obj) => {
              return obj.participantId === i;
            });
            if (exist == undefined) {
              missing.push(i);
            }
          }
        } else {
          for (let i = 6; i < 11; i++) {
            const exist = arr.find((obj) => {
              return obj.participantId === i;
            });
            if (exist == undefined) {
              missing.push(i);
            }
          }
        }
      }
    };
    const addMissingPlayers = (missing, arr) => {
      missing.forEach((playerId) => {
        const missingPlayer = players.find((obj) => {
          return obj.participantId === playerId;
        });
        arr.push(missingPlayer);
      });
    };
    const fillTeams = async (team) => {
      team.forEach((player) => {
        //* Gets champion data
        player.champion = { name: "", url: "" };
        player.champion.url = getChampionImageById(
          player.championId,
          champList
        );
        player.champion.name = getChampionNameById(
          player.championId,
          champList
        );

        //* Gets summonerSpells
        player.summonerSpells = { spell1: "", spell2: "" };
        player.summonerSpells.spell1 = getSummonerSpell(
          player.spell1Id,
          props.summonerSpells
        );
        player.summonerSpells.spell2 = getSummonerSpell(
          player.spell2Id,
          props.summonerSpells
        );

        //*Gets player ranks
        player.ranked = {
          solo: { rank: "", tier: "", img: "" },
          flex: { rank: "", tier: "" },
        };

        //*Kda and cs
        player.csScore =
          player.stats.totalMinionsKilled + player.stats.neutralMinionsKilled;
        player.csPerMin = player.csScore / (props.matchDuration / 60);
        player.kda =
          (player.stats.kills + player.stats.assists) / player.stats.deaths;
      });

      //* Gets ranks
      for (let i = 0; i < team.length; i++) {
        const playerIdentity = props.identities.find((obj) => {
          return obj.participantId === team[i].participantId;
        });
        team[i].identity = playerIdentity.player;
        const entry = await getLeagueEntries(team[i].identity.summonerId);
        const solo = entry.find((obj) => obj.queueType === "RANKED_SOLO_5x5");
        if (solo != undefined) {
          team[i].ranked.solo.img = getEmblem(solo.tier);
          team[i].ranked.solo.rank = solo.rank;
          team[i].ranked.solo.tier = solo.tier;
        } else {
          team[i].ranked.solo.img = getEmblem("unranked");
          team[i].ranked.solo.rank = "";
          team[i].ranked.solo.tier = "Unranked";
        }

        // console.log(team[i]);
        console.log(entry);
      }
    };
    const setup = async () => {
      getRoles(redTeam, 200, missingIdsRed);
      getRoles(blueTeam, 100, missingIdsBlue);

      addMissingPlayers(missingIdsBlue, blueTeam);
      addMissingPlayers(missingIdsRed, redTeam);

      await fillTeams(blueTeam);
      await fillTeams(redTeam);
      setTeams({ blueTeam: blueTeam, redTeam: redTeam });
    };

    if (players != null) {
      setup();
    }
  }, [players]);

  return (
    <div className="overview-wrapper">
      {teams ? (
        <table className="overview-table">
          <thead>
            <tr>
              <th colSpan="3">Blue team</th>
              <th colSpan="1">Solo tier</th>
              <th colSpan="1">
                <img
                  alt="kda"
                  className="kda-img"
                  title="kda"
                  src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/score.png"
                />
              </th>
              <th colSpan="1">
                <img
                  alt="cs"
                  className="cs-img"
                  title="cs"
                  src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
                />
              </th>
              <th colSpan="1">Vision</th>

              <th colSpan="1">
                <img
                  alt="items"
                  className="items-img"
                  title="items"
                  src="http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/items.png"
                />
              </th>
            </tr>
          </thead>
          {teams.blueTeam.map((player, key) => (
            <tbody>
              <tr key={key}>
                <td className="overview-thumbnail-cell">
                  <div>
                    <img
                      className="overview-thumbnail"
                      alt="champImage"
                      title={player.champion.url.full}
                      src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${player.champion.url.full}`}
                    />
                  </div>
                </td>
                <td className="overview-summonerSpells-thumbnail">
                  <div>
                    <img
                      alt="Summonerspell 1"
                      title={player.summonerSpells.spell1.name}
                      src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${player.summonerSpells.spell1.id}.png`}
                    />
                    <img
                      alt="summonerspell 2"
                      title={player.summonerSpells.spell2.name}
                      src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${player.summonerSpells.spell2.id}.png`}
                    />
                  </div>
                </td>
                <td>{player.identity.summonerName}</td>
                <td>
                  <div>
                    {/* //TODO see if can change these emblems to more readable when small size  */}
                    <img
                      className="overview-emblem"
                      src={player.ranked.solo.img}
                      alt="ranked-emblem"
                      title={
                        player.ranked.solo.tier + " " + player.ranked.solo.rank
                      }
                    />
                  </div>
                </td>
                <td>
                  <div className="overview-kda">{`${player.kda.toFixed(
                    2
                  )} Kda`}</div>
                  <div>
                    {`${player.stats.kills} / ${player.stats.deaths} / ${player.stats.assists}`}
                  </div>
                </td>
                <td>
                  {player.stats.neutralMinionsKilled +
                    player.stats.totalMinionsKilled}
                  {" (" + player.csPerMin.toFixed(1) + ")"}
                </td>
                <td>{player.stats.visionScore}</td>
                <td>
                  <OverviewItems stats={player.stats} />
                </td>
              </tr>
            </tbody>
          ))}
          <thead>
            <tr>
              <th colSpan="3">Red team</th>
              <th colSpan="1">Solo tier</th>
            </tr>
          </thead>
          {teams.redTeam.map((player, key) => (
            <tbody>
              <tr key={key}>
                <td className="overview-thumbnail-cell">
                  <div>
                    <img
                      className="overview-thumbnail"
                      alt="champImage"
                      title={player.champion.url.full}
                      src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${player.champion.url.full}`}
                    />
                  </div>
                </td>
                <td className="overview-summonerSpells-thumbnail">
                  <div>
                    <img
                      alt="Summonerspell 1"
                      title={player.summonerSpells.spell1.name}
                      src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${player.summonerSpells.spell1.id}.png`}
                    />
                    <img
                      alt="summonerspell 2"
                      title={player.summonerSpells.spell2.name}
                      src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${player.summonerSpells.spell2.id}.png`}
                    />
                  </div>
                </td>
                <td>{player.identity.summonerName}</td>
                <td>
                  <div>
                    {/* //TODO see if can change these emblems to more readable when small size  */}
                    <img
                      className="overview-emblem"
                      src={player.ranked.solo.img}
                      alt="ranked-emblem"
                      title={
                        player.ranked.solo.tier + " " + player.ranked.solo.rank
                      }
                    />
                  </div>
                </td>
                <td>
                  <div className="overview-kda">{`${player.kda.toFixed(
                    2
                  )} Kda`}</div>
                  <div>
                    {`${player.stats.kills} / ${player.stats.deaths} / ${player.stats.assists}`}
                  </div>
                </td>
                <td>
                  {player.stats.neutralMinionsKilled +
                    player.stats.totalMinionsKilled}
                  {"(" + player.csPerMin.toFixed(1) + ")"}
                </td>
                <td>{player.stats.visionScore}</td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <Loader className={"loader-matchHistory"} />
      )}
    </div>
  );
};
export default Overview;
