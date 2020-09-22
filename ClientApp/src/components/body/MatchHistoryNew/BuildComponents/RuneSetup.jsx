import React from 'react';

const RuneSetup = (props) => {

    let primaryRunePath = props.runes.find((obj) => { return obj.id === props.stats.perkPrimaryStyle });
    let keystone = primaryRunePath.slots[0].runes.find((obj) => { return obj.id === props.stats.perk0});
    //let perk1 = primaryRunePath.slots[0].runes.find((obj) => { return obj.id === props.stats.perk1});


    let keyStoneThumbnail = `http://ddragon.leagueoflegends.com/cdn/img/${keystone.icon}`
    

    return (
        <div>
            <h4>Runes</h4>
            <img className="history-item-runesetup" src={`http://ddragon.leagueoflegends.com/cdn/img/${keystone.icon}`} />
        </div>
    );
}

export default RuneSetup;