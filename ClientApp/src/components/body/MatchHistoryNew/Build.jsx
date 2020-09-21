import React, { useEffect, useState } from 'react';
import { getItemEventsForParticipant } from '../../../functions/promiseHelper';
import ItemBuild from './Build/ItemBuild';
import RuneSetup from './Build/RuneSetup';


const Build = (props) => {

    const [itemEvents, setItemEvents] = useState();
    
    useEffect(() => {
        getItemEventsForParticipant(setItemEvents, props.participant, props.gameId);
    }, []);

    return (
        <div className="history-build darker-theme-bg">
            {itemEvents ?
                <ItemBuild items={itemEvents} />
                :
                <h2>Loading itemBuild</h2>}
            {
                props.stats ? 
                <RuneSetup stats={props.stats} runes={props.runes} />
                :
                <h2>Loading Runesetup</h2>
            }

        </div>
    );
}

export default Build;