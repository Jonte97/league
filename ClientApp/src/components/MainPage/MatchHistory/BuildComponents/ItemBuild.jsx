import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { GetReadableTimestamp } from "../../../../functions/TimeStampHelper";

const ItemBuild = (props) => {
  return (
    <div className="history-item-build-wrapper">
      {props.items.map((event, key) => (
        <div key={key} className="history-item-build-holder">
          <div className="history-item-build-item" key={key}>
            <span
              className="greyed-text"
              style={{ fontSize: "10px", marginLeft: "3px" }}
            >
              Min {GetReadableTimestamp(event[0].timestamp)}
            </span>
            <div className="history-items-build-path">
              {event.map((item, key) =>
                item.type == "ITEM_PURCHASED" ? (
                  <React.Fragment>
                    <div key={key} className="inline-flex color-wrapper">
                      <img
                        key={key}
                        className="history-item-build-thumbnail"
                        src={`https://ddragon.leagueoflegends.com/cdn/10.19.1/img/item/${item.itemId}.png`}
                      />
                      {item.quantity && (
                        <div className="label-quantity">{item.quantity}</div>
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  <div key={key} className="grey-wrapper inline-flex">
                    <img
                      key={key}
                      className="history-item-build-thumbnail greyscale"
                      src={`https://ddragon.leagueoflegends.com/cdn/10.19.1/img/item/${item.itemId}.png`}
                    />
                    {item.quantity && (
                      <div className="label-quantity">{item.quantity}</div>
                    )}
                  </div>
                )
              )}
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemBuild;
