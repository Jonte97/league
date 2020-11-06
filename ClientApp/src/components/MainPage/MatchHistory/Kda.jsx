import React from "react";

const Kda = (props) => {
  const csScore =
    props.stats.totalMinionsKilled + props.stats.neutralMinionsKilled;
  const csScorePerMin = csScore / (props.matchDuration / 60);
  let kda = "";
  if (props.stats.deaths == 0) kda = "Perfect";
  else kda = ((props.stats.kills + props.stats.assists) / props.stats.deaths).toFixed(2);

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
    <div className="history-kda">
      <div>
        <img
          alt="kda"
          className="kda-img"
          title="kda"
          src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/score.png"
        />
        <span>
          {props.stats.kills}/{props.stats.deaths}/{props.stats.assists}
        </span>
        <span style={kdaStyle(kda)} className="kda cs-img">
          {kda} KDA
        </span>
      </div>
      <img
        alt="cs"
        className="cs-img"
        title="cs"
        src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
      />
      <span>
        {csScore} ({csScorePerMin.toFixed(1)})
      </span>
    </div>
  );
};
export default Kda;
