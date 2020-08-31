import React, { useEffect, useState } from 'react';
import ChampPage from './ChampPage';
//TODO Rename to championBody
const Body = () => {

    const [championList, setChampionList] = useState();
    const [activeKey, setActiveKey] = useState(0);
    const [activeChampion, setActiveChampion] = useState();


    useEffect(() => {
        console.log("Active key är nu: " + activeKey);

        if (activeKey !== 0) {
            fetch('api/LeagueApi/GetChampByKey', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(activeKey)
            })
                .then((response) => response.json())
                .then((data) => {
                    setActiveChampion(data);
                })
                .catch((reason => {
                    console.log(reason);
                }));
        }
    }, [activeKey]);

    useEffect(() => {
        fetch('api/LeagueApi/GetSimpleChampionList').then((response) => response.json()).then((data) => {

            setChampionList(data);
        });
    }, []);

    //* Map to write all champs as links in a list
    return championList ? (
        <React.Fragment>
            <div>
                {/* <ul>{championList.map((champion) =>
                    <li key={champion.v.id}><a onClick={() => setActiveKey(champion.v.id)}>{champion.v.name}</a></li>)}
                </ul> */}
                {
                    //! FOR TESTING ONLY_______________________________________________
                }
                <ul>
                    <li key={championList[0].v.id}><a onClick={() => setActiveKey(championList[0].v.id)}>{championList[0].v.name}</a></li>
                </ul>
                {
                    //!________________________________________________________________
                }
            </div>
            {activeChampion ? (<ChampPage active={activeChampion} />) : (<h2>No champion is chosen yet!</h2>)}
        </React.Fragment>
    )
        : (<h2>Loading champions...</h2>)
}

export default Body;