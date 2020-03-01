import React from 'react';
import {useState} from 'react'

const MoreInfo = (props) => {
    const [matchInfo, setMatchInfo] = useState({})
	const getMoreInfo = (id) => {
		console.log(id);

		fetch('api/LeagueApi/GetMatchById', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ matchId: id })
		})
			.then((response) => response.json())
			.then((data) => {
				setMatchInfo(data);
			});
	};

	return (
		<div>
			<button id={props.id} onClick={() => getMoreInfo(props.id)}>
				More info
			</button>
		</div>
	);
};

export default MoreInfo;
