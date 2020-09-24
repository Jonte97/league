import React from 'react';

const ProfileHead = (props) => {
    //TODO fix patch version
    let summonerIcon = "https://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/" + props.summoner.profileIconId + ".png";

    return (
        <div className="profile-head-container">
            <div className="inner-img">
                <img
                    id={"summonerIcon"}
                    src={summonerIcon}
                    className="center"
                />
            </div>
            <h4 id={"summonerName"} >
                {props.summoner.name}
            </h4>
            <h4 id={"summonerLvl"} >Level {props.summoner.summonerLevel}</h4>
        </div>
    );
};

export default ProfileHead;
