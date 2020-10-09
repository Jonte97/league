import React, { useState, useEffect } from 'react'
import TestPanel from '../../TestPanel'
import { getMostPlayedChampionsRanked } from '../../../functions/promiseHelper'
import PlayedChampionsList from './PlayedChampions';
import Loader from '../loader';
import '../../../StyleSheets/RankedProfile.css'
import { testQueueList } from '../../../TestFiles/QueueList'

const RankedProfile = (props) => {
    const [mostPlayedChampion, setMostPlayedChampion] = useState(null);
    useEffect(() => {
        const ranked = async () => {
            //! temporarily commented out 
            //const data = await getMostPlayedChampionsRanked(props.summoner.leagueEntries, props.summoner.summoner.accountId)
            setMostPlayedChampion(testQueueList);
        }
        ranked();
    }, [props.summoner.summoner]);


    return (
        <div className="container">
            <div className="ranked-profile-wrapper">
                {mostPlayedChampion ?
                    mostPlayedChampion.queueList.find((obj) => obj.queueId[0] === 420) ?
                        <div>
                            <PlayedChampionsList champions={mostPlayedChampion.queueList.find((obj) => obj.queueId[0] == 420)} />
                        </div>
                        :
                        null
                    :
                    <Loader
                        className={"loadIcon"}
                    />
                }
            </div>
        </div>
    );
}

export default RankedProfile;