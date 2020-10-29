import React, { useEffect, useState } from "react";
import { getQueueTitle } from "../../../functions/GameModeHelper";
import { getQueues } from "../../../functions/promiseHelper";
import { getReadableTimestampFromSeconds } from "../../../functions/TimeStampHelper";

const MatchItemHeader = (props) => {
  const [headerState, setHeaderState] = useState(null);
  useEffect(() => {
    const setup = async () => {
      const queues = await getQueues();
      const q = queues.find((obj) => obj.queueId == props.matchInfo.queueId);
      const queueTitle = getQueueTitle(q);

      const gameDuration = getReadableTimestampFromSeconds(
        props.matchInfo.gameDuration
      );

      const creationDate = new Date(props.matchInfo.gameCreation);

      setHeaderState({
        gameDuration: gameDuration,
        queueTitle: queueTitle,
        creation: creationDate.toLocaleDateString(),
      });
    };

    setup();
  }, []);

  return (
    <div className="match-history-top">
      <div className="match-hisrotry-top-gamemode"></div>
      {headerState && (
        <React.Fragment>
          <span className="match-header-title">{headerState.queueTitle}</span>
          <span className="match-header-duration greyed-text">
            {headerState.gameDuration}
          </span>
          <span className="match-header-duration greyed-text">
            {headerState.creation}
          </span>
        </React.Fragment>
      )}
    </div>
  );
};

export default MatchItemHeader;
