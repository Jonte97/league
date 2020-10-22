import React, { useEffect, useState } from 'react';
import ItemBuild from './BuildComponents/ItemBuild';
import RuneSetup from './BuildComponents/RuneSetup';
import SkillOrder from './BuildComponents/SkillOrder';
import Loader from '../loader'

const Build = (props) => {

    return (
        <div className="history-build">
            <div>
                {
                    props.itemEvents || props.stats || props.skillOrder ?
                        <React.Fragment>
                                <ItemBuild items={props.itemEvents} />
                            <div className="display-flex">
                                <RuneSetup stats={props.stats} runes={props.runes} />
                            <div className="history-skillorder-table">
                                <SkillOrder skillorder={props.skillOrder} champion={props.champion} />
                            </div>
                            </div>
                        </React.Fragment>
                        :
                        <Loader
                            className={"loader-matchHistory"}
                        />
                }
            </div>
        </div>
    );
}

export default Build;