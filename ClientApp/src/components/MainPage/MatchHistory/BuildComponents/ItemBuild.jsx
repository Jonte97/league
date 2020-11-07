import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { GetReadableTimestamp } from "../../../../functions/TimeStampHelper";
import { patch } from "../../../../TestFiles/Configuration";

const ItemBuild = (props) => {
  const amount = props.items.length - 1;

  return (
    <div className="history-item-build-wrapper">
      <div className="history-item-build-inner">
        {props.items.map((event, key) => (
          <div key={key} className="history-item-build-holder">
            <div className="history-item-build-item" key={key}>
              <span
                className="greyed-text"
                style={{ fontSize: "10px", marginLeft: "6px" }}
              >
                Min {GetReadableTimestamp(event[0].timestamp)}
              </span>
              <div className="history-items-build-path">
                <div>
                  {event.map((item, key) =>
                    item.type == "ITEM_PURCHASED" ? (
                      <React.Fragment key={key}>
                        <div key={key} className="inline-flex color-wrapper">
                          <img
                            key={key}
                            className="history-item-build-thumbnail"
                            src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${item.itemId}.png`}
                          />
                          {item.quantity && (
                            <div className="label-quantity">
                              {item.quantity}
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    ) : (
                      <div key={key} className="inline-flex sold">
                        <img
                          key={key}
                          className="greyscale history-item-build-holder"
                          src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${item.itemId}.png`}
                        />
                        {item.quantity && (
                          <div className="label-quantity-sold">{item.quantity}</div>
                        )}
                      </div>
                    )
                  )}
                  <div className="arrow-forward inline-flex">
                    {key < amount ? <IoIosArrowForward /> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemBuild;
