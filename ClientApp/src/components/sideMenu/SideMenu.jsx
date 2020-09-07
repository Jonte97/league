import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";;


const SideMenu = () => {
    return (
        <nav id="menu">
            <ul id="nav-list">
                <li>
                    <Link to="/">Player</Link>
                </li>
                <li>
                    <Link to="/champions">Champions</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
        </nav>
    )
}

export default SideMenu
