import React from 'react';
import './header.css';
import HeaderMenu from '../sideMenu/SideMenu';
import SummonerSearch from '../MainPage/Forms/SummonerSearch';

//TODO move menu here
const Header = (props) => {
    return (
        <div className="header darker-theme-bg">
            <div className="container">
                <SummonerSearch updateSummoner={props.updateSummoner} />
                <HeaderMenu />
            </div>
        </div>
    );
}

export default Header;