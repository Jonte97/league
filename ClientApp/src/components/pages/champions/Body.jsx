import React, { useEffect, useState } from 'react';
//TODO Rename to championBody
const Body = () => {

    const [championList, setChampionList] = useState();
    const [activeChamp, setActiveChamp] = useState();

    useEffect(() => {
        console.log("State är nu " + activeChamp);
        //TODO fetch to controller here with active champ key

    }, [activeChamp]);

    useEffect(() => {
        fetch('api/LeagueApi/GetSimpleChampionList').then((response) => response.json()).then((data) => {
            setChampionList(data);
        });
    }, []);

    //* Map to write all champs as links in a list
    return championList ? (
        <div>
            <ul>{championList.map((champion) =>
                <li key={champion.v.id}><a onClick={() => setActiveChamp(champion.v.id)}>{champion.v.name}</a></li>)}
            </ul>
        </div>)
        : (<h2>Loading champions...</h2>)
}

export default Body;