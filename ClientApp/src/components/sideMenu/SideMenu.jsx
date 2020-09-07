import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";;


const SideMenu = () => {
    return (
        <nav id="menu">
            <ul id="nav-list">
                <li className="nav-border-right">
                    <Link to="/">Profile</Link>
                </li>
                <li>
                    <Link to="/champions">Champions</Link>
                </li>
                <li className="nav-border-left">
                    <Link to="/users">Users</Link>
                </li>
            </ul>
        </nav>
    )
}

export default SideMenu
