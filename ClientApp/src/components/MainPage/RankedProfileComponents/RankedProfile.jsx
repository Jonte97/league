import React, { useState, useEffect } from 'react'
import TestPanel from '../../TestPanel'
import { getMostPlayedChampionsRanked } from '../../../functions/promiseHelper'
const RankedProfile = (props) => {

    const ranked = async () => {
        const data = await getMostPlayedChampionsRanked(props.summoner.leagueEntries, props.summoner.summoner.accountId)
        console.log(data);
    }

    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={() => ranked()}
            >Get Ranked profile</button>
        </div>
    );
}

export default RankedProfile;