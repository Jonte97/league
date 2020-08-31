import React from 'react';

const ChampPage = (props) => {

    let champ = props.active[0].champion;
    console.log(champ);
    return (
        <React.Fragment>
            <div>
                <h2>{champ.name}</h2>
                <h4>{champ.title}</h4>
            </div>
        </React.Fragment>
    );
}
export default ChampPage;