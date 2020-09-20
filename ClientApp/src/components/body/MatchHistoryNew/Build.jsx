import React, { useEffect, useState } from 'react';
import { getItemEventsForParticipant } from '../../../functions/promiseHelper';
import ItemBuild from './Build/ItemBuild';


const Build = (props) => {

    const [itemEvents, setItemEvents] = useState();

    useEffect(() => {
        getItemEventsForParticipant(setItemEvents, props.participant, props.gameId);
    }, []);

    return (
        <div>
            {itemEvents ?
                <ItemBuild items={itemEvents} />
                :
                <h2>Loading itemBuild</h2>}

        </div>
    );
}

export default Build;