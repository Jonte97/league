import React from 'react';
import StatModsAdaptiveForceIcon from '../../../../img/StatMods/StatModsAdaptiveForceIcon.png';
import StatModsArmorIcon from '../../../../img/StatMods/StatModsArmorIcon.png';
import StatModsAttackSpeedIcon from '../../../../img/StatMods/StatModsAttackSpeedIcon.png';
import StatModsCDRScalingIcon from '../../../../img/StatMods/StatModsCDRScalingIcon.png';
import StatModsHealthScalingIcon from '../../../../img/StatMods/StatModsHealthScalingIcon.png';
import StatModsMagicResIcon from '../../../../img/StatMods/StatModsMagicResIcon.png';



const RuneSetup = (props) => {

    let primaryRunePath = props.runes.find((obj) => { return obj.id === props.stats.perkPrimaryStyle });
    let secondaryRunePath = props.runes.find((obj) => { return obj.id === props.stats.perkSubStyle })
    let selectedPrimaryRunes = [];
    console.log(primaryRunePath.slots)

    for (let i = 0; i < primaryRunePath.slots.length; i++) {
        let slot = primaryRunePath.slots[i]
        for (let index = 0; index < slot.runes.length; index++) {
            let perk0 = primaryRunePath.slots[i].runes.find((obj) => { return obj.id === props.stats.perk0 });
            if (perk0 != null) {
                perk0.id === slot.runes[index].id ?
                    slot.runes[index].chosen = true
                    :
                    slot.runes[index].chosen = false;
            }
            let perk1 = primaryRunePath.slots[i].runes.find((obj) => { return obj.id === props.stats.perk1 });
            if (perk1 != null) {
                perk1.id === slot.runes[index].id ?
                    slot.runes[index].chosen = true
                    :
                    slot.runes[index].chosen = false;
            }
            let perk2 = primaryRunePath.slots[i].runes.find((obj) => { return obj.id === props.stats.perk2 });
            if (perk2 != null) {
                perk2.id === slot.runes[index].id ?
                    slot.runes[index].chosen = true
                    :
                    slot.runes[index].chosen = false;
            }
            let perk3 = primaryRunePath.slots[i].runes.find((obj) => { return obj.id === props.stats.perk3 });
            if (perk3 != null) {
                perk3.id === slot.runes[index].id ?
                    slot.runes[index].chosen = true
                    :
                    slot.runes[index].chosen = false;

            }
        }
        selectedPrimaryRunes.push(slot);
    }



    let selectedSecondaryRunes = [];
    let first = false;
    let second = false;

    for (let i = 1; i < secondaryRunePath.slots.length; i++) {
        let slot = secondaryRunePath.slots[i]
        for (let index = 0; index < slot.runes.length; index++) {
            if (!first) {
                let result = secondaryRunePath.slots[i].runes.find((obj) => { return obj.id === props.stats.perk4 });
                if (result != null) {
                    slot.runes[index].chosen = true;
                    first = true;
                }
                else {
                    slot.runes[index].chosen = false;
                }
            }
            else if (!second) {
                let result = (secondaryRunePath.slots[i].runes.find((obj) => { return obj.id === props.stats.perk5 }));
                if (result != null) {
                    slot.runes[index].chosen = true;
                    second = true;
                }
                else {
                    slot.runes[index].chosen = false;
                }
            }
            else {
                slot.runes[index].chosen = false;
            }
        }
        selectedSecondaryRunes.push(slot);
    }

    let prependUrl = "https://ddragon.leagueoflegends.com/cdn/img/";

    console.log("perk 1" + JSON.stringify(selectedPrimaryRunes, 4, null))



    let statRunes = [];
    const getStatRune = (id) => {
        switch (id) {
            case 5001:
                return StatModsHealthScalingIcon;
            case 5002:
                return StatModsArmorIcon;
            case 5003:
                return StatModsMagicResIcon;
            case 5005:
                return StatModsAttackSpeedIcon;
            case 5007:
                return StatModsCDRScalingIcon;
            case 5008:
                return StatModsAdaptiveForceIcon;
            default:
                return null;
        }
    }
    statRunes.push(getStatRune(props.stats.statPerk0));
    statRunes.push(getStatRune(props.stats.statPerk1));
    statRunes.push(getStatRune(props.stats.statPerk2));

    return (
        <div>
            <h4>Runes</h4>

            <div className="history-item-runesetup-holder">
                <div>
                    <div>
                        <div className="img-center">
                            <img className="history-item-rune-primary-img" title={primaryRunePath.name} src={`${prependUrl}${primaryRunePath.icon}`} />
                        </div>
                    </div>
                    {selectedPrimaryRunes.map((slot, index) =>
                        <div className="rune-row" key={index}>
                            {slot.runes.map((rune, key) =>
                                rune.chosen === true ?
                                    <img key={key} className="history-item-rune-img" title={rune.name}
                                        src={`${prependUrl}${rune.icon}`} />
                                    :
                                    <img key={key} className="history-item-rune-img greyscale" title={rune.name}
                                        src={`${prependUrl}${rune.icon}`} />
                            )
                            }
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <div className="img-center">
                            <img className="history-item-rune-secondary-img" title={secondaryRunePath.name} src={`${prependUrl}${secondaryRunePath.icon}`} />
                        </div>
                    </div>
                    {
                        selectedSecondaryRunes.map((slot, index) =>
                            <div className="rune-row" key={index}>
                                {slot.runes.map((rune, key) =>
                                    rune.chosen === true ?
                                        <img key={key} className="history-item-rune-img" title={rune.name}
                                            src={`${prependUrl}${rune.icon}`} />
                                        :
                                        <img key={key} className="history-item-rune-img greyscale" title={rune.name}
                                            src={`${prependUrl}${rune.icon}`} />
                                )
                                }
                            </div>
                        )
                    }
                    <div className="rune-row">
                        {
                            statRunes.map((stat, key) =>
                                <img src={stat} key={key} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RuneSetup;