export const getChampionList = (setState) => {
	return new Promise((resolve, reject) => {
		fetch('api/LeagueApi/GetSimpleChampionList')
			.then((response) => {
				if (response.status == 200) {
					console.log("success")					
				} else {
					reject(response);
				}
			})
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
