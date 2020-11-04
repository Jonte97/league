import React, { useEffect } from "react";

const Items = (props) => {
  const getItemName = (id) => {
    const name = props.itemRefs.find((obj) => {
      return obj.id == id;
    });
    return name.data.name;
  };

  return (
    <div>
      {props.stats ? (
        <div className="history-item-list">
          <div className="history-item-items-row1">
            {props.stats.stats.item0 ? (
              <div className="history-item-item">
                <img
                  alt="item-img"
                  title={getItemName(props.stats.stats.item0)}
                  className="history-item-img"
                  src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats.item0}.png`}
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
            {props.stats.stats.item1 ? (
              <div className="history-item-item">
                <img
                  alt="item-img"
                  title={getItemName(props.stats.stats.item1)}
                  className="history-item-img"
                  src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats.item1}.png`}
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
            {props.stats.stats.item2 ? (
              <div className="history-item-item">
                <img
                  alt="item-img"
                  title={getItemName(props.stats.stats.item2)}
                  className="history-item-img"
                  src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats.item2}.png`}
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
            <div className="">
              {props.stats.stats.item6 ? (
                <div className="history-item-item history-item-items-trinket">
                  <img
                    alt="item-img"
                    title={getItemName(props.stats.stats.item6)}
                    className="history-item-img"
                    src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats.item6}.png`}
                  />
                </div>
              ) : (
                <div className="history-emptyitem"></div>
              )}
            </div>
          </div>
          <div className="history-item-items-row2">
            {props.stats.stats.item3 ? (
              <div className="history-item-item">
                <img
                  alt="item-img"
                  title={getItemName(props.stats.stats.item3)}
                  className="history-item-img"
                  src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats.item3}.png`}
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
            {props.stats.stats.item4 ? (
              <div className="history-item-item">
                <img
                  alt="item-img"
                  title={getItemName(props.stats.stats.item4)}
                  className="history-item-img"
                  src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats.item4}.png`}
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
            {props.stats.stats.item5 ? (
              <div className="history-item-item">
                <img
                  alt="item-img"
                  title={getItemName(props.stats.stats.item5)}
                  className="history-item-img"
                  src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats.item5}.png`}
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
export default Items;

// <div className="history-emptyitem theme-bg"></div>
