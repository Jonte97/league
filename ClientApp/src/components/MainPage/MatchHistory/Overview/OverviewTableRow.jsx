import React from "react";
import { patch } from "../../../../TestFiles/Configuration";
import Damage from "./Damage";
import OverviewItems from "./OverviewItems";
import OverviewRankedDisplay from "./OverviewRankedDisplay";

const OverviewTableRow = (props) => {
  return (
    <React.Fragment>
      <td className="overview-thumbnail-cell">
        <div>
          <img
            className="overview-thumbnail"
            alt="champImage"
            title={props.player.champion.url.full}
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${props.player.champion.url.full}`}
          />
        </div>
      </td>
      <td className="overview-summonerSpells-thumbnail">
        <div>
          <img
            alt="Summonerspell 1"
            title={props.player.summonerSpells.spell1.name}
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${props.player.summonerSpells.spell1.id}.png`}
          />
          <img
            alt="summonerspell 2"
            title={props.player.summonerSpells.spell2.name}
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${props.player.summonerSpells.spell2.id}.png`}
          />
        </div>
      </td>
      <td>{props.player.identity.summonerName}</td>
      <td>
        <OverviewRankedDisplay rankDisplay={props.rankDisplay} player={props.player} />
      </td>
      <td>
        <div className="overview-kda">{`${props.player.kda.toFixed(
          2
        )} Kda`}</div>
        <div>
          {`${props.player.stats.kills} / ${props.player.stats.deaths} / ${props.player.stats.assists}`}
        </div>
      </td>
      <td>
        {props.player.stats.neutralMinionsKilled +
          props.player.stats.totalMinionsKilled}
        {" (" + props.player.csPerMin.toFixed(1) + ")"}
      </td>
      <td>{props.player.stats.visionScore}</td>
      <td>
        <OverviewItems stats={props.player.stats} />
      </td>
      <td>
        <Damage
          teamDmg={props.teamDmg}
          highest={props.teams.highest}
          dmg={props.player.stats.totalDamageDealtToChampions}
          stats={props.player.stats}
        />
      </td>
    </React.Fragment>
  );
};

export default OverviewTableRow;
