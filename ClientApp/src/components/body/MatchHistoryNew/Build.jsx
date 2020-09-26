import React, { useEffect, useState } from 'react';
import ItemBuild from './BuildComponents/ItemBuild';
import RuneSetup from './BuildComponents/RuneSetup';
import SkillOrder from './BuildComponents/SkillOrder';


const Build = (props) => {

    return (
        <div className="history-build darker-theme-bg">
            {
                props.itemEvents ?
                    <ItemBuild items={props.itemEvents} />
                    :
                    <h2>Loading itemBuild</h2>}
            {
                props.stats ?
                    <RuneSetup stats={props.stats} runes={props.runes} />
                    :
                    <h2>Loading Runesetup</h2>
            }
            {
                props.skillOrder ?
                    <SkillOrder skillorder={props.skillOrder} />
                    :
                    <h2>Loading skillorder...</h2>
            }
        </div>
    );
}

export default Build;