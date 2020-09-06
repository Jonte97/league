import React from 'react';
import './champPage.css';
import ChampStats from "./ChampStats";
import ChampAbilities from './ChampAbilities';
import ChampPlaystyleInfo from './ChampPlaystyleInfo';

const ChampPage = (props) => {

    let champ = props.active[0].champion;
    let thumbnail = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/' + champ.image.full;

    console.log(champ);
    return (
        <React.Fragment>
            <div className="head-table">
                <div id="headContainer" className="inline">
                    <img id="championThumbnail" className="inline" src={thumbnail} />
                    <div id="title" className="inline">
                        <h2>{champ.name}</h2>
                        <h4 id="underTitle">{champ.title}</h4>
                    </div>
                </div>
                <ChampStats stat={champ.stats} name={champ.name} />
            </div>
            <ChampAbilities passive={champ.passive} spells={champ.spells} />
        </React.Fragment>
    );
}
export default ChampPage;