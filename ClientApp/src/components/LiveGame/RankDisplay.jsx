import React, { useEffect, useState } from "react";
import { getLeagueEntries } from "../../functions/promiseHelper";
import { getEmblem } from "../../functions/RankedEmblemHelper";
import RankWins from "./RankWins";

const RankDisplay = (props) => {
  const [rank, setRank] = useState(null);
  useEffect(() => {
    const setup = async () => {
      let flex = {};
      let solo = {};
      const playerE = await getLeagueEntries(props.player.summonerId);
      const soloRank = playerE.find(
        (obj) => obj.queueType === "RANKED_SOLO_5x5"
      );
      const flexRank = playerE.find(
        (obj) => obj.queueType === "RANKED_FLEX_SR"
      );
      if (soloRank != null) {
        solo = soloRank;
        solo.icon = getEmblem(soloRank.tier);
      } else {
        solo.icon = "unranked";
      }

      if (flexRank != null) {
        flex = flexRank;
        flex.icon = getEmblem(flexRank.tier);
      } else {
        flex.icon = "unranked";
      }

      setRank({ solo: solo, flex: flex });
    };
    if(props.player != null) setup();
  }, []);

  const OnlyFirstCaptialLetter = (string) => {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <React.Fragment>
      <td id="rank-display"> 
        <div className="ranked-emblem-wrapper">
          {rank && (
            <React.Fragment>
              <img src={rank.solo.icon} alt="" className="ranked-emblem" />
              <span>
                {OnlyFirstCaptialLetter(rank.solo.tier)} {rank.solo.rank} (
                {rank.solo.leaguePoints} lp)
              </span>
            </React.Fragment>
          )}
        </div>
      </td>
      <td id="winrate">{rank ? <RankWins data={rank.solo} /> : <div>No Data</div>}</td>
    </React.Fragment>
  );
};

export default RankDisplay;
