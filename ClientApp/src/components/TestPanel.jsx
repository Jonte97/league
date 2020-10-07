import React from 'react';

const TestPanel = () => {
    const ranked = async () => {
        const response = await fetch('api/LeagueApi/GetSimpleChampionList')
        //const data = await response.json();
        console.log(response);
    }
    return (
        <div>
            <button
                onClick={() => ranked()}
            >Get Ranked profile</button>
        </div>
    );
}

export default TestPanel;