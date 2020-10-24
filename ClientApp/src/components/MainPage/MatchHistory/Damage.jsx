import React from "react";

const Damage = (props) => {
  const { bgcolor } = props;

  let completed = (props.highest - props.dmg) / props.highest * 100;
  completed = 100 - completed.toFixed(0);
  console.log(completed)
  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    marginLeft: 50 
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${props.dmg}`}</span>
      </div>
    </div>
  );
};

export default Damage;
