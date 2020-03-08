import React from 'react';
import { useState, useEffect } from 'react';
import './matchHistory.css';
import Game from './GameInfoHeader';

const Matches = (props) => {
	console.log(props);

	if (props.matches.matches.length !== 0) {
		return (
			<div>
				<ul>
					{props.matches.matches.map((item, i) => (
						<li key={i}>
							<div key={i} className="match-history-item">
								<Game
									champions={props.champions}
									game={item}
									champion={props.champions.find((v) => v.k == item.champion)}
									summoner={props.summoner}
								/>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	} else {
		return (
			<div>
				<ul>
					<li>No matches in matchhistory</li>
				</ul>
			</div>
		);
	}
};

const MatchHistory = (props) => {
	let matches = [];
	const [ matchHistory, setMatchHistory ] = useState({ matches });
	const [ gameInfo, setGameInfo ] = useState({});
	const [ currentMatchId, setCurrentMatchId ] = useState(0);
	const [ championList, setChampionList ] = useState([ { Data: [] } ]);

	useEffect(() => {
		fetch('api/LeagueApi/GetSimpleChampionList').then((response) => response.json()).then((data) => {
			setChampionList(data);
		});
	}, []);

	
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
						setGameInfo(data);
					});
			}
		},
		[ currentMatchId ]
	);

	const getMatchHistory = () => {
		fetch('api/LeagueApi/GetMatchHistory', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(props.summoner.accountId)
		})
			.then((response) => response.json())
			.then((data) => {
				setMatchHistory({ matches: data.matches });
				console.log('from controller: ' + matchHistory);
			});
	};

	return (
		<div className="container">
			<button onClick={() => getMatchHistory()}>Get matchhistory</button>
			<Matches matches={matchHistory} game={gameInfo} champions={championList} summoner={props.summoner} />
		</div>
	);
};

export default MatchHistory;
