import React from 'react'
import Queue from './Queue'
import {useState} from 'react'
import './profile.css';
import ProfileHead from './ProfileHead';

const Profile = (props) => {
    

    return (
        <div>
          <div className="profile-head">
            <ProfileHead summoner={props.summoner}/>
          </div>
            
            <div className="container">
              <div className="row">
                  {props.leagueEntries.map((item, i) => 
                    <Queue data={item} key={i} />
                  )}
              </div>
            </div>
            
        </div>
    )
}



export default Profile
