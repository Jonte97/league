import React, { useState } from "react";

const RuneTree = (props) => {
  const primaryPath = props.runes.find((obj) => obj.id === props.primaryPathId);
  const prependUrl = "https://ddragon.leagueoflegends.com/cdn/img/";

  const selectedRuneStyles = (id) => {
    const exist = props.selectedRunes.find((obj) => obj === id);
    console.log(exist);
    if (exist != null) return null;
    else return { filter: "grayscale(1)" };
  };

  return (
    <div className="runetree-wrapper">
      <div className="primary-path">
        <div className="rune-row keystone-row">
          {primaryPath.slots[0].runes.map((rune, key) => (
            <div>
              <img
                style={selectedRuneStyles(rune.id)}
                src={`${prependUrl}${rune.icon}`}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="rune-row">
          {primaryPath.slots[1].runes.map((rune, key) => (
            <div>
              <img
                style={selectedRuneStyles(rune.id)}
                src={`${prependUrl}${rune.icon}`}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="rune-row">
          {primaryPath.slots[2].runes.map((rune, key) => (
            <div>
              <img
                style={selectedRuneStyles(rune.id)}
                src={`${prependUrl}${rune.icon}`}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="rune-row">
          {primaryPath.slots[3].runes.map((rune, key) => (
            <div>
              <img
                style={selectedRuneStyles(rune.id)}
                src={`${prependUrl}${rune.icon}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
      <div className="secondary-path-wrapper">
        <div className="secondary-path">
          <div className="rune-row ">
            {props.secondaryPath.slots[1].runes.map((rune, key) => (
              <div>
                <img
                  style={selectedRuneStyles(rune.id)}
                  src={`${prependUrl}${rune.icon}`}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="rune-row">
            {props.secondaryPath.slots[2].runes.map((rune, key) => (
              <div>
                <img
                  style={selectedRuneStyles(rune.id)}
                  src={`${prependUrl}${rune.icon}`}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="rune-row">
            {props.secondaryPath.slots[3].runes.map((rune, key) => (
              <div>
                <img
                  style={selectedRuneStyles(rune.id)}
                  src={`${prependUrl}${rune.icon}`}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="stat-runes-wrapper">
        <div className="rune-row stat-runes">
          {props.statRunes.map((rune, key) => (
            <div>
              <img src={rune} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RuneTree;
