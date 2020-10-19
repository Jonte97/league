import { useState, useEffect } from 'react';
import React from "react";
import ChampPage from "./champions/ChampPage";

const Champions = () => {
    const [championList, setChampionList] = useState();
    const [activeKey, setActiveKey] = useState("Ahri");
    const [activeChampion, setActiveChampion] = useState();

    useEffect(() => {
        console.log("Active key är nu: " + activeKey);
        //TODO move fetchfunctions to PromiseHelper.js
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
        <div >
            <div className="container">
                <React.Fragment>
                    <div>
                        {
                            //! FOR TESTING ONLY_______________________________________________
                        }
                        {/* <ul>
                            <li key={championList[0].v.id}><a onClick={() => setActiveKey(championList[0].v.id)}>{championList[0].v.name}</a></li>
                        </ul> */}
                        {
                            //!________________________________________________________________
                        }
                    </div>
                    {activeChampion ? (<ChampPage active={activeChampion} />) : (<h2>No champion is chosen yet!</h2>)}
                    <ul>{championList.map((champion) =>
                        <li key={champion.v.id}><a onClick={() => setActiveKey(champion.v.id)}>{champion.v.name}</a></li>)}
                    </ul>
                </React.Fragment>
            </div>
        </div>
    )
        : (<h2>Loading champions...</h2>)
};

export default Champions;