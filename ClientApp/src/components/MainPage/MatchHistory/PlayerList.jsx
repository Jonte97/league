import React from 'react';

const PlayerList = (props) => {

    const labelColor = (team) => {
        const ret = {
            backgroundColor: team === "Red team" ? '#882525' : '#252888'
        }
        return ret
    }

    const cutString = (element) => {
        let str = element;
        if (element.length > 10) {
            str = str.substring(0, 10);
            str = str.concat('...');
        }
        return str;
    }
    const getPlayerChamp = (id) => {
        //TODO FIX
        let x = props.ids.find((obj) => obj.participantId == id)
        return x;
    }

    const getThumbnail = (id) => {
        let x = getPlayerChamp(id);
        let champ = props.championList.find((obj) => obj.k == x.championId);
        return `https://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/${champ.v.image.full}`
    }

    return (
        props.ids ?
            <div>
                <div className="team-title-wrapper">
                    <div style={labelColor(props.team)} className="team-title-label">
                        <div className="text-center team-title">{props.team}</div>
                    </div>
                </div>
                <ul className="history-playerlist">
                    {props.list.map((player, i) =>
                        <li title={player.player.summonerName} key={i}>
                            <img className="history-list-thumbnail" src={getThumbnail(player.participantId)} />
                            {cutString(player.player.summonerName)}
                        </li>
                    )}
                </ul>
            </div>
            :
            <h4>Loading champions...</h4>
    );
}

export default PlayerList;