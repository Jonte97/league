import React from 'react';
import { useState } from 'react';
import './matchHistory.css';
import MoreInfo from './MoreInfo';

const Matches = (matches) => {
	console.log(matches.matches.matches.length);
	if (matches.matches.matches.length != 0) {
		return (
			<div>
				<ul>
					{matches.matches.matches.map((item, i) => (
						<li key={i}>
							<div key={i} className="match-history-item">
								<p>Role: {item.role}</p>
								<p>Lane: {item.lane}</p>
								<MoreInfo id={item.gameId} />
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
			<Matches matches={matchHistory} />
		</div>
	);
};

export default MatchHistory;
