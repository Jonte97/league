import React from 'react';
import { useState, useEffect } from 'react';
import Profile from './Profile/Profile';
import MatchHistory from './MatchHistoryNew/MatchHistory';
import { startLeague, startSummoner } from '../../functions/startupHelper';
import { getChampionList, getSummonerSpellData, getRunesData, getSummonerAsync } from '../../functions/promiseHelper';
import Header from '../header/Header'

const MainPage = () => {
	const startSummonerName = "Lönnen";
	const [summoner, setSummoner] = useState({ summoner: startSummoner, leagueEntries: startLeague });
	useEffect(() => {
		const getSumm = async () => {
			const fetched = await getSummonerAsync(startSummonerName)
			setSummoner({ summoner: fetched.summoner, leagueEntries: fetched.leagueEntries });
		}
		getSumm();
	}, [])

	const getSummoner = async (name) => {
		const fetched = await getSummonerAsync(name);
		setSummoner({ summoner: fetched.summoner, leagueEntries: fetched.leagueEntries });
	}

	// const onSubmit = async (data) => {
	// 	console.log(data);
	// 	try {
	// 		const summ = await getSummoner(data);
	// 		setLeague(summ.leagueEntries);
	// 		setSummoner(summ.summoner);
	// 	} catch (error) {
	// 		alert('could not find ' + data);
	// 		console.log(error);
	// 	}
	// };

	return (
		<div>
			<Header updateSummoner={getSummoner} />
			<Profile leagueEntries={summoner.leagueEntries} summoner={summoner.summoner} />
			<MatchHistory
				activeSummoner={summoner.summoner}
			/>
		</div>
	);
};

export default MainPage;
