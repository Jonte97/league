export const getChampionList = (setState) => {
	return new Promise((resolve, reject) => {
		fetch('api/LeagueApi/GetSimpleChampionList')
			.then((response) => response.json())
			.then((data) => {
				setState(data)
				resolve(data);
			})
			.catch((reason) => {
				console.log(reason);
				reject(reason);
			});
	});
};

//Get matchhistory by for player by id INPUT: accountId
export const getMatchHistory = (accountId, setState) => {
	console.log("accountid is: " + accountId);
	return new Promise((resolve, reject) => {
		fetch('api/LeagueApi/GetMatchHistory', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(accountId)
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
				console.log('success' + data.matches);
				setState(data);
			})
			.catch((reason) => {
				console.log(reason);
				reject(reason);
			});
	})
}

//Get matchById INPUT; gameId
export const getMatchById = (currentMatchId, setState) => {
	return new Promise((resolve, reject) => {
		fetch('api/LeagueApi/GetMatchById', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(currentMatchId)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("success");
				resolve(data);
				setState(data);
			})
			.catch((reason) => {
				console.log(reason);
				reject(reason);
			});
	})
}
//Get game stats for active summoner INPUT; gameId
export const getMatchDataForSummoner = (currentMatchId, summonerName, setState) => {
	let data = {
		gameId: currentMatchId,
		name: summonerName
	};

	return new Promise((resolve, reject) => {
		fetch('api/LeagueApi/GetSummonerMatchData', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
				setState(data);
				// setCurrentSummoner(data);
			})
			.catch((reason) => {
				console.log(reason);
				reject(reason);
			});
	})
}

//Get summonerspelldata and returns it
export const getSummonerSpellData = (setState) => {
	return new Promise((resolve, reject) => {
		fetch('https://ddragon.leagueoflegends.com/cdn/10.18.1/data/en_US/summoner.json')
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
				setState(data);
			})
			.catch((reason) => {
				console.log(reason);
				reject(reason);
			});
	})
}

//Get Runes reforge json file
export const getRunesData = (setState) => {
	return new Promise((resolve, reject) => {
		fetch('https://ddragon.leagueoflegends.com/cdn/10.18.1/data/en_US/runesReforged.json')
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
				setState(data);
			})
			.catch((reason) => {
				console.log(reason);
				reject(reason);
			});
	})
}

export const getItemEventsForParticipant = (setState) => {
	
	return new Promise((resolve, reject) => {
		fetch('api/LeagueApi/GetItemsTimeLine')
		.then((response) => response.json())
		.then((data) => {
				JSON.stringify(data);
				setState(data);
				resolve(data);
			})
			.catch((reason) => {
				console.log(reason);
				reject(reason);
			});
	})
}
