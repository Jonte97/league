import React from 'react';

const TableData = (props) => {
	//TODO change colors if stats are good/bad
	if (props.timeline != null) {
		return (
			<td>
				{props.timeline['0-10'] ? parseFloat(props.timeline['0-10'].toFixed(props.toFixed)) : 0}
				<br />
				{props.timeline['10-20'] ? parseFloat(props.timeline['10-20'].toFixed(props.toFixed)) : 0}
				<br />
				{props.timeline['20-30'] ? parseFloat(props.timeline['20-30'].toFixed(props.toFixed)) : 0}
			</td>
		);
	} else {
		return (
			<td>
				N/A
				<br />
				N/A
				<br />
				N/A
			</td>
		);
	}
};

const GameStats = (props) => {
	console.log('GameStats: ' + props.player);
	if (props.player != null) {
		return (
			<React.Fragment>
				<table style={{ width: '100%' }}>
					<thead>
						<tr>
							<th>Stats per 10 min</th>
							<th>Cs</th>
							<th>Gold</th>
							<th>XP</th>
							<th>Cs diff</th>
							<th>XP diff</th>
							<th>Dmg dealt</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								0-10
								<br />
								10-20
								<br />
								20-30
							</td>
							<TableData timeline={props.player.timeline.creepsPerMinDeltas} toFixed={1} />
							<TableData timeline={props.player.timeline.goldPerMinDeltas} toFixed={0} />
							<TableData timeline={props.player.timeline.xpPerMinDeltas} toFixed={0} />
							<TableData timeline={props.player.timeline.csDiffPerMinDeltas} toFixed={1} />
							<TableData timeline={props.player.timeline.xpDiffPerMinDeltas} toFixed={0} />
							<td style={{ textAlign: 'left' }}>
								total:
								{props.player.stats.totalDamageDealtToChampions}
								<br /> physical:
								{props.player.stats.physicalDamageDealtToChampions}
								<br /> magic:
								{props.player.stats.magicDamageDealtToChampions}
								<br /> true:
								{props.player.stats.trueDamageDealtToChampions}
							</td>
						</tr>
					</tbody>
				</table>
				<style
				>{`table{border:1px solid black; font-size: 1.5em; text-align: center} td, th{padding:0em 1em 1em 1em;}`}</style>
			</React.Fragment>
		);
	} else {
		return <React.Fragment />;
	}
};

export default GameStats;
