import React, { useState, useEffect } from 'react'
import { getChampionImageById } from '../../../functions/ChampionHelper'

const PlayedChampionItem = (props) => {

    const [champion, setChampion] = useState(null);
    useEffect(() => {
        const champ = getChampionImageById(props.champion.championId, props.champions);
        setChampion(champ);
        console.log(champ)
    }, [props.champion]);

    return (
        champion ?
            <div className="ranked-profile-section">
                <div className="ranked-profile-champion-item">
                    <img className="ranked-profile-thumbnail" alt="champImg" src={`https://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/${champion.full}`} />
                    <div className="champion-item-games">
                        <div><span> {props.champion.gameCount} Games </span></div>
                        <div><span>52% win</span></div>
                    </div>
                </div>
            </div >
            : <div />
    );
}

export default PlayedChampionItem;