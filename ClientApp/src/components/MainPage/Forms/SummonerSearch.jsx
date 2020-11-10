import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useHistory } from "react-router";

const SummonerSearch = () => {
  const history = useHistory();
  const [text, setText] = useState(null);
  const handleClick = () => {
    history.push(`/Summoner/${text}`);
  };
  return (
    <div className="form">
      <input
        id="summonerSearch"
        type="text"
        name="namn"
        placeholder="Search summoner"
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          var key = event.keyCode;
          if (key === 13) {
            handleClick;
          }
        }}
      />
      <button type="button" className="button" onClick={handleClick}>
        <BsSearch />
      </button>
    </div>
  );
};
export default SummonerSearch;
