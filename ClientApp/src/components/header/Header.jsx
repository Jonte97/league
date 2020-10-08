import React from 'react';
import './header.css';
import SideMenu from '../sideMenu/SideMenu';
import SummonerSearch from '../body/Forms/SummonerSearch';

//TODO move menu here
const Header = (props) => {
    return (
        <div className="header darker-theme-bg">
            <SummonerSearch updateSummoner={props.updateSummoner} />
            <SideMenu />
        </div>
    );
}

export default Header;