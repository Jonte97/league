import React from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";


const Loader = (props) => {
    return (
        <div>
            <div className={props.className}>
                <PacmanLoader
                    color="#36D7B7"
                />
            </div>
        </div>
    );
}

export default Loader;