import React from 'react';
import { useState, useEffect } from 'react';
import Profile from './Profile/Profile';
import MatchHistory from './MatchHistoryNew/MatchHistory';
import { startLeague, startSummoner } from '../../functions/startupHelper';
import { getChampionList } from '../../functions/promiseHelper';

const MainPage = () => {
	const [leagueEntries, setLeague] = useState(startLeague);
	const [summoner, setSummoner] = useState(startSummoner);
	let test;

	const onSubmit = (data) => {
		console.log(data);
		fetch('api/LeagueApi/GetSummonerData', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((data) => {
				var json = JSON.stringify(data.leagueEntries);
				setLeague(data.leagueEntries);
				setSummoner(data.summoner);
			})
			.catch((reason) => {
				alert('Kunde ej hitta ' + data);
				console.log('ERROR fetching summoner: ' + reason);
			});
	};


	const getData = () => {
		fetch('api/LeagueApi/GetSummonerInitialData').then((response) => response.json()).then((data) => {
			var json = JSON.stringify(data.leagueEntries);
			console.log(json);
			setLeague(data.leagueEntries);
			setSummoner(data.summoner);
		});
	}

	useEffect(() => {
		async () => {
			await getData()
		}
	}, []);
	return (
		<div>
			<div className="theme-bg">
				<div className="form">
					<input
						type="text"
						name="namn"
						onChange={(event) => {
							test = event.target.value;
						}}
						onKeyDown={(event) => {
							var key = event.keyCode;
							if (key === 13) {
								onSubmit(test);
							}
						}}
					/>
					<input type="button" className="button darker-theme-bg" onClick={() => onSubmit(test)} value="Get summoner" />
				</div>
			</div>
			<Profile leagueEntries={leagueEntries} summoner={summoner} />
			{/* <MatchHistory summoner={summoner} /> replacement below */}
			<MatchHistory activeSummoner={summoner} />
		</div>
	);
};

export default MainPage;
