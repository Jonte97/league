import React from 'react';
import { useState, useEffect } from 'react';
import Profile from './Profile/Profile';
import MatchHistory from './MatchHistory/MatchHistory';
import { startLeague, startSummoner } from '../../functions/startupHelper';
import { getChampionList } from '../../functions/promiseHelper';

const Body = () => {
	const [ leagueEntries, setLeague ] = useState(startLeague);
	const [ summoner, setSummoner ] = useState(startSummoner);
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
				alert('asdasdasda');
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
			<input
				type="text"
				name="namn"
				onChange={(e) => {
					test = e.target.value;
				}}
			/>
			<input type="button" onClick={() => onSubmit(test)} value="Get summoner" />
			<Profile leagueEntries={leagueEntries} summoner={summoner} />
			<MatchHistory summoner={summoner} />
		</div>
	);
};

export default Body;
