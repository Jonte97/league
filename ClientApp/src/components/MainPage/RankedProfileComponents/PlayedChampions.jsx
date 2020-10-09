import React, { useEffect, useState } from 'react';
import PlayedChampionItem from './PlayedChampionItem';

const PlayedChampionsList = (props) => {
    const [champions, setChampions] = useState(null);
    useEffect(() => {
        setChampions(props.champions.matchListChampion);
        console.log("ändrades")
    }, [props.champions]);

    return (
        <div>
            {
                champions ? champions.map((champ, key) =>
                    <div key={key}>
                        <PlayedChampionItem champion={champ} />
                    </div>
                )
                    :
                    null
            }
        </div>
    );
}

export default PlayedChampionsList;