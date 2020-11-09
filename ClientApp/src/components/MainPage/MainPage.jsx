import React from "react";
import { useState, useEffect } from "react";
import Profile from "./Profile/Profile";
import MatchHistory from "./MatchHistory/MatchHistory";
import { startLeague, startSummoner } from "../../functions/startupHelper";
import { getSummonerAsync } from "../../functions/promiseHelper";
import Header from "../header/Header";
import RankedProfile from "./RankedProfileComponents/RankedProfile";
import { championDictionary } from "../../functions/ChampionHelper";
import { useHistory } from "react-router";

const MainPage = ({ match }) => {
  const history = useHistory();
  const startSummonerName = match.params.userId;
  const [summoner, setSummoner] = useState(null);
  useEffect(() => {
    const getSumm = async () => {
      const fetched = await getSummonerAsync(startSummonerName);
      setSummoner({
        summoner: fetched.summoner,
        leagueEntries: fetched.leagueEntries,
      });
    };
    getSumm();
  }, []);
  //TODO this should be standard championList
  const [champions, setChampions] = useState(null);
  useEffect(() => {
    const setup = async () => {
      const list = await championDictionary();
      setChampions(list);
    };
    setup();
  }, []);

  const getSummoner = async (name) => {
    const fetched = await getSummonerAsync(name);
    setSummoner({
      summoner: fetched.summoner,
      leagueEntries: fetched.leagueEntries,
    });
  };
  const handleClick = () => {
    history.push(`/LiveGame/${summoner.summoner.name}`);
  };
  return (
    <div>
      {summoner && (
        <React.Fragment>
          <Header updateSummoner={getSummoner} />
          <Profile
            leagueEntries={summoner.leagueEntries}
            summoner={summoner.summoner}
          />
          <button id="live-game" className="btn-primary" onClick={handleClick}>
            Livegame
          </button>
          {/* <RankedProfile championList={champions} summoner={summoner} /> */}
          <MatchHistory
            champions={champions}
            activeSummoner={summoner.summoner}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default MainPage;
