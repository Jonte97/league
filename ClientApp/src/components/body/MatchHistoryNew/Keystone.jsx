import React from 'react';

const Keystone = (props) => {

    //* primary rune path
    let primaryRunePath = props.runes.find((obj) => { return obj.id === props.stats.perkPrimaryStyle });
    let keystone = primaryRunePath.slots[0].runes.find((obj) => { return obj.id === props.stats.perk0});
    let secondareRunePath = props.runes.find((obj) => { return obj.id === props.stats.perkSubStyle }); 

    let keyStoneThumbnail = `http://ddragon.leagueoflegends.com/cdn/img/${keystone.icon}`
    let secondaryThumbnail = `http://ddragon.leagueoflegends.com/cdn/img/${secondareRunePath.icon}`

    return (
        <div className="history-rune-wrapper">
            <img className="history-keystone" src={keyStoneThumbnail} />
            <img className="history-secondary-rune" src={secondaryThumbnail} />
        </div>
    );
}

export default Keystone;