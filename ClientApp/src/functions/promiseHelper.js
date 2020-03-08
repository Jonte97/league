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
