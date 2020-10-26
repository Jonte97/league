import React from "react";

const Damage = (props) => {
  const bgcolor = props.dmg === props.highest ? "#e0cf36" : "#a84232";

  let completed = ((props.highest - props.dmg) / props.highest) * 100;
  completed = 100 - completed.toFixed(0);

  let teamDmg = (props.dmg / props.teamDmg) * 100;

  const containerStyles = {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0de",
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    textAlign: "right",
  };

  const labelStyles = {
    color: "white",
  };

  const spanStyle = {
    float: "right",
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div title="Total damage to champions">
      <div style={labelStyles}>
        <span>{`${numberWithCommas(props.dmg)}`}</span>
        <span title="Percentage of team damage to champions" style={spanStyle}>{`(${teamDmg.toFixed(0)}%)`}</span>
      </div>
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
    </div>
  );
};

export default Damage;
