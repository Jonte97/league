import React from 'react';
import { useState, useEffect } from 'react';

const Participants = (props) => {
	if (Object.getOwnPropertyNames(props.participants).length > 0) {
		return (
			<tr>
				{props.participants.participants.map((Participant, key) => (
					<th key={key}>
						<a onClick={() => props.currentPlayer(Participant)} id={key}>
							{props.participants.participantIdentities[key].player.summonerName}
						</a>
					</th>
				))}
			</tr>
		);
	} else {
		{
			console.log('not true');
		}
		return <React.Fragment />;
	}
};

const GameStats = (props) => {
	if (props.player != null) {
		console.log('current player is: ' + JSON.stringify(props.player));
		return (
			<tr>
				<td>
					<p>
						Cs per minute: 0-10: {props.player.timeline.creepsPerMinDeltas['0-10']}
						<br />
						Cs per minute: 10-20: {props.player.timeline.creepsPerMinDeltas['10-20']}
						<br />
						Cs per minute: 20-30: {props.player.timeline.creepsPerMinDeltas['20-30']}
					</p>
				</td>
			</tr>
		);
	} else {
		return <React.Fragment />;
	}
};

const MoreInfo = (props) => {
	const [ matchInfo, setMatchInfo ] = useState({});
	const [ currentMatchId, setCurrentMatchId ] = useState(0);
	const [ currentPlayer, setCurrentPlayer ] = useState(null);

	useEffect(() => {}, [ currentPlayer ]);

	useEffect(
		() => {
			if (currentMatchId !== 0) {
				fetch('api/LeagueApi/GetMatchById', {
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(currentMatchId)
				})
					.then((response) => response.json())
					.then((data) => {
						setMatchInfo(data);
					});
			}
		},
		[ currentMatchId ]
	);

	return (
		<div>
			<button
				id={props.id}
				onClick={() => {
					setCurrentMatchId(props.id);
				}}
			>
				More info
			</button>
			<table>
				<thead>
					<Participants
						participants={matchInfo}
						currentPlayer={(player) => {
							console.log(player);
							setCurrentPlayer(player);
						}}
					/>
				</thead>
				<tbody>
					<GameStats player={currentPlayer} />
				</tbody>
			</table>
		</div>
	);
};

export default MoreInfo;
