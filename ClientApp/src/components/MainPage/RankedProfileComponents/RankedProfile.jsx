import React, {useState, useEffect} from 'react'
import TestPanel from '../../TestPanel'

const RankedProfile = (props) => {


    return(
        <div>
            <TestPanel summoner={props.summoner}/>
        </div>
    );
}

export default RankedProfile;