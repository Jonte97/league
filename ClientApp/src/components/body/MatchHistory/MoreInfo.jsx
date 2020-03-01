import React from 'react';
import { useState } from 'react';

const Participants = (props) => {
	console.log(props);
	if (Object.getOwnPropertyNames(props.participants).length > 0) {
		return (
			<React.Fragment>
				{props.participants.participants.map((Participant, key) => (
					<React.Fragment key={key}>
						<tr>
							<td>
								<h4>{props.participants.participantIdentities[key].player.summonerName}</h4>
							</td>
						</tr>
						<tr>
							<td>
								<p>Cs per minute: 0-10: {Participant.timeline.creepsPerMinDeltas['0-10']}</p>
								<p>Cs per minute: 10-20: {Participant.timeline.creepsPerMinDeltas['10-20']}</p>
								<p>Cs per minute: 20-30: {Participant.timeline.creepsPerMinDeltas['20-30']}</p>
							</td>
						</tr>
					</React.Fragment>
				))}
			</React.Fragment>
		);
	} else {
		{
			console.log('not true');
		}
		return <div />;
	}
};

const MoreInfo = (props) => {
	const [ matchInfo, setMatchInfo ] = useState({});

	const getMoreInfo = (id) => {
		console.log(id);

		fetch('api/LeagueApi/GetMatchById', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(id)
		})
			.then((response) => response.json())
			.then((data) => {
				setMatchInfo(data);
			});
	};

	console.log(matchInfo);
	return (
		<div>
			<button id={props.id} onClick={() => getMoreInfo(props.id)}>
				More info
			</button>
			<table>
				<tbody>
					<Participants participants={matchInfo} />
				</tbody>
			</table>
		</div>
	);
};

export default MoreInfo;
