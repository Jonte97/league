import React from "react";
import { useState, useEffect } from "react";
import { livegame, livegameUnranked } from "../../TestFiles/livegame";
import LiveGame from "../LiveGame/LiveGame";
import { getLiveGame } from "../../functions/promiseHelper";
import Loader from "react-spinners/BarLoader";

const LiveGameComponent = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [summoner, setSummoner] = useState(null);
  useEffect(() => {
    const setup = async () => {
      setSummoner(props.summoner);
    };
    setup();
  }, [props.summoner]);

  const fetchGame = async () => {
    if (summoner != null) {
      const game = await getLiveGame(summoner.id);
      //!For testing only should fetch by above
      //! Below for testing livegame
      //const game = livegameUnranked;
      if (game != null) {
        return game;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  const [liveGame, setLiveGame] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const game = await fetchGame();
      setLiveGame(game);
    };
    if (summoner != null) setup();
  }, []);
  useEffect(() => {
    const setup = async () => {
      const game = await fetchGame();
      setLiveGame(game);
    };
    setLiveGame(null);
    if (summoner != null) setup();
  }, [summoner]);

  const [fetchLiveGame, setFetchLiveGame] = useState(false);
  useEffect(() => {
    setFetchLiveGame(false);
  }, [summoner]);
  const handleClick = () => {
    const getGame = async () => {
      const game = await fetchGame(summoner.id);
      setLiveGame(game);
    };
    if (!fetchLiveGame) {
      setIsLoading(true);
      setFetchLiveGame(true);
      getGame();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else setFetchLiveGame(false);
  };
  return (
    <React.Fragment>
      <div className="livegame-button-wrapper">
        <button
          onClick={handleClick}
          className={liveGame ? "glow-on-hover glow" : "glow-on-hover "}
          type="button"
        >
          {!fetchLiveGame ? (liveGame ? "Now in game" : "In game?") : "Close"}
        </button>
      </div>
      <div
        className="live-wrap"
        style={fetchLiveGame ? {} : { display: "none" }}
      >
        {fetchLiveGame ? (
          isLoading ? (
            <Loader />
          ) : liveGame ? (
            <LiveGame
              summoner={summoner}
              livegame={liveGame}
              ddragon={props.ddragon}
              gameReferences={props.gameReferences}
              summoner={props.summoner}
            />
          ) : (
            <div className="not-in-game-wrapper container">
              <div className="not-in-game-msg">
                <div>
                  {summoner.name} does not seem to be in a game at the moment :(
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default LiveGameComponent;
