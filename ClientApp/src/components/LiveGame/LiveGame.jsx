import React, { useEffect, useState } from "react";
import {
  getLiveGame,
  getSummonerByNameAsync,
} from "../../functions/promiseHelper";
import { livegame } from "../../TestFiles/livegame";

const LiveGame = ({ match }) => {
  const SummonerName = match.params.userId;
  const [summoner, setSummoner] = useState(null);
  useEffect(() => {
    const setup = async () => {
      const player = await getSummonerByNameAsync(SummonerName);
      setSummoner(player);
    };
    setup();
  }, [SummonerName]);

  const [liveGame, setLiveGame] = useState(null);
  useEffect(() => {
    const setup = async () => {
      //const game = await getLiveGame(summoner.id);
      //!For testing only should fetch by above
      const game = livegame;
      setLiveGame(game);
    };
    if (summoner != null) setup();
  }, [summoner]);
  return (
    <div className="container">
      <div className="livegame-table">
        <table>
          <thead>
            <tr>
              <td>test</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveGame;
