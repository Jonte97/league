import React from 'react';
import { useState, useEffect } from 'react';
import PlayerList from './PlayerList';
import GameStats from './GameStats';

const Game = (props) => {
	const [ currentSummoner, setCurrentSummoner ] = useState({});
	const [ currentPlayer, setCurrentPlayer ] = useState(null);
	const [ matchInfo, setMatchInfo ] = useState();

	let data = {
		gameId: props.game.gameId,
		name: props.summoner.name
	};

	useEffect(() => {
		fetch('api/LeagueApi/GetSummonerMatchData', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((data) => {
				setCurrentSummoner(data);
			});
	}, []);

	let thumbnail = 'http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/' + props.champion.v.image.full;
	return (
		<React.Fragment>
			<div style={{ display: 'inline-flex' }}>
				<div style={{ display: 'inline-flex' }}>
					<img src={thumbnail} />
					{currentSummoner.stats ? (
						<div>
							{currentSummoner.stats.item0 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/item/${currentSummoner.stats
										.item0}.png`}
								/>
							) : null}
							{currentSummoner.stats.item1 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/item/${currentSummoner.stats
										.item1}.png`}
								/>
							) : null}
							{currentSummoner.stats.item2 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/item/${currentSummoner.stats
										.item2}.png`}
								/>
							) : null}
							{currentSummoner.stats.item3 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/item/${currentSummoner.stats
										.item3}.png`}
								/>
							) : null}
							{currentSummoner.stats.item4 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/item/${currentSummoner.stats
										.item4}.png`}
								/>
							) : null}
							{currentSummoner.stats.item5 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/item/${currentSummoner.stats
										.item5}.png`}
								/>
							) : null}
							{currentSummoner.stats.item6 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/item/${currentSummoner.stats
										.item6}.png`}
								/>
							) : null}
						</div>
					) : (
						<div />
					)}
				</div>

				{currentSummoner.stats ? (
					<React.Fragment>
						<PlayerList
							id={props.game.gameId}
							champions={props.champions}
							currentPlayer={(player) => {
								
								setCurrentPlayer(player);
							}}
							matchInfo={matchInfo}
							player={currentPlayer}
							matchInfo={matchInfo}
							setMatchInfo={(data) => {
								setMatchInfo(data);
							}}
						/>

						{/* <h4>
							{currentSummoner.stats.kills} / {currentSummoner.stats.deaths} /{' '}
							{currentSummoner.stats.assists}
						</h4> */}
					</React.Fragment>
				) : (
					<h4 />
				)}
			</div>
			<GameStats
				player={currentPlayer}
				identity={currentPlayer ? matchInfo.participantIdentities[currentPlayer.participantId - 1] : null}
			/>
		</React.Fragment>
	);
};

export default Game;
