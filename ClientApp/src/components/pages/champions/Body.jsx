import React from 'react';

const Body = (props) => {
    console.log(props)
    return (
        <React.Fragment>
            {/* <ul>
                {props.champs.map((champion) =>
                    <li key={champion.v.id}><a>{champion.v.name}</a></li>
                )}
            </ul> */}
        </React.Fragment>
    );
}

export default Body;