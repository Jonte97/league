import React from "react";
import Emblem_Iron from "../../../../img/icons/Emblem_Iron.png";
import Emblem_Bronze from "../../../../img/icons/Emblem_Bronze.png";
import Emblem_Silver from "../../../../img/icons/Emblem_Silver.png";
import Emblem_Gold from "../../../../img/icons/Emblem_Gold.png";
import Emblem_Platinum from "../../../../img/icons/Emblem_Platinum.png";
import Emblem_Diamond from "../../../../img/icons/Emblem_Diamond.png";
import Emblem_Master from "../../../../img/icons/Emblem_Master.png";
import Emblem_Grandmaster from "../../../../img/icons/Emblem_Grandmaster.png";
import Emblem_Challenger from "../../../../img/icons/Emblem_Challenger.png";

const OverviewRankedDisplay = (props) => {
	return (
    <div>
      {/* //TODO see if can change these emblems to more readable when small size  */}
      {props.rankDisplay == 420 ? (
        <React.Fragment>
          <img
            className="overview-emblem"
            src={props.player.ranked.solo.img}
            alt="ranked-emblem"
            title={
              props.player.ranked.solo.tier +
              " " +
              props.player.ranked.solo.rank
            }
          />
          {props.player.ranked.solo.tier != "Unranked" ? (
            <span>{`${props.player.ranked.solo.wins}/${props.player.ranked.solo.losses} (${props.player.ranked.solo.winrate}%)`}</span>
          ) : null}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img
            className="overview-emblem"
            src={props.player.ranked.flex.img}
            alt="ranked-emblem"
            title={
              props.player.ranked.flex.tier +
              " " +
              props.player.ranked.flex.rank
            }
          />
          {props.player.ranked.flex.tier != "Unranked" ? (
            <span>{`${props.player.ranked.flex.wins}/${props.player.ranked.flex.losses} (${props.player.ranked.flex.winrate}%)`}</span>
          ) : null}
        </React.Fragment>
      )}
    </div>
  );
};

export default OverviewRankedDisplay;
