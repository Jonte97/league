import React from "react";
import { patch } from "../../../../TestFiles/Configuration";
import Damage from "./Damage";
import OverviewItems from "./OverviewItems";
import OverviewRankedDisplay from "./OverviewRankedDisplay";
import VisionOverview from "./VisionOverview";

const OverviewTableRow = (props) => {
  const kdaStyle = (kda) => {
    const style = {
      color: "",
    };
    if (kda > 3) style.color = "#3fe06a";
    else if (kda < 1) style.color = "#e0653f";
    else if (kda === "Perfect") style.color = "#e0cf36";
    else style.color = "#b3b1b1";

    return style;
  };

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
        <OverviewRankedDisplay
          rankDisplay={props.rankDisplay}
          player={props.player}
        />
      </td>
      <td>
        <div className="overview-kda">
          <span style={kdaStyle(props.player.kda)}>{`${props.player.kda} Kda`}</span>
        </div>
        <div>
          <span>
            {`${props.player.stats.kills} / ${props.player.stats.deaths} / ${props.player.stats.assists}`}
          </span>
        </div>
      </td>
      <td>
        {props.player.stats.neutralMinionsKilled +
          props.player.stats.totalMinionsKilled}
        {" (" + props.player.csPerMin.toFixed(1) + ")"}
      </td>
      <td>
        <OverviewItems stats={props.player.stats} />
      </td>
      <VisionOverview stats={props.player.stats} visionScore={props.player.stats.visionScore} />
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
