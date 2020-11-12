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
import LiveGame from "../LiveGame/LiveGame";
import { configure } from "../../TestFiles/Configuration";

const MainPage = ({ match }) => {
  const history = useHistory();
  const [dDragon, setDDragon] = useState(null);
  useEffect(() => {
    const setup = async () => {
      const result = await configure();
      setDDragon(result);
    };
    setup();
  }, []);

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
  }, [match.params.userId]);
  //TODO this should be standard championList
  const [champions, setChampions] = useState(null);
  useEffect(() => {
    const setup = async () => {
      const list = await championDictionary();
      setChampions(list);
    };
    setup();
  }, []);

  const handleClick = () => {
    history.push(`/LiveGame/${summoner.summoner.name}`);
  };
  return (
    <div>
      {summoner && (
        <React.Fragment>
          <Header />
          <Profile
            leagueEntries={summoner.leagueEntries}
            summoner={summoner.summoner}
          />
          <button id="live-game" className="btn-primary" onClick={handleClick}>
            Livegame
          </button>
          <LiveGame summoner={summoner.summoner} />
          {/* <RankedProfile championList={champions} summoner={summoner} /> */}

          <MatchHistory
            ddragon={dDragon}
            champions={champions}
            activeSummoner={summoner.summoner}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default MainPage;
