import React from 'react';
import { useState, useEffect } from 'react';
import Profile from './Profile/Profile';
import MatchHistory from './MatchHistory/MatchHistory';

const Body = () => {
    let league = [
        {
            tier: 'Gold',
            freshblood: 'asdasd',
            inactive: 'asdasd',
            leagueId: 'asdasd',
            rank: 'II',
            leaguePoints: 51,
            losses: 12,
            wins: 13,
            hotStreak: true,
            summonerName: 'a name',
            queueType: 'RANKED_FLEX_SR',
            veteran: true
        },
        {
            tier: 'Gold',
            freshblood: 'asdasd',
            inactive: 'asdasd',
            leagueId: 'asdasd',
            rank: 'II',
            leaguePoints: 51,
            losses: 12,
            wins: 13,
            hotStreak: true,
            summonerName: 'a name',
            queueType: 'RANKED_FLEX_SR',
            veteran: true
        },
        {
            tier: 'Gold',
            freshblood: 'asdasd',
            inactive: 'asdasd',
            leagueId: 'asdasd',
            rank: 'II',
            leaguePoints: 51,
            losses: 12,
            wins: 13,
            hotStreak: true,
            summonerName: 'a name',
            queueType: 'RANKED_FLEX_SR',
            veteran: true
        }
    ];
    let testSummoner = {
        profileIconId: 4353,
        name: 'Summoner not fetched',
        puuid: '',
        summonerLevel: 0,
        accountId: '',
        id: '',
        revisionDate: 1582835855000
    };

    const [leagueEntries, setLeague] = useState(league);
    const [summoner, setSummoner] = useState(testSummoner);
    let test;

    const onSubmit = (data) => {
        console.log(data);
        fetch('api/LeagueApi/GetSummonerData', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                var json = JSON.stringify(data.leagueEntries);
                console.log("returned summoner: " + json);
                setLeague(data.leagueEntries);
                setSummoner(data.summoner);
            })
            .catch((reason) => { alert("asdasdasda"); console.log("ERROR fetching summoner: " + reason); });
    };

    useEffect(() => {
        fetch('api/LeagueApi/GetSummonerInitialData').then((response) => response.json()).then((data) => {
            var json = JSON.stringify(data.leagueEntries);
            console.log(json);
            setLeague(data.leagueEntries);
            setSummoner(data.summoner);
        });
    }, []);

    return (
        <div>
            <input type="text" name="namn" onChange={(e) => { test = e.target.value; }} />
            <input type="button" onClick={() => onSubmit(test)} value="Get summoner" />
            <Profile leagueEntries={leagueEntries} summoner={summoner} />
            <MatchHistory summoner={summoner} />
        </div>
    );
};

export default Body;
