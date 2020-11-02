import React, { useEffect, useState } from "react";
import {
  championDictionary,
  getChampionAbilities,
  getChampionFromDictionaryById,
  getChampionPassive,
} from "../../../../functions/ChampionHelper";
import { getChampionByNameAsync } from "../../../../functions/promiseHelper";
import { patch } from "../../../../TestFiles/Configuration";

const SkillsBuild = (props) => {
  const [abilities, setAbilities] = useState();
  useEffect(() => {
    const fetchAbilities = async () => {
      //TODO champList should be passed from parent component and come as prop
      const champList = championDictionary();
      const championSimple = getChampionFromDictionaryById(
        props.champion,
        champList
      );
      const champion = await getChampionByNameAsync(championSimple.id);
      const spells = getChampionAbilities(champion, championSimple.id);
      const passive = getChampionPassive(champion, championSimple.id);

      setAbilities({ spells: spells, passive: passive });
    };
    fetchAbilities();
  }, [props.champion]);
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (abilities != null) {
      setActive(abilities.passive);
    }
  }, [abilities]);

  const imgStyle = (id) => {
    if (id != active) return { filter: "grayscale(1)" };
    else return null;
  };

  return (
    <div>
      <div>
        {abilities && (
          <React.Fragment>
            <div id="skills" style={{ display: "flex" }}>
              <div id="passive">
                <img
                  style={imgStyle(abilities.passive)}
                  onClick={() => setActive(abilities.passive)}
                  alt="passive"
                  className="thumbnail-build"
                  src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/passive/${abilities.passive.image.full}`}
                />
              </div>
              <div>
                {abilities.spells.map((spell, key) => (
                  <img
                    style={imgStyle(spell)}
                    onClick={() => setActive(spell)}
                    key={key}
                    className="thumbnail-build"
                    id={`spell${key}`}
                    alt="spell-1"
                    src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${spell.image.full}`}
                  />
                ))}
              </div>
            </div>
            {active && (
              <div className="skills-info">
                <div style={{marginBottom: "0.5em"}}>
                  <span>{active.name}</span>
                </div>
                <div>{active.description}</div>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default SkillsBuild;
