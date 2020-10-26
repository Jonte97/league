import React, { useState } from "react";

const VisionOverview = (props) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <React.Fragment>
      <td
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <div
          style={isShown ? { visibility: "visible" } : { visibility: "hidden" }}
          className="info"
        >
          <div className="info-text">
            <div>Visionscore: {props.visionScore}</div>
            <div>Wards placed: {props.stats.wardsPlaced}</div>
            <div>Control ward: {props.stats.visionWardsBoughtInGame}</div>
            <div>Wards destroyed: {props.stats.wardsKilled}</div>
          </div>
        </div>
        <span className="vision-score">{props.visionScore}</span>
      </td>
    </React.Fragment>
  );
};

export default VisionOverview;
