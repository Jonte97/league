import React from 'react'
import Queue from './Queue'
import { useState } from 'react'
import './profile.css';
import ProfileHead from './ProfileHead';

const Profile = (props) => {


  return (
    <div>
      <div className="profile-head theme-bg">
        <ProfileHead summoner={props.summoner} />
      </div>

      <div className="darker-theme-bg">
        {props.leagueEntries.map((item, i) =>
          <Queue data={item} key={i} />
        )}
      </div>

    </div>
  )
}



export default Profile
