import React, { useEffect, useState } from "react";
import {
  championDictionary,
  getChampionImageById,
  getChampionNameById,
} from "../../../../functions/ChampionHelper";
import { getLeagueEntries } from "../../../../functions/promiseHelper";
import { getSummonerSpell } from "../../../../functions/summonerSpellHelper";
import Loader from "../../loader";
import OverviewTableRow from "./OverviewTableRow";

import { getEmblem } from "../../../../functions/RankedEmblemHelper";
import OverviewTableHeaders from "./OverviewTableHeaders";

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
    const blueTeamDamage = [];
    const redTeamDamage = [];
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
    const fillTeams = async (team, teamDmg) => {
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
          flex: { rank: "", tier: "", img: "" },
        };

        //*Kda, cs and dmg numbers
        player.csScore =
          player.stats.totalMinionsKilled + player.stats.neutralMinionsKilled;
        player.csPerMin = player.csScore / (props.matchDuration / 60);
        player.kda =
          (player.stats.kills + player.stats.assists) / player.stats.deaths;

        dmg.push(player.stats.totalDamageDealtToChampions);
        teamDmg.push(player.stats.totalDamageDealtToChampions);
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
          team[i].ranked.solo.wins = solo.wins;
          team[i].ranked.solo.losses = solo.losses;
          team[i].ranked.solo.winrate = (
            (solo.wins / (solo.wins + solo.losses)) *
            100
          ).toFixed(0);
        } else {
          team[i].ranked.solo.img = getEmblem("unranked");
          team[i].ranked.solo.rank = "";
          team[i].ranked.solo.tier = "Unranked";
        }
        const flex = entry.find((obj) => obj.queueType === "RANKED_FLEX_SR");
        if (flex != undefined) {
          team[i].ranked.flex.img = getEmblem(flex.tier);
          team[i].ranked.flex.rank = flex.rank;
          team[i].ranked.flex.wins = flex.wins;
          team[i].ranked.flex.losses = flex.losses;
          team[i].ranked.flex.tier = flex.tier;
          team[i].ranked.flex.winrate = (
            (flex.wins / (flex.wins + flex.losses)) *
            100
          ).toFixed(0);
        } else {
          team[i].ranked.flex.img = getEmblem("unranked");
          team[i].ranked.flex.rank = "";
          team[i].ranked.flex.tier = "Unranked";
        }
      }
    };
    const setup = async () => {
      getRoles(redTeam, 200, missingIdsRed);
      getRoles(blueTeam, 100, missingIdsBlue);

      addMissingPlayers(missingIdsBlue, blueTeam);
      addMissingPlayers(missingIdsRed, redTeam);

      await fillTeams(blueTeam, blueTeamDamage);
      await fillTeams(redTeam, redTeamDamage);
      setTeams({
        blueTeam: blueTeam,
        redTeam: redTeam,
        highest: Math.max(...dmg),
        blueTeamDamage: blueTeamDamage.reduce((a, b) => a + b, 0),
        redTeamDamage: redTeamDamage.reduce((a, b) => a + b, 0),
      });
    };

    if (players != null) {
      setup();
    }
  }, [players]);
  const setRank = (queue) => {
    queue == 440 ? setDisplayRank(420) : setDisplayRank(440);
  };
  let initial = props.queue === 440 ? props.queue : 420;
  const [displayRank, setDisplayRank] = useState(initial);
  return (
    <div className="overview-wrapper">
      {teams ? (
        <table className="overview-table">
          <thead>
            <OverviewTableHeaders queue={displayRank} setRank={setRank} />
          </thead>
          <tbody>
            {teams.blueTeam.map((player, key) => (
              <tr key={key}>
                <OverviewTableRow
                  rankDisplay={displayRank}
                  teamDmg={teams.blueTeamDamage}
                  teams={teams}
                  player={player}
                />
              </tr>
            ))}
          </tbody>
          <thead>
            <OverviewTableHeaders queue={displayRank} setRank={setRank} />
          </thead>
          <tbody>
            {teams.redTeam.map((player, key) => (
              <tr key={key}>
                <OverviewTableRow
                  rankDisplay={displayRank}
                  teamDmg={teams.redTeamDamage}
                  teams={teams}
                  player={player}
                />
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
