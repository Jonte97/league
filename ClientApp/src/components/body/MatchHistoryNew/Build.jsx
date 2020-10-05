import React, { useEffect, useState } from 'react';
import ItemBuild from './BuildComponents/ItemBuild';
import RuneSetup from './BuildComponents/RuneSetup';
import SkillOrder from './BuildComponents/SkillOrder';


const Build = (props) => {

    return (
        <div className="history-build">
            {
                props.itemEvents ?
                    <ItemBuild items={props.itemEvents} />
                    :
                    <h2>Loading itemBuild</h2>}
            <div className="display-flex">
                <div>
                    {
                        props.stats ?
                            <RuneSetup stats={props.stats} runes={props.runes} />
                            :
                            <h2>Loading Runesetup</h2>
                    }
                </div>
                <div>
                    {
                        props.skillOrder ?
                            <SkillOrder skillorder={props.skillOrder} />
                            :
                            <h2>Loading skillorder...</h2>
                    }
                </div>
            </div>
        </div>
    );
}

export default Build;