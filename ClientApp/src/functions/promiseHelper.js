import { patch } from "../TestFiles/Configuration";
//TODO Move all api requests to this file
export const getAllChampions = async () => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`
  );
  const data = await response.json();

  return data;
};

export const getChampionList = async () => {
  const response = await fetch("api/LeagueApi/GetSimpleChampionList");
  const data = await response.json();
  return data;
};
//Get summonerspelldata and returns it
export const getSummonerSpellData = async () => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/summoner.json`
  );
  const data = await response.json();
  return data;
};

//Get Runes reforge json file
export const getRunesData = async () => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`
  );
  const data = await response.json();
  return data;
};

//Get matchhistory by for player by id INPUT: accountId
export const getMatchHistory = async (accountId) => {
  const response = await fetch("api/LeagueApi/GetMatchHistory", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(accountId),
  });
  const data = await response.json();
  return data;
};
export const getSummonerAsync = async (input) => {
  const response = await fetch("api/LeagueApi/GetSummonerData", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await response.json();
  return data;
};

//Get matchById INPUT; gameId
export const getMatchById = async (currentMatchId) => {
  const response = await fetch("api/LeagueApi/GetMatchById", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentMatchId),
  });
  const data = await response.json();
  return data;
};
//Get game stats for active summoner INPUT; gameId
export const getMatchDataForSummoner = async (currentMatchId, summonerName) => {
  let input = {
    gameId: currentMatchId,
    name: summonerName,
  };
  const response = await fetch("api/LeagueApi/GetSummonerMatchData", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await response.json();
  return data;
};

//* Gets timeline data for builds and skillorder
//TODO Should fetch build and skillorder for all participants
export const getTimeLineEvents = async (participantId, gameId) => {
  let input = {
    gameId: gameId,
    participant: participantId,
  };
  const response = await fetch("api/LeagueApi/GetItemsTimeLine", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await response.json();

  return data;
};

export const getItemListAsync = async () => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/item.json`
  );
  const data = await response.json();

  return data;
};

export const getMostPlayedChampionsRanked = async (entries, accountId) => {
  const input = {
    entries: entries,
    accountId: accountId,
  };
  const response = await fetch("api/LeagueApi/GetMostChampPlayedRanked", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (response.status !== 200) {
    return null;
  }
  const data = await response.json();
  return data;
};

export const getChampionByNameAsync = async (name) => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion/${name}.json`
  );
  const data = await response.json();

  return data;
};

export const getLeagueEntries = async (id) => {
  const response = await fetch("api/LeagueApi/GetSummonerLeagueEntries", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  });
  const data = await response.json();

  return data;
};

//* Gets list of all queues
export const getQueues = async () => {
  const response = await fetch(
    "https://static.developer.riotgames.com/docs/lol/queues.json"
  );
  const data = await response.json();

  return data;
};
//* Checks if summoner exists will get 200 (exists) 404 (not found) 500 (something went wrong)
export const checkSummonerExistsAsync = async (input) => {
  const response = await fetch("api/LeagueApi/SummonerExists", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await response.json();

  return data;
};

//* Gets summoner by name
export const getSummonerByNameAsync = async (name) => {
  const response = await fetch("api/LeagueApi/GetSummonerByName", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name),
  });
  const data = await response.json();

  return data;
};

//* Gets LiveGame
export const getLiveGame = async (summonerId) => {
  const response = await fetch("api/LeagueApi/LiveGame", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(summonerId),
  });
  const data = await response.json();

  return data;
};
