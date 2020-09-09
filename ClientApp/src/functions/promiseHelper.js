export const getChampionList = (setState) => {
	return new Promise((resolve, reject) => {
		fetch('api/LeagueApi/GetSimpleChampionList')
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
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
