//TODO Move all api requests to this file

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
export const getSummonerAsync = async (input) => {

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
export const getTimeLineEvents = async (participantId, gameId) => {

	let input = {
		gameId: gameId,
		participant: participantId
	};
	const response = await fetch('api/LeagueApi/GetItemsTimeLine', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input)
	})
	const data = await response.json();

	return data;
}

export const getItemListAsync = async (patch) => {
	const response = await fetch('https://ddragon.leagueoflegends.com/cdn/10.20.1/data/en_US/item.json')
	const data = await response.json();

	return data;
}

export const getMostPlayedChampionsRanked = async (entries, accountId) => {
	const input = {
		entries: entries,
		accountId: accountId
	}
	const response = await fetch('api/LeagueApi/GetMostChampPlayedRanked', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input)
	})
	if (response.status !== 200) {
		return null;	
	}
	const data = await response.json();
	return data;
}

