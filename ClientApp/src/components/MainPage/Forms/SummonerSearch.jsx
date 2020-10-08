import React, { useState, useEffect } from 'react'

const SummonerSearch = (props) => {
    const [text, setText] = useState(null);

    return (
        <div className="form">
            <input
                id="summonerSearch"
                type="text"
                name="namn"
                onChange={(event) => setText(event.target.value)}
                onKeyDown={(event) => {
                    var key = event.keyCode;
                    if (key === 13) {
                        props.updateSummoner(text);
                    }
                }}
            />
            <input type="button" className="button darker-theme-bg" onClick={() => props.updateSummoner(text)} value="Get summoner" />
        </div>
    );
}
export default SummonerSearch;