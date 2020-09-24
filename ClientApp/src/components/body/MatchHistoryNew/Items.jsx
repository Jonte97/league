import React from 'react';

const Items = (props) => {

    return (
        <React.Fragment>

            {props.stats ? (
                <div className="inline-flex">
                    {props.stats.stats.item0 ? (
                        <img
                            className="history-item-img"

                            src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats
                                .item0}.png`}
                        />
                    ) : <div className="history-emptyitem"></div>}
                    {props.stats.stats.item1 ? (
                        <img
                            className="history-item-img"
                            src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats
                                .item1}.png`}
                        />
                    ) : <div className="history-emptyitem"></div>}
                    {props.stats.stats.item2 ? (
                        <img
                            className="history-item-img"
                            src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats
                                .item2}.png`}
                        />
                    ) : <div className="history-emptyitem"></div>}
                    {props.stats.stats.item3 ? (
                        <img
                            className="history-item-img"
                            src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats
                                .item3}.png`}
                        />
                    ) : <div className="history-emptyitem"></div>}
                    {props.stats.stats.item4 ? (
                        <img
                            className="history-item-img"
                            src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats
                                .item4}.png`}
                        />
                    ) : <div className="history-emptyitem"></div>}
                    {props.stats.stats.item5 ? (
                        <img
                            className="history-item-img"
                            src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats
                                .item5}.png`}
                        />
                    ) : <div className="history-emptyitem"></div>}
                    {props.stats.stats.item6 ? (
                        <img
                            className="history-item-img"
                            src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/${props.stats.stats
                                .item6}.png`}
                        />
                    ) : <div className="history-emptyitem"></div>}
                </div>
            ) : (
                    <div />
                )}
        </React.Fragment>
    );
}
export default Items;

// <div className="history-emptyitem theme-bg"></div>