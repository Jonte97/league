import React, { useEffect, useState } from 'react';

const Overview = (props) => {

    const [players, setPlayers] = useState(null);
    useEffect(() => {
        setPlayers(props.participantList)

    }, [props.participantList]);

    const redTeam = [];
    const blueTeam = [];
    let missingIdsRed = []
    let missingIdsBlue = []

    const getLanes = (arr, team, missing) => {
        if (players != null) {
            const top = players.find((obj) => { return obj.teamId === team && obj.timeline.lane === "TOP" });
            if (top != undefined) {
                arr.push(top)
            }
            const jungle = players.find((obj) => { return obj.teamId === team && obj.timeline.lane === "JUNGLE" });
            if (jungle != undefined) {
                arr.push(jungle)
            }
            const mid = players.find((obj) => { return obj.teamId === team && obj.timeline.lane === "MIDDLE" });
            if (mid != undefined) {
                arr.push(mid)
            }
            const adc = players.find((obj) => { return obj.teamId === team && obj.timeline.lane === "BOTTOM" && obj.timeline.role === "DUO_CARRY" });
            if (adc != undefined) {
                arr.push(adc)
            }
            const supp = players.find((obj) => { return obj.teamId === team && obj.timeline.lane === "BOTTOM" && obj.timeline.role === "DUO_SUPPORT" });
            if (supp != undefined) {
                arr.push(supp)
            }

            if (team === 100) {
                for (let i = 1; i < 6; i++) {
                    const exist = arr.find((obj) => { return obj.participantId === i });
                    if (exist == undefined) {
                        missing.push(i)
                    }
                }
            }
            else {
                for (let i = 6; i < 11; i++) {
                    const exist = arr.find((obj) => { return obj.participantId === i });
                    if (exist == undefined) {
                        missing.push(i);
                    }
                }
            }
        }
    }
    const fillBlankSpots = (missing, arr) => {
        missing.forEach(playerId => {
            const missingPlayer = players.find((obj) => { return obj.participantId === playerId })
            arr.push(missingPlayer);
        });
    }

    getLanes(redTeam, 200, missingIdsRed);
    getLanes(blueTeam, 100, missingIdsBlue);
    fillBlankSpots(missingIdsBlue, blueTeam)
    fillBlankSpots(missingIdsRed, redTeam)

    return (
        <div>
            <table>
                <thead>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    )
}
export default Overview;