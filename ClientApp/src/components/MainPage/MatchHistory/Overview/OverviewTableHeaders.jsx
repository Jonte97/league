import React from "react";

const OverviewTableHeaders = (props) => {
  return (
    <React.Fragment>
      <tr>
        <th colSpan="3">Blue team</th>
        <th colSpan="1">
          <a
            onClick={() => props.setRank(props.queue)}
          >
            {props.queue == 420 ? "Solo tier" : "Flex tier"}
          </a>
        </th>
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
        <th colSpan="1">
          <img
            alt="items"
            className="items-img"
            title="items"
            src="http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/items.png"
          />
        </th>
        <th colSpan="1">Vision</th>
        <th colSpan="1">Dmg</th>
      </tr>
    </React.Fragment>
  );
};

export default OverviewTableHeaders;
