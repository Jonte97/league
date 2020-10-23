import React, { useEffect, useState } from "react";
import { getChampionImageById, getChampionNameById } from "../../../functions/ChampionHelper";

const Overview = (props) => {
  const [players, setPlayers] = useState(null);
  useEffect(() => {
    setPlayers(props.participantList);
  }, [props.participantList]);

  const redTeam = [];
  const blueTeam = [];
  let missingIdsRed = [];
  let missingIdsBlue = [];

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
  const fillBlankSpots = (missing, arr) => {
    missing.forEach((playerId) => {
      const missingPlayer = players.find((obj) => {
        return obj.participantId === playerId;
      });
      arr.push(missingPlayer);
    });
  };

	const fillTeams = (team) => {
		team.forEach(player => {
			player.champion = { name: "", url: "" }
			player.champion.url = getChampionImageById(player.championId);
			player.champion.name = getChampionNameById()
		});
	}

  getRoles(redTeam, 200, missingIdsRed);
  getRoles(blueTeam, 100, missingIdsBlue);
  fillBlankSpots(missingIdsBlue, blueTeam);
  fillBlankSpots(missingIdsRed, redTeam);
	


  return (
    <div className="overview-wrapper">
      <table className="overview-table">
        <thead></thead>
        <tbody>
          <tr>
            <th>Blue team</th>
          </tr>
          {players
            ? blueTeam.map((player, key) => (
                <tr key={key}>
                  <td>{player.championId}</td>
                </tr>
              ))
            : null}
          <tr>
            <th>Red Team</th>
          </tr>
          {players
            ? redTeam.map((player, key) => (
                <tr key={key}>
                  <td>{player.championId}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};
export default Overview;
