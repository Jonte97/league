import React from 'react';
import { useState, useEffect } from 'react';
import Profile from './Profile/Profile';
import MatchHistory from './MatchHistoryNew/MatchHistory';
import { startLeague, startSummoner } from '../../functions/startupHelper';
import { getSummonerAsync } from '../../functions/promiseHelper';
import Header from '../header/Header'
import RankedProfile from './RankedProfileComponents/RankedProfile';

const MainPage = () => {
	const startSummonerName = "Lönnen";
	const [summoner, setSummoner] = useState(null);
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

	return (
		<div>
			{summoner ?
				<React.Fragment>
					<Header updateSummoner={getSummoner} />
					<Profile leagueEntries={summoner.leagueEntries} summoner={summoner.summoner} />
					<RankedProfile summoner={summoner} />
					<MatchHistory
						activeSummoner={summoner.summoner}
					/>
				</React.Fragment>
				: null
			}
		</div>
	);
};

export default MainPage;
