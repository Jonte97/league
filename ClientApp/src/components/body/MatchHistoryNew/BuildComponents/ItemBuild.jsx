import React from 'react';
import { GetReadableTimestamp } from '../../../../functions/TimeStampHelper';

const ItemBuild = (props) => {

    //TODO Change timestamp to readable timestamp
    return (
        <div className="history-item-build-wrapper">
            <h3>Build order</h3>
            {props.items.map((event, key) =>
                <div key={key} className="history-item-build-holder">
                    <div className="history-item-build-item" key={key}>
                        <h5>Min {GetReadableTimestamp(event[0].timestamp)}</h5>
                        <div className="history-items-build-path">
                            {event.map((item, key) =>
                                item.type == "ITEM_PURCHASED" ?
                                    <div className="inline-flex color-wrapper">
                                        <img key={key} className="history-item-build-thumbnail" src={`https://ddragon.leagueoflegends.com/cdn/10.19.1/img/item/${item.itemId}.png`} />
                                    </div>
                                    :
                                    <div className="grey-wrapper inline-flex">
                                        <img key={key} className="history-item-build-thumbnail greyed" src={`https://ddragon.leagueoflegends.com/cdn/10.19.1/img/item/${item.itemId}.png`} />
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemBuild;