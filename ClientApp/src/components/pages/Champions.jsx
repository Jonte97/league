import { useState, useEffect } from 'react';
import React from "react";
import Header from "./champions/Header";
import Body from "./champions/Body";

const Champions = () => {

    //TODO gör lite magic här med att hämta champs från api
	const [ championList, setChampionList ] = useState([ { Data: [] } ]);
    
    useEffect(() => {
		fetch('api/LeagueApi/GetSimpleChampionList').then((response) => response.json()).then((data) => {
			setChampionList(data);
		});
	}, []);

    console.log(championList)
    return (
        <React.Fragment>
            <Header />
            <Body champs={championList} />
        </React.Fragment>
    );
};

export default Champions;