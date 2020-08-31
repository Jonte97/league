import React, { useEffect, useState } from 'react';
//TODO Rename to championBody
const Body = () => {

    const [championList, setChampionList] = useState();

    useEffect(() => {
        fetch('api/LeagueApi/GetSimpleChampionList').then((response) => response.json()).then((data) => {
            setChampionList(data);
        });
    }, []);

    return championList ? (
        <div>
            <ul>{championList.map((champion) => 
                <li key={champion.v.id}><a>{champion.v.name}</a></li>)}
            </ul>
        </div>)
        : (<h2>Loading champions...</h2>)
}

export default Body;