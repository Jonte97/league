import React from 'react';
import { useState } from "react";
import Profile from './Profile/Profile';
import MatchHistory from './MatchHistory/MatchHistory';

const Body = () => {
  let league = [{
    tier: "Gold",
    freshblood: "asdasd",
    inactive: "asdasd",
    leagueId: "asdasd",
    rank: "II",
    leaguePoints: 51,
    losses: 12,
    wins: 13,
    hotStreak: true,
    summonerName: "a name",
    queueType: "RANKED_FLEX_SR",
    veteran: true
},
{
  tier: "Gold",
  freshblood: "asdasd",
  inactive: "asdasd",
  leagueId: "asdasd",
  rank: "II",
  leaguePoints: 51,
  losses: 12,
  wins: 13,
  hotStreak: true,
  summonerName: "a name",
  queueType: "RANKED_FLEX_SR",
  veteran: true
},
{
tier: "Gold",
freshblood: "asdasd",
inactive: "asdasd",
leagueId: "asdasd",
rank: "II",
leaguePoints: 51,
losses: 12,
wins: 13,
hotStreak: true,
summonerName: "a name",
queueType: "RANKED_FLEX_SR",
veteran: true
}];
let testSummoner = {
    profileIconId: 4353,
    name: "Lönnen",
    puuid: "SJ3ASQYH0yIR5KfUFp9MyzMpgcI1DOWn5Ej4JCCELjFRr7j6ZstBFxb2SukZpeotGl4NiX2yDrhXXw",
    summonerLevel: 20000,
    accountId: "CVJYBZF4gP1K8Yf9qz4yXaRj8VB8HAO8Iw-Di5akt17wMTQ",
    id: "RX9EZlAnL6PWORh-OEF1LU5N6Q5jzgFwmYE7zqif_xyDUWM",
    revisionDate: 1582835855000
}


const [leagueEntries, setLeague] = useState(league);
const [summoner, setSummoner] = useState(testSummoner)



const getSummonerName = () => {
    
    fetch('api/LeagueApi/GetSummonerData')
    .then(response => response.json())
    .then(data => {
        var json = JSON.stringify(data.leagueEntries);
        console.log(json)
        setLeague(data.leagueEntries);
        setSummoner(data.summoner)
    });
}
  
  return (
    <div>
        <button onClick={ () => getSummonerName() }>Collect data</button>
        <Profile leagueEntries={leagueEntries} summoner={summoner} />

        <MatchHistory summoner={summoner} />
    </div>
  );
};


export default Body;
