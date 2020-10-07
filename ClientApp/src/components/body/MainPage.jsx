import React from 'react';
import { useState, useEffect } from 'react';
import Profile from './Profile/Profile';
import MatchHistory from './MatchHistoryNew/MatchHistory';
import { startLeague, startSummoner } from '../../functions/startupHelper';
import { getChampionList, getSummonerSpellData, getRunesData, getSummoner } from '../../functions/promiseHelper';

const MainPage = () => {
	const [leagueEntries, setLeague] = useState(startLeague);
	const [summoner, setSummoner] = useState(startSummoner);

	let test;
	console.log('rendering mainPage')
	const onSubmit = async(data) => {
		console.log(data);
		try {
			const summ = await getSummoner(data);
			setLeague(summ.leagueEntries);
			setSummoner(summ.summoner);
		} catch (error) {
			alert('could not find ' + data);
			console.log(error);
		}
	};

	return (
		<div>
			<div className="theme-bg">
				<div className="container">
					<div className="form">
						<input
							id="summonerSearch"
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
			</div>
			<Profile leagueEntries={leagueEntries} summoner={summoner} />
			{/* <MatchHistory summoner={summoner} /> replacement below */}
			<MatchHistory
				activeSummoner={summoner}
			/>
		</div>
	);
};

export default MainPage;
