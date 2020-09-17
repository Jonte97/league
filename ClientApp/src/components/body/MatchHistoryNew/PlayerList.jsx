import React from 'react';

const PlayerList = (props) => {

    const getPlayerChamp = (id) => {

        //TODO FIX
        let x = props.ids.find((obj) => obj.participantId == id)

        return x;
    }

    const getThumbnail = (id) => {
        let x = getPlayerChamp(id);

        let champ = props.championList.find((obj) => obj.k == x.championId);
        return `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/champion/${champ.v.image.full}`
    }


    return (
        props.ids ?
            <ul className="history-playerlist">
                {props.list.map((player, i) =>
                    <li key={i}><img className="history-list-thumbnail" src={getThumbnail(player.participantId)} /> {player.player.summonerName}</li>
                )}
            </ul>
            :
            <h4>Loading champions...</h4>
    );
}

export default PlayerList;