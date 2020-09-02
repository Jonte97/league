import React from 'react';
import './champPage.css';
import ChampStats from "./ChampStats";
import ChampAbilities from './ChampAbilities';

const ChampPage = (props) => {

    let champ = props.active[0].champion;
    let thumbnail = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/' + champ.image.full;

    console.log(champ);
    return (
        <React.Fragment>
            <div className="inline">
                <img className="inline" src={thumbnail} />
                <div id="title" className="inline">
                    <h2>{champ.name}</h2>
                    <h4 id="underTitle">{champ.title}</h4>
                </div>
            </div>
        </React.Fragment>
    );
}
export default ChampPage;