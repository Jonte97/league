import React from 'react';

const RuneSetup = (props) => {

    let primaryRunePath = props.runes.find((obj) => { return obj.id === props.stats.perkPrimaryStyle });
    let secondaryRunePath = props.runes.find((obj) => { return obj.id === props.stats.perkSubStyle })

    let keystone = primaryRunePath.slots[0].runes.find((obj) => { return obj.id === props.stats.perk0});
    let perk1 = primaryRunePath.slots[1].runes.find((obj) => { return obj.id === props.stats.perk1});
    let perk2 = primaryRunePath.slots[2].runes.find((obj) => { return obj.id === props.stats.perk2});
    let perk3 = primaryRunePath.slots[3].runes.find((obj) => { return obj.id === props.stats.perk3});

    let perk4;
    let perk5;
    for (let i = 1; i < secondaryRunePath.slots.length; i++) {
        if (perk4 == null) {
            perk4 = secondaryRunePath.slots[i].runes.find((obj) => { return obj.id === props.stats.perk4});
        }
        if (perk5 == null) {
            perk5 = secondaryRunePath.slots[i].runes.find((obj) => { return obj.id === props.stats.perk5});
        }
    }


    console.log("perk 1" + JSON.stringify(secondaryRunePath.slots.length, 4, null))

    let keyStoneThumbnail = `http://ddragon.leagueoflegends.com/cdn/img/${keystone.icon}`
    

    return (
        <div>
            <h4>Runes</h4>
            <img className="history-item-runesetup" src={`http://ddragon.leagueoflegends.com/cdn/img/${keystone.icon}`} />
            <img className="history-item-runesetup" src={`http://ddragon.leagueoflegends.com/cdn/img/${perk1.icon}`} />
            <img className="history-item-runesetup" src={`http://ddragon.leagueoflegends.com/cdn/img/${perk2.icon}`} />
            <img className="history-item-runesetup" src={`http://ddragon.leagueoflegends.com/cdn/img/${perk3.icon}`} />

            <img className="history-item-runesetup" src={`http://ddragon.leagueoflegends.com/cdn/img/${perk4.icon}`} />
            <img className="history-item-runesetup" src={`http://ddragon.leagueoflegends.com/cdn/img/${perk5.icon}`} />
        </div>
    );
}

export default RuneSetup;