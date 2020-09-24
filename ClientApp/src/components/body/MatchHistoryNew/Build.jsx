import React, { useEffect, useState } from 'react';
import { getItemEventsForParticipant } from '../../../functions/promiseHelper';
import ItemBuild from './BuildComponents/ItemBuild';
import RuneSetup from './BuildComponents/RuneSetup';
import SkillOrder from './BuildComponents/SkillOrder';


const Build = (props) => {

    const [itemEvents, setItemEvents] = useState();
    const [skillOrder, setSkillOrder] = useState();

    useEffect(() => {
        getItemEventsForParticipant(setItemEvents, setSkillOrder, props.participant, props.gameId);
    }, []);

    return (
        <div className="history-build darker-theme-bg">
            {
                itemEvents ?
                    <ItemBuild items={itemEvents} />
                    :
                    <h2>Loading itemBuild</h2>}
            {
                props.stats ?
                    <RuneSetup stats={props.stats} runes={props.runes} />
                    :
                    <h2>Loading Runesetup</h2>
            }
            {
                skillOrder ? 
                <SkillOrder skillorder={skillOrder} />
                :
                <h2>Loading skillorder...</h2>
            }


        </div>
    );
}

export default Build;