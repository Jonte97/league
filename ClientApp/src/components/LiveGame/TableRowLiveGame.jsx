import React, { useEffect, useState } from "react";
import {
  getLeagueEntries,
  getSummonerByNameAsync,
} from "../../functions/promiseHelper";
import { getEmblem } from "../../functions/RankedEmblemHelper";
import { getRuneFromId, getRunePathById } from "../../functions/RunesHelper";
import RankDisplay from "./RankDisplay";
import RuneTree from "./RuneTree";

const TableRowLiveGame = (props) => {
  const [runes, setRunes] = useState(null);
  useEffect(() => {
    const setup = () => {
      const primaryPath = getRunePathById(props.player.perks.perkStyle);
      const secondaryPath = getRunePathById(props.player.perks.perkSubStyle);
      const keystone = getRuneFromId(
        props.player.perks.perkIds[0],
        primaryPath,
        0
      );
      setRunes({ keystone: keystone, secondaryPath: secondaryPath });
    };
    setup();
  }, []);

  const [showRunes, setShowRunes] = useState(false);

  const prependUrl = "https://ddragon.leagueoflegends.com/cdn/img/";
  const handleClick = () => {
    if (!showRunes) setShowRunes(true);
    else setShowRunes(false);
  };
  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="livegame-thumb-wrapper">
            <img
              className="livegame-thumb-img"
              src={props.champThumbnail}
              alt=""
            />
          </div>
        </td>
        <td>
          <div className="summoner-spells-wrapper">
            <img
              alt="Summonerspell 1"
              src={`https://ddragon.leagueoflegends.com/cdn/${props.version}/img/spell/${props.spell1.image.full}`}
            />
            <img
              alt="summonerspell 2"
              src={`https://ddragon.leagueoflegends.com/cdn/${props.version}/img/spell/${props.spell2.image.full}`}
            />
          </div>
        </td>
        <td>
          {runes && (
            <div className="runes">
              <img
                className="keystone"
                src={`${prependUrl}${runes.keystone.icon}`}
                alt=""
              />
              <img
                className="secondary"
                src={`${prependUrl}${runes.secondaryPath.icon}`}
                alt=""
              />
            </div>
          )}
        </td>
        <td className="livegame-summonername">{props.player.summonerName}</td>
        <RankDisplay player={props.player} />
        <td>
          <div onClick={handleClick} className="runes-btn">
            <div>Runes</div>
          </div>
        </td>
      </tr>
      {showRunes && (
        <tr className="runes-page">
          <td colSpan="12">
            <RuneTree
              runes={props.runesRefs}
              selectedRunes={props.player.perks.perkIds}
              primaryPathId={props.player.perks.perkStyle}
              secondaryPath={runes.secondaryPath}
            />
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default TableRowLiveGame;
