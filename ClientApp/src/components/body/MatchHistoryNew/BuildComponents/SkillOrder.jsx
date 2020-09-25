import React from 'react';

const SkillOrder = (props) => {

    let count = props.skillorder.length;

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
        <div>
            <h3>Skill order</h3>
            <table className="history-skillorder">
                <thead>
                    <tr>
                        <th>Level</th>
                        {props.skillorder.map((lvlUp, key) =>
                            <th>{key + 1}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Q</td>
                        {props.skillorder.map((lvlUp, keyLvl) =>
                            lvlUp.skillSlot === 1 ? (
                                <td className="green" key={keyLvl}>
                                </td>
                            ) : (
                                    <td className="blank" key={keyLvl}>
                                    </td>
                                )
                        )}
                    </tr>
                    <tr>
                        <td>W</td>
                        {props.skillorder.map((lvlUp, keyLvl) =>
                            lvlUp.skillSlot === 2 ? (
                                <td className="green" key={keyLvl}>
                                </td>
                            ) : (
                                    <td className="blank" key={keyLvl}>
                                    </td>
                                )
                        )}
                    </tr>
                    <tr>
                        <td>E</td>
                        {props.skillorder.map((lvlUp, keyLvl) =>
                            lvlUp.skillSlot === 3 ? (
                                <td className="green" key={keyLvl}>
                                </td>
                            ) : (
                                    <td className="blank" key={keyLvl}>
                                    </td>
                                )
                        )}
                    </tr>
                    <tr>
                        <td>R</td>
                        {props.skillorder.map((lvlUp, keyLvl) =>
                            lvlUp.skillSlot === 4 ? (
                                <td className="green" key={keyLvl}>
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