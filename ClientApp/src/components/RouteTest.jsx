import React, { useEffect, useState } from "react";

const RouteTest = ({ match }) => {
  const [summoner, setSummoner] = useState(null);
  useEffect(() => {
    setSummoner(match.params.userId)
  }, []);
  return (
    <div>
      <h2>This is mainpage welcome {summoner}</h2>
    </div>
  );
};

export default RouteTest;
