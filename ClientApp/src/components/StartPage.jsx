import React, { useState } from "react";
import { Link, Route, Router, useHistory } from "react-router-dom";
import { checkSummonerExistsAsync } from "../functions/promiseHelper";

const StartPage = () => {
  const [summonerName, setSummonerName] = useState(null);
  let history = useHistory();
  const handleChange = (e) => {
    setSummonerName(e.target.value);
  };

  const handleClick = async (name) => {
    const result = await checkSummonerExistsAsync(name);
    if (result === 200) {
      history.push(`/Summoner/${name}`);
    } else if (result === 404) {
      //TODO Handle not found
    } else {
      //TODO handle servererror
    }
  };
  return (
    <div>
      <div>
        <h1>Welcome to LolEagle!</h1>
      </div>
      <input
        type="text"
        name="summonerSearch"
        placeholder="SummonerName"
        onChange={handleChange}
      />
      <button onClick={() => handleClick(summonerName)}>
        test
        {/* <Link to={`/RouteTest/${summonerName}`}>asd</Link> */}
      </button>
    </div>
  );
};

export default StartPage;
