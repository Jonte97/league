import React from "react";
import { patch } from "../../../TestFiles/Configuration";

const PlayerList = (props) => {
  const labelColor = (team) => {
    const ret = {
      backgroundColor: team === "Red team" ? "#882525" : "#252888",
    };
    return ret;
  };

  const cutString = (element) => {
    let str = element;
    if (element.length > 10) {
      str = str.substring(0, 10);
      str = str.concat("...");
    }
    return str;
  };
  const getPlayerChamp = (id) => {
    //TODO FIX
    let x = props.ids.find((obj) => obj.participantId == id);
    return x;
  };
  //! Kraschar ofta här
  const getThumbnail = (id) => {
		let x = getPlayerChamp(id);
		let champ = props.championList.find((obj) => obj.k == x.championId);
    try {
      return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ.v.image.full}`;
    } catch (error) {
			console.error(`could not get ${x.championId}`);
			return -1;
		}
  };

  return props.ids ? (
    <div>
      <div className="team-title-wrapper">
        <div style={labelColor(props.team)} className="team-title-label">
          <div className="text-center team-title">{props.team}</div>
        </div>
      </div>
      <ul className="history-playerlist">
        {props.list.map((player, i) => (
          <li title={player.player.summonerName} key={i}>
            <img
							alt="?"
              className="history-list-thumbnail"
              src={getThumbnail(player.participantId)}
            />
            {cutString(player.player.summonerName)}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h4>Loading champions...</h4>
  );
};

export default PlayerList;
