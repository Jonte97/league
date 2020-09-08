import React from 'react';

const ChampAbilities = (props) => {

    let spells = props.spells;
    let passive = props.passive;

    let passiveThumbnail = `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/${passive.image.full}`

    return (
        <React.Fragment>
            <div className="ability-card">
                <div className="ability-head">
                    <img src={passiveThumbnail} />
                    <h3 className="ability-title">{passive.name}</h3>
                </div>
                <div>
                    {passive.description}
                </div>
            </div>
            {props.spells.map((spell, key) => (
                <div id={spell.id} key={key} className="ability-card">
                    <div className="ability-head">
                        <img src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${spell.image.full}`} />
                        <h3 className="ability-title">{spell.name}</h3>
                        <p className="ablility-cdr">Cooldown {spell.cooldownBurn}</p>
                        <p>Cost {spell.costBurn} </p>
                    </div>
                    <div>
                        {spell.description}
                    </div>
                    <div className="inner-spell-card">
                        <div className="spell-dmg">
                            Spell dmg <p>{spell.effectBurn[1]} {spell.vars ? spell.vars.map((spellVar) => (<p>({spellVar.coeff})&nbsp;</p>)) : null}</p>
                        </div>
                        <div>
                            <p>Spell range {spell.rangeBurn}</p>
                        </div>
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}

export default ChampAbilities;