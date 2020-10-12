import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'

const SummonerSearch = (props) => {
    const [text, setText] = useState(null);

    return (
        <div className="form">
            <input
                id="summonerSearch"
                type="text"
                name="namn"
                placeholder="Search summoner"
                onChange={(event) => setText(event.target.value)}
                onKeyDown={(event) => {
                    var key = event.keyCode;
                    if (key === 13) {
                        props.updateSummoner(text);
                    }
                }}
            />
            <button type="button" className="button" onClick={() => props.updateSummoner(text)}
            >< BsSearch /></button>
        </div>
    );
}
export default SummonerSearch;