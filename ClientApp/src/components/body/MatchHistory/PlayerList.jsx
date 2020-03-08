import { useEffect, useState } from 'react';
import React from 'react';
import GameStats from './GameStats';

const PlayerList = (props) => {

	useEffect(() => {
		fetch('api/LeagueApi/GetMatchById', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(props.id)
		})
			.then((response) => response.json())
			.then((data) => {
				props.setMatchInfo(data);
			})
			.catch((reason) => {
				console.log(reason);
			});
	}, []);

	return props.matchInfo ? (
		<React.Fragment>
			<div style={{ width: '400px' }}>
				<div style={{}}>
					{props.matchInfo.participantIdentities.map(
						(player, key) =>
							props.matchInfo.participants[key].teamId === 100 ? (
								<div className="blue" style={{ float: 'left', width: '50%' }}>
									<img
										style={{ width: '25px' }}
										src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/${props.champions.find(
											(v) => v.k == props.matchInfo.participants[key].championId
										).v.image.full}`}
									/>
									<a
										className="caption"
										id={key}
										key={key}
										onClick={() => props.currentPlayer(props.matchInfo.participants[key])}
									>
										{player.player.summonerName}
									</a>
								</div>
							) : (
								<React.Fragment />
							)
					)}
				</div>
				<div style={{}}>
					{props.matchInfo.participantIdentities.map(
						(player, key) =>
							props.matchInfo.participants[key].teamId === 200 ? (
								<div className="blue" style={{ float: 'right', width: '50%' }}>
									<img
										style={{ width: '25px' }}
										src={`http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/${props.champions.find(
											(v) => v.k == props.matchInfo.participants[key].championId
										).v.image.full}`}
									/>
									<a
										className="caption"
										id={key}
										key={key}
										onClick={() => props.currentPlayer(props.matchInfo.participants[key])}
									>
										{player.player.summonerName}
									</a>
									<br />
								</div>
							) : (
								<React.Fragment />
							)
					)}
				</div>
			</div>
     
		</React.Fragment>
	) : (
		<React.Fragment />
	);
};

export default PlayerList;
