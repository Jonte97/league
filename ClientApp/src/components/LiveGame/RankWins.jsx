import React from "react";

const RankWins = (props) => {
  const winrate = (
    (props.data.wins / (props.data.wins + props.data.losses)) *
    100
  ).toFixed(0);
  const totalGames = props.data.wins + props.data.losses;

  const bgcolor = "#e63253";
  const containerStyles = {
    height: 5,
    width: "100px",
    backgroundColor: "#e69b32",
    display: "flex",
  };

  const fillerStyles = {
    height: "100%",
    width: `${winrate}%`,
    backgroundColor: bgcolor,
    textAlign: "center",
  };
  //TODO change color on filler if winrate is good/bad
  return (
    <div className="ranked-winrate">
      <span>
        {winrate} winr ({totalGames} games)
      </span>
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
    </div>
  );
};

export default RankWins;
