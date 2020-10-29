import React, { useEffect, useState } from "react";
import { getQueues } from "../../../functions/promiseHelper";
import { getReadableTimestampFromSeconds } from "../../../functions/TimeStampHelper";

const MatchItemHeader = (props) => {
  const [headerState, setHeaderState] = useState(null);
  useEffect(() => {
    const setup = async () => {
			const queues = await getQueues();
			const q = queues.find((obj) => obj.queueId == props.matchInfo.queueId);
			console.log(q)
      const gameDuration = getReadableTimestampFromSeconds(
        props.matchInfo.gameDuration
      );

      setHeaderState({ gameDuration: gameDuration });
    };

    setup();
  }, []);

  return (
    <div className="match-history-top">
      <div className="match-hisrotry-top-gamemode"></div>
      {headerState && <span>{headerState.gameDuration}</span>}
    </div>
  );
};

export default MatchItemHeader;
