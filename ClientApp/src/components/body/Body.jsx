import React from 'react';
import { useState, useEffect } from "react";
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
        name: "Summoner not fetched",
        puuid: "",
        summonerLevel: 0,
        accountId: "",
        id: "",
        revisionDate: 1582835855000
    };

    const [leagueEntries, setLeague] = useState(league);
    const [summoner, setSummoner] = useState(testSummoner);

    useEffect(() => {
        fetch('api/LeagueApi/GetSummonerData')
            .then(response => response.json())
            .then(data => {
                var json = JSON.stringify(data.leagueEntries);
                console.log(json);
                setLeague(data.leagueEntries);
                setSummoner(data.summoner);
            });
        
    }, [])

    return (
        <div>
            <Profile leagueEntries={leagueEntries} summoner={summoner} />
            <MatchHistory summoner={summoner} />
        </div>
    );
};


export default Body;
