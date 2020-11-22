import React from "react";
import { useState, useEffect } from "react";
import Profile from "./Profile/Profile";
import MatchHistory from "./MatchHistory/MatchHistory";
import { startLeague, startSummoner } from "../../functions/startupHelper";
import {
  getItemListAsync,
  getRunesData,
  getSummonerAsync,
  getSummonerSpellData,
} from "../../functions/promiseHelper";
import Header from "../header/Header";
import RankedProfile from "./RankedProfileComponents/RankedProfile";
import { championDictionary } from "../../functions/ChampionHelper";
import { useHistory } from "react-router";
import LiveGame from "../LiveGame/LiveGame";
import { configure } from "../../TestFiles/Configuration";
import { oldItems } from "../../DataFiles/oldItems";

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
  const [gameReferences, setGameReferences] = useState();
  useEffect(() => {
    const getReferencesAsync = async () => {
      const parseItemsToArray = (input) => {
        const itemArray = [];
        for (const [key, value] of Object.entries(input)) {
          const obj = { id: key, data: value };
          itemArray.push(obj);
        }
        return itemArray;
      };
      const spellData = await getSummonerSpellData();
      const champions = await championDictionary();
      const runesData = await getRunesData();
      const itemsPrimitive = await getItemListAsync();
      const oldItemsPrimitive = oldItems;

      const oldItemsArr = parseItemsToArray(oldItemsPrimitive.data);
      const items = parseItemsToArray(itemsPrimitive.data);
      setGameReferences({
        championList: champions,
        summonerSpells: spellData,
        runesData: runesData,
        items: items,
        oldItems: oldItemsArr,
      });
    };
    getReferencesAsync();
  }, []);

  const [fetchLiveGame, setFetchLiveGame] = useState(false);
  const getLiveGame = () => {
    setFetchLiveGame(true)
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
          <div className="livegame-button-wrapper">
            <button onClick={getLiveGame} className="glow-on-hover" type="button">
              In game
            </button>
          </div>
          {fetchLiveGame && (
            <LiveGame
              ddragon={dDragon}
              gameReferences={gameReferences}
              summoner={summoner.summoner}
            />
          )}
          {/* <RankedProfile championList={champions} summoner={summoner} /> */}

          {/* <MatchHistory
            ddragon={dDragon}
            champions={gameReferences.championList}
            activeSummoner={summoner.summoner}
          /> */}
        </React.Fragment>
      )}
    </div>
  );
};

export default MainPage;
