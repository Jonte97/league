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
			setActive(abilities.passive)
		}
	}, [abilities]);

  const imgStyle = (id) => {

	};

  return (
    <div>
      {abilities && (
        <React.Fragment>
          <div style={{ display: "inline-flex" }}>
            <div id="passive">
              <img
								onClick={() => setActive(abilities.passive)}
                alt="passive"
                src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/passive/${abilities.passive.image.full}`}
              />
            </div>
            <div>
              {abilities.spells.map((spell, key) => (
                <img
									onClick={() => setActive(spell)}
									key={key}
									id={`spell${key}`}
                  alt="spell-1"
                  src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${spell.image.full}`}
                />
              ))}
            </div>
          </div>
          {active && <div>{active.description}</div>}
        </React.Fragment>
      )}
    </div>
  );
};

export default SkillsBuild;
