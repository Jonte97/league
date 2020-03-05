import React from 'react';
import { useState, useEffect } from 'react';

const Participants = (props) => {
	if (Object.getOwnPropertyNames(props.participants).length > 0) {
		return (
			<div style={{ textAlign: 'center', fontSize: '1em' }}>
				{props.participants.participants.map((Participant, key) => (
					<a
						style={{ marginLeft: '1em' }}
						key={key}
						onClick={() => props.currentPlayer(Participant)}
						id={key}
					>
						{props.participants.participantIdentities[key].player.summonerName}
					</a>
				))}
			</div>
		);
	} else {
		return <React.Fragment />;
	}
};
const TableData = (props) => {
	//TODO change colors if stats are good/bad
	if (props.timeline != null) {
		return (
			<td>
				{props.timeline['0-10'] ? parseFloat(props.timeline['0-10'].toFixed(props.toFixed)) : 0}
				<br />
				{props.timeline['10-20'] ? parseFloat(props.timeline['10-20'].toFixed(props.toFixed)) : 0}
				<br />
				{props.timeline['20-30'] ? parseFloat(props.timeline['20-30'].toFixed(props.toFixed)) : 0}
			</td>
		);
	} else {
		return (
			<td>
				N/A
				<br />
				N/A
				<br />
				N/A
			</td>
		);
	}
};

const GameStats = (props) => {
	if (props.player != null) {
		console.log(props.identity);
		return (
			<React.Fragment>
				<div style={{marginTop: "1em"}}>
					<h3 style={{float: "left", marginTop: "2em", marginLeft: "30%"}}>
						{props.identity.player.summonerName} {props.player.timeline.lane}
					</h3>
					<img style={{float: "right", padding: "1em"}} src="http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/Aatrox.png" />
				</div>
				<table style={{width: "100%"}}>
					<thead>
						<tr>
							<th>Stats per 10 min</th>
							<th>Cs</th>
							<th>Gold</th>
							<th>XP</th>
							<th>Cs diff</th>
							<th>XP diff</th>
							<th>Dmg dealt</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								0-10
								<br />
								10-20
								<br />
								20-30
							</td>
							<TableData timeline={props.player.timeline.creepsPerMinDeltas} toFixed={1} />
							<TableData timeline={props.player.timeline.goldPerMinDeltas} toFixed={0} />
							<TableData timeline={props.player.timeline.xpPerMinDeltas} toFixed={0} />
							<TableData timeline={props.player.timeline.csDiffPerMinDeltas} toFixed={1} />
							<TableData timeline={props.player.timeline.xpDiffPerMinDeltas} toFixed={0} />
							<td style={{textAlign: "left"}}>
								physical:{props.player.stats.physicalDamageDealtToChampions}
								<br /> magic:
								{props.player.stats.magicDamageDealtToChampions}
								<br /> true:
								{props.player.stats.trueDamageDealtToChampions}
								<br /> total:
								{props.player.stats.totalDamageDealtToChampions}
							</td>
						</tr>
					</tbody>
				</table>
				<style
				>{`table{border:1px solid black; font-size: 1.5em; text-align: center} td, th{padding:0em 1em 1em 1em;}`}</style>
			</React.Fragment>
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

	console.log(matchInfo);
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
			<Participants
				participants={matchInfo}
				currentPlayer={(player) => {
					setCurrentPlayer(player);
				}}
			/>
			<GameStats
				player={currentPlayer}
				identity={currentPlayer ? matchInfo.participantIdentities[currentPlayer.participantId - 1] : null}
			/>
		</div>
	);
};

export default MoreInfo;
