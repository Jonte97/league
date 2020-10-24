import React from "react";

const Damage = (props) => {
  const { bgcolor, completed } = props;

	const testData = { bgcolor: "#6a1b9a", completed: 60 };

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
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
        <span style={labelStyles}>{`${testData.completed}%`}</span>
      </div>
    </div>
  );
};

export default Damage;
