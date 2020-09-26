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
    selectedPrimaryRunes.push(
        primaryRunePath.slots[0].runes.find((obj) => { return obj.id === props.stats.perk0 })
    );
    selectedPrimaryRunes.push(
        primaryRunePath.slots[1].runes.find((obj) => { return obj.id === props.stats.perk1 })
    );
    selectedPrimaryRunes.push(
        primaryRunePath.slots[2].runes.find((obj) => { return obj.id === props.stats.perk2 })
    );
    selectedPrimaryRunes.push(
        primaryRunePath.slots[3].runes.find((obj) => { return obj.id === props.stats.perk3 })
    );

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
                    <img className="history-item-rune-primary-img" title={primaryRunePath.name} src={`${prependUrl}${primaryRunePath.icon}`} />
                    {primaryRunePath ?
                        primaryRunePath.slots.map((slot, index) =>
                            <div key={index}>
                                {slot.runes.map((rune, key) =>
                                    selectedPrimaryRunes[key].id === rune.id ? <img key={key} className="history-item-rune-img" title={rune.name}
                                        src={`${prependUrl}${rune.icon}`} />
                                        :
                                        <img key={key} className="history-item-rune-img greyscale" title={rune.name}
                                            src={`${prependUrl}${rune.icon}`} />
                                )}
                            </div>
                        )
                        :
                        null
                    }
                </div>
                <div>
                    <img className="history-item-rune-secondary-img" title={secondaryRunePath.name} src={`${prependUrl}${secondaryRunePath.icon}`} />
                    {
                        selectedSecondaryRunes.map((slot, index) =>
                            <div key={index}>
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

                    {
                        statRunes.map((stat, key) => 
                            <img src={stat} key={key} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default RuneSetup;