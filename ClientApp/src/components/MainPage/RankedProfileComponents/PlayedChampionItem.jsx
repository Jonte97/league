import React, { useState, useEffect } from 'react'
import { getChampionImageById } from '../../../functions/ChampionHelper'

const PlayedChampionItem = (props) => {
    const [champion, setChampion] = useState(null);
    useEffect(() => {
        const champ = getChampionImageById(props.champion.championId, props.champions);
        setChampion(champ);
        console.log(champ)
    }, [props.champion]);

    const winrateStyle = (winrate) => {
        const color = {
            color: winrate >= 50 ? "#50fb50" : "#fb5057"
        }
        return color;
    }

    return (
        champion ?
            <div className="ranked-profile-section">
                <div className="ranked-profile-champion-item">
                    <img className="ranked-profile-thumbnail" alt="champImg" src={`https://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/${champion.full}`} />
                    <div className="champion-item-games">
                        <div>
                            {/* TODO fix width */}
                            <div className="game-count">{props.champion.gameCount}</div>
                            <span> Games </span>
                        </div>
                        <div>
                            <span style={winrateStyle(props.champion.winrate)}>
                                {props.champion.winrate}%
                            </span>
                                win
                        </div>
                    </div>
                </div>
            </div >
            : <div />
    );
}

export default PlayedChampionItem;