import React, { useEffect, useState } from 'react';
import { championDictionary, getChampionAbilities, getChampionFromDictionaryById } from '../../../../functions/ChampionHelper';
import { getChampionByName as getChampionByNameAsync } from '../../../../functions/promiseHelper';


const SkillOrder = (props) => {

    const [abilities, setAbilities] = useState([]);
    useEffect(() => {
        const fetchAbilities = async () => {
            //TODO champList should be passed from parent component and come as prop
            const champList = championDictionary();
            const championSimple = getChampionFromDictionaryById(props.champion, champList);
            const champion = await getChampionByNameAsync(championSimple.id);
            const spells = getChampionAbilities(champion, championSimple.id);
            setAbilities(spells);
        }
        fetchAbilities();
    }, [props.champion]);

    let list = {
        q: [],
        w: [],
        e: [],
        r: []
    };

    for (let i = 0; i < props.skillorder.length; i++) {
        if (props.skillorder[i].skillSlot === 1) {
            list.q.push({ skill: props.skillorder[i], index: i + 1 })
        }
        else if (props.skillorder[i].skillSlot === 2) {
            list.w.push({ skill: props.skillorder[i], index: i + 1 })
        }
        else if (props.skillorder[i].skillSlot === 3) {
            list.e.push({ skill: props.skillorder[i], index: i + 1 })
        }
        else if (props.skillorder[i].skillSlot === 4) {
            list.r.push({ skill: props.skillorder[i], index: i + 1 })
        }
    }
    //TODO add styling on table
    return (
        <div className="">
            <h4>Skill order</h4>

            <table className="history-skillorder">
                <tbody>
                    <tr>
                        {abilities[0] ?
                            <React.Fragment>
                                <td className="td-noborder">
                                    Q
                                </td>
                                <td>
                                    <div>
                                        <img className="history-item-spell" title={abilities[0].name} alt={abilities[0].name} src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${abilities[0].image.full}`} />
                                    </div>
                                </td>
                            </React.Fragment>
                            : null}
                        {props.skillorder.map((lvlUp, keyLvl) =>
                            lvlUp.skillSlot === 1 ? (
                                <td className="green" key={keyLvl}>
                                    {keyLvl + 1}
                                </td>
                            ) : (
                                    <td className="blank" key={keyLvl}>
                                    </td>
                                )
                        )}
                    </tr>
                    <tr>
                        {abilities[1] ?
                            <React.Fragment>
                                <td className="td-noborder">
                                    W
                                </td>
                                <td>
                                    <div>
                                        <img className="history-item-spell" title={abilities[1].name} alt={abilities[1].name} src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${abilities[1].image.full}`} />
                                    </div>
                                </td>
                            </React.Fragment>
                            : null}

                        {props.skillorder.map((lvlUp, keyLvl) =>
                            lvlUp.skillSlot === 2 ? (
                                <td className="green" key={keyLvl}>
                                    {keyLvl + 1}
                                </td>
                            ) : (
                                    <td className="blank" key={keyLvl}>
                                    </td>
                                )
                        )}
                    </tr>
                    <tr>
                        {abilities[2] ?
                            <React.Fragment>
                                <td className="td-noborder">
                                    E
                                </td>
                                <td>
                                    <div>
                                        <img className="history-item-spell" title={abilities[2].name} alt={abilities[2].name} src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${abilities[2].image.full}`} />
                                    </div>
                                </td>
                            </React.Fragment>
                            : null}

                        {props.skillorder.map((lvlUp, keyLvl) =>
                            lvlUp.skillSlot === 3 ? (
                                <td className="green" key={keyLvl}>
                                    {keyLvl + 1}
                                </td>
                            ) : (
                                    <td className="blank" key={keyLvl}>
                                    </td>
                                )
                        )}
                    </tr>
                    <tr>
                        {abilities[3] ?
                            <React.Fragment>
                                <td className="td-noborder">
                                    R
                                </td>
                                <td>
                                    <div>
                                        <img className="history-item-spell" title={abilities[3].name} alt={abilities[3].name} src={`http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/${abilities[3].image.full}`} />
                                    </div>
                                </td>
                            </React.Fragment>
                            : null}

                        {props.skillorder.map((lvlUp, keyLvl) =>
                            lvlUp.skillSlot === 4 ? (
                                <td className="green" key={keyLvl}>
                                    {keyLvl + 1}
                                </td>
                            ) : (
                                    <td className="blank" key={keyLvl}>
                                    </td>
                                )
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default SkillOrder;