import React from "react";
import { patch } from "../../../TestFiles/Configuration";

const OverviewItems = (props) => {
  return (
    <div>
      <div className="overview-itembuild">
        {props.stats.item0 ? (
          <img
            alt="item-img"
            className="history-item-img"
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${props.stats.item0}.png`}
          />
        ) : (
          <div className="overview-empty-item"></div>
        )}
        {props.stats.item1 ? (
          <img
            alt="item-img"
            className="history-item-img"
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${props.stats.item1}.png`}
          />
        ) : (
          <div className="overview-empty-item"></div>
        )}
        {props.stats.item2 ? (
          <img
            alt="item-img"
            className="history-item-img"
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${props.stats.item2}.png`}
          />
        ) : (
          <div className="overview-empty-item"></div>
        )}
        {props.stats.item3 ? (
          <img
            alt="item-img"
            className="history-item-img"
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${props.stats.item3}.png`}
          />
        ) : (
          <div className="overview-empty-item"></div>
        )}
        {props.stats.item4 ? (
          <img
            alt="item-img"
            className="history-item-img"
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${props.stats.item4}.png`}
          />
        ) : (
          <div className="overview-empty-item"></div>
        )}
        {props.stats.item5 ? (
          <img
            alt="item-img"
            className="history-item-img"
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${props.stats.item5}.png`}
          />
        ) : (
          <div className="overview-empty-item"></div>
        )}
				{props.stats.item6 ? (
          <img
            alt="item-img"
            className="history-item-img"
            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${props.stats.item6}.png`}
          />
        ) : (
          <div className="overview-empty-item"></div>
        )}
      </div>
    </div>
  );
};

export default OverviewItems;
