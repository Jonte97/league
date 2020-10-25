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
import Damage from "./Damage";
import OverviewTableRow from "./OverviewTableRow";
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
  const dmg = [];
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

        dmg.push(player.stats.totalDamageDealtToChampions);
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
      }
    };
    const setup = async () => {
      getRoles(redTeam, 200, missingIdsRed);
      getRoles(blueTeam, 100, missingIdsBlue);

      addMissingPlayers(missingIdsBlue, blueTeam);
      addMissingPlayers(missingIdsRed, redTeam);

      await fillTeams(blueTeam);
      await fillTeams(redTeam);
      setTeams({
        blueTeam: blueTeam,
        redTeam: redTeam,
        highest: Math.max(...dmg),
      });
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
              <th colSpan="1">Dmg</th>
            </tr>
          </thead>
          <tbody>
            {teams.blueTeam.map((player, key) => (
              <tr key={key}>
                <OverviewTableRow teams={teams} player={player} />
              </tr>
            ))}
          </tbody>
          <thead>
            <tr>
              <th colSpan="3">Red team</th>
              <th colSpan="1">Solo tier</th>
            </tr>
          </thead>
          <tbody>
            {teams.redTeam.map((player, key) => (
              <tr key={key}>
                <OverviewTableRow teams={teams} player={player} />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loader className={"loader-matchHistory"} />
      )}
    </div>
  );
};
export default Overview;
