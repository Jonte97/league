import React, { useEffect } from "react";
import { patch } from "../../../TestFiles/Configuration";

const Items = (props) => {
  const getItemName = (id) => {
    try {
      const name = props.itemRefs.find((obj) => {
        return obj.id == id;
      });
      if (name == undefined) {
        const oldName = props.oldItemRefs.find((obj) => {
          return obj.id == id;
        });
        return oldName.data.name;
      } else {
        return name.data.name;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getItemUrl = (id) => {
    try {
      const item = props.itemRefs.find((obj) => {
        return obj.id == id;
      });
      if (item == undefined) {
        const oldItem = props.oldItemRefs.find((obj) => {
          return obj.id == id;
        });
        return `https://ddragon.leagueoflegends.com/cdn/10.22.1/img/item/${id}.png`;
      } else {
        return `https://ddragon.leagueoflegends.com/cdn/${props.version.version}/img/item/${id}.png`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {props.stats ? (
        <div className="history-item-list">
          <div className="history-item-items-row1">
            {props.stats.stats.item0 ? (
              <div className="history-item-item">
                <img
                  alt=""
                  title={getItemName(props.stats.stats.item0)}
                  className="history-item-img"
                  src={getItemUrl(props.stats.stats.item0)}
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
            {props.stats.stats.item1 ? (
              <div className="history-item-item">
                <img
                  alt=""
                  title={getItemName(props.stats.stats.item1)}
                  className="history-item-img"
                  src={getItemUrl(props.stats.stats.item1)}
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
            {props.stats.stats.item2 ? (
              <div className="history-item-item">
                <img
                  alt=""
                  title={getItemName(props.stats.stats.item2)}
                  src={getItemUrl(props.stats.stats.item2)}
                  className="history-item-img"
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
            <div className="">
              {props.stats.stats.item6 ? (
                <div className="history-item-item history-item-items-trinket">
                  <img
                    alt=""
                    title={getItemName(props.stats.stats.item6)}
                    className="history-item-img"
                    src={getItemUrl(props.stats.stats.item6)}
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
                  alt=""
                  title={getItemName(props.stats.stats.item3)}
                  className="history-item-img"
                  src={getItemUrl(props.stats.stats.item3)}
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
            {props.stats.stats.item4 ? (
              <div className="history-item-item">
                <img
                  alt=""
                  title={getItemName(props.stats.stats.item4)}
                  className="history-item-img"
                  src={getItemUrl(props.stats.stats.item4)}
                />
              </div>
            ) : (
              <div className="history-emptyitem"></div>
            )}
            {props.stats.stats.item5 ? (
              <div className="history-item-item">
                <img
                  alt=""
                  title={getItemName(props.stats.stats.item5)}
                  className="history-item-img"
                  src={getItemUrl(props.stats.stats.item5)}
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
