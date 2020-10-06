export const getChampionList = async () => {
	const response = await fetch('api/LeagueApi/GetSimpleChampionList')
	const data = await response.json();
	return data;
};
//Get summonerspelldata and returns it
export const getSummonerSpellData = async () => {
	const response = await fetch('https://ddragon.leagueoflegends.com/cdn/10.18.1/data/en_US/summoner.json')
	const data = await response.json();
	return data;
}

//Get Runes reforge json file
export const getRunesData = async () => {
	const response = await fetch('https://ddragon.leagueoflegends.com/cdn/10.18.1/data/en_US/runesReforged.json')
	const data = await response.json();
	return data;
}

//Get matchhistory by for player by id INPUT: accountId
export const getMatchHistory = async (accountId) => {
	const response = await fetch('api/LeagueApi/GetMatchHistory', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(accountId)
	})
	const data = await response.json();
	return data;
}
export const getSummoner = async (input) => {

	const response = await fetch('api/LeagueApi/GetSummonerData', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input)
	})
	const data = await response.json();
	return data;
}

//Get matchById INPUT; gameId
export const getMatchById = async (currentMatchId) => {

	const response = await fetch('api/LeagueApi/GetMatchById', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(currentMatchId)
	})
	const data = await response.json();
	return data;
}
//Get game stats for active summoner INPUT; gameId
export const getMatchDataForSummoner = async (currentMatchId, summonerName) => {
	let input = {
		gameId: currentMatchId,
		name: summonerName
	};
	const response = await fetch('api/LeagueApi/GetSummonerMatchData', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input)
	})
	const data = await response.json();
	return data;
}


//* Gets timeline data for builds and skillorder
//TODO Should fetch build and skillorder for all participants
export const getTimeLineEvents = (setItemState, setSkillState, setGraphState, participantId, gameId) => {

	let data = {
		gameId: gameId,
		participant: participantId
	};

	return new Promise((resolve, reject) => {
		fetch('api/LeagueApi/GetItemsTimeLine', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then((data) => {
				JSON.stringify(data);
				console.log(data);
				setItemState(data.items);
				setSkillState(data.skillOrder);
				setGraphState(data.graphData)
				resolve(data);
			})
			.catch((reason) => {
				reject(reason);
			});
	})
}




