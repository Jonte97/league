import React from 'react'
import Queue from './Queue'
import { useState } from 'react'
import './profile.css';
import ProfileHead from './ProfileHead';

const Profile = (props) => {

  return (
    <div>
      <div className="profile-head theme-bg">
        <div className="container">
          <ProfileHead summoner={props.summoner} />
        </div>
      </div>

      <div className="darker-theme-bg">
        <div className="container">
          {props.leagueEntries ? props.leagueEntries.map((item, i) =>
            <Queue data={item} key={i} id={i} />

          ) : null}
        </div>
      </div>

    </div>
  )
}



export default Profile
