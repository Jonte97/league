import React from "react";

const TableRowLiveGame = (props) => {
  return (
    <React.Fragment>
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
        <div></div>
      </td>
    </React.Fragment>
  );
};

export default TableRowLiveGame;
