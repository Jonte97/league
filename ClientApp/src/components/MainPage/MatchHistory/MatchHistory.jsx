import React from "react";
import {
  getMatchHistory,
  getSummonerSpellData,
  getRunesData,
  getItemListAsync,
} from "../../../functions/promiseHelper";
import { useState, useEffect, useRef } from "react";
import MatchItem from "./MatchItem";
import Loader from "../loader";
import { oldItems } from "../../../DataFiles/oldItems";

const MatchHistory = (props) => {
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
      const runesData = await getRunesData();
      const itemsPrimitive = await getItemListAsync();
      const oldItemsPrimitive = oldItems;

      const oldItemsArr = parseItemsToArray(oldItemsPrimitive.data);
      const items = parseItemsToArray(itemsPrimitive.data);
      setGameReferences({
        championList: props.champions,
        summonerSpells: spellData,
        runesData: runesData,
        items: items,
        oldItems: oldItemsArr,
      });
    };
    getReferencesAsync();
  }, []);

  const [matchHistory, setMatchHistory] = useState(null);
  useEffect(() => {
    const getMatches = async () => {
      const matches = await getMatchHistory(props.activeSummoner.accountId);
      setMatchHistory(matches);
    };
    getMatches();
  }, []);

  useEffect(() => {
    const getMatches = async () => {
      const matches = await getMatchHistory(props.activeSummoner.accountId);
      setMatchHistory(matches);
    };
    setMatchHistory(null);
    getMatches();
  }, [props.activeSummoner]);

  return (
    <div className="theme-bg">
      <div className="container">
        {matchHistory ? (
          matchHistory.matches.map((match, i) => (
            <div key={i} className="history-item">
              <MatchItem
                ddragon={props.ddragon}
                key={i}
                champions={props.champions}
                match={match}
                owner={props.activeSummoner}
                summonerSpells={gameReferences.summonerSpells}
                runes={gameReferences.runesData}
                itemRefs={gameReferences.items}
                oldItems={gameReferences.oldItems}
              />
            </div>
          ))
        ) : (
          <Loader className={"loader-matchHistory"} />
        )}
      </div>
    </div>
  );
};

export default MatchHistory;
