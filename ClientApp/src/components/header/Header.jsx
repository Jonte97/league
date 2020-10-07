import React from './node_modules/react';
import './header.css';
import SideMenu from '../sideMenu/SideMenu';

//TODO move menu here
const Header = () => {
    return ( 
    <div className="header darker-theme-bg">
        <SideMenu />
    </div> 
    );
}

export default Header;