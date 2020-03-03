import React from 'react';

const ProfileHead = (props) => {

    let summonerIcon = "http://ddragon.leagueoflegends.com/cdn/10.4.1/img/profileicon/" + props.summoner.profileIconId + ".png";

    return (
        <div className="container">
            <img
                id={"summonerIcon"}
                src={summonerIcon}
                className="center"
            />
            <div className="row ">
                <h1 id={"summonerName"} >
                    {props.summoner.name}
                </h1>
                <h1 id={"summonerLvl"} >Level {props.summoner.summonerLevel}</h1>
            </div>
        </div>
    );
};

export default ProfileHead;
