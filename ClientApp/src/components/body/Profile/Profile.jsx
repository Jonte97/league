import React from 'react'
import Queue from './Queue'
import {useState} from 'react'

const Profile = () => {
    
    let league = [{
        tier: "asdasd",
        freshblood: "asdasd",
        inactive: "asdasd",
        leagueId: "asdasd",
        rank: "",
        leaguePoints: 0,
        losses: 0,
        wins: 0,
        hotStreak: "",
        summonerName: "a name",
        queueType: "",
        veteran: ""
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
        
        fetch('api/LeagueApi/Test')
        .then(response => response.json())
        .then(data => {
            setLeague(data.league);
            setSummoner(data.summoner)
            console.log("from controller" + data)
        });
    }

        
    console.log(leagueEntries);
    return (
        <div>
            <button onClick={ () => getSummonerName() }>Click me</button>
            <h2>{summoner.name}: level {summoner.summonerLevel}</h2>
            <img src="data:image/jpeg;base64,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"/>
            
            {league.map((item, i) => 
                <Queue data={item} />
            )}
            
        </div>
    )
}



export default Profile