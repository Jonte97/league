import React, { useState } from 'react';
import { getItemEventsForParticipant } from '../../../functions/promiseHelper';
import ItemBuild from './Build/ItemBuild';


const Build = (props) => {

    const [itemEvents, setItemEvents] = useState();

    getItemEventsForParticipant(setItemEvents);

    return (
        <div>
            <h2>hello world</h2>
            {itemEvents ?
                <ItemBuild items={itemEvents} />
                :
                <h2>Loading itemBuild</h2>}

        </div>
    );
}

export default Build;