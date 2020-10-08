import React from 'react';

const TestPanel = (props) => {
    const ranked = async () => {
        const response = await fetch('api/LeagueApi/GetRankedDataProfile', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(props.summoner.leagueEntries)
        })

        const data = await response.json();
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

export default TestPanel;