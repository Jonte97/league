import React from 'react';
import { useState, useEffect } from 'react';
import MoreInfo from './MoreInfo';

const GameInfoHeader = (props) => {
	const [ matchInfo, setMatchInfo ] = useState({});
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

	const getGame = (id) => {
		fetch('api/LeagueApi/GetMatchById', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(id)
		})
			.then((response) => response.json())
			.then((data) => {
				setMatchInfo(data);
				console.log(matchInfo);
			})
			.catch((reason) => {
				console.log(reason);
			});
	};

	let thumbnail = 'http://ddragon.leagueoflegends.com/cdn/10.4.1/img/champion/' + props.champion.v.image.full;
	return (
		<React.Fragment>
			<div style={{  }}>
				<img src={thumbnail} />
				<button onClick={() => getGame(props.game.gameId)}>Get match</button>
				{currentSummoner.stats ? (
					<h4 style={{display: "inline-block"}}>
						{currentSummoner.stats.kills} / {currentSummoner.stats.deaths} / {currentSummoner.stats.assists}
					</h4>
				) : (
					<h4 />
				)}
				{currentSummoner.stats ? (
					<div style={{float: "right"}}>
						{currentSummoner.stats.item0 ? (
							<img src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats.item0}.png`} />
						) : null}
						{currentSummoner.stats.item1 ? (
							<img src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats.item1}.png`} />
						) : null}
						{currentSummoner.stats.item2 ? (
							<img src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats.item2}.png`} />
						) : null}
						{currentSummoner.stats.item3 ? (
							<img src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats.item3}.png`} />
						) : null}
						{currentSummoner.stats.item4 ? (
							<img src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats.item4}.png`} />
						) : null}
						{currentSummoner.stats.item5 ? (
							<img src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats.item5}.png`} />
						) : null}
						{currentSummoner.stats.item6 ? (
							<img src={`http://ddragon.leagueoflegends.com/cdn/10.5.1/img/item/${currentSummoner.stats.item6}.png`} />
						) : null}
					</div>
				) : (
					<div />
				)}
			</div>
		</React.Fragment>
	);
};

export default GameInfoHeader;
