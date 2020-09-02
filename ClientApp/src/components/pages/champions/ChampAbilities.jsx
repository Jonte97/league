import React from 'react';

const ChampAbilities = (props) => {

    let spells = props.spells;
    let passive = props.passive;

    return (
        <React.Fragment>
            <div className="ability-card">
                <div className="ability-head">
                    <h3>{passive.name}</h3>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ChampAbilities;