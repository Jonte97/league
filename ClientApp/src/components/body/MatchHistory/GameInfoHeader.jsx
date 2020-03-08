import React from 'react';
import { useState, useEffect } from 'react';
import MoreInfo from './MoreInfo';
import PlayerList from './PlayerList';

const GameInfoHeader = (props) => {
	const [ currentSummoner, setCurrentSummoner ] = useState({});

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

	let thumbnail = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/' + props.champion.v.image.full;
	return (
		<React.Fragment>
			<div style={{display: "inline-flex"}}>
				<div style={{display: "inline-flex"}}>
					<img src={thumbnail} />
					{currentSummoner.stats ? (
						<div>
							{currentSummoner.stats.item0 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats
										.item0}.png`}
								/>
							) : null}
							{currentSummoner.stats.item1 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats
										.item1}.png`}
								/>
							) : null}
							{currentSummoner.stats.item2 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats
										.item2}.png`}
								/>
							) : null}
							{currentSummoner.stats.item3 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats
										.item3}.png`}
								/>
							) : null}
							{currentSummoner.stats.item4 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats
										.item4}.png`}
								/>
							) : null}
							{currentSummoner.stats.item5 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats
										.item5}.png`}
								/>
							) : null}
							{currentSummoner.stats.item6 ? (
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats
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
						<PlayerList id={props.game.gameId} champions={props.champions} />
						{/* <h4>
							{currentSummoner.stats.kills} / {currentSummoner.stats.deaths} /{' '}
							{currentSummoner.stats.assists}
						</h4> */}
					</React.Fragment>
				) : (
					<h4 />
				)}
			</div>
		</React.Fragment>
	);
};

export default GameInfoHeader;
