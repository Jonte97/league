import React from "react";
import StatModsAdaptiveForceIcon from "../../../../img/StatMods/StatModsAdaptiveForceIcon.png";
import StatModsArmorIcon from "../../../../img/StatMods/StatModsArmorIcon.png";
import StatModsAttackSpeedIcon from "../../../../img/StatMods/StatModsAttackSpeedIcon.png";
import StatModsCDRScalingIcon from "../../../../img/StatMods/StatModsCDRScalingIcon.png";
import StatModsHealthScalingIcon from "../../../../img/StatMods/StatModsHealthScalingIcon.png";
import StatModsMagicResIcon from "../../../../img/StatMods/StatModsMagicResIcon.png";

const RuneSetup = (props) => {
  let primaryRunePath = props.runes.find((obj) => {
    return obj.id === props.stats.perkPrimaryStyle;
  });
  let secondaryRunePath = props.runes.find((obj) => {
    return obj.id === props.stats.perkSubStyle;
  });
  let selectedPrimaryRunes = [];

  for (let i = 0; i < primaryRunePath.slots.length; i++) {
    let slot = primaryRunePath.slots[i];
    for (let index = 0; index < slot.runes.length; index++) {
      let perk0 = primaryRunePath.slots[i].runes.find((obj) => {
        return obj.id === props.stats.perk0;
      });
      if (perk0 != null) {
        perk0.id === slot.runes[index].id
          ? (slot.runes[index].chosen = true)
          : (slot.runes[index].chosen = false);
      }
      let perk1 = primaryRunePath.slots[i].runes.find((obj) => {
        return obj.id === props.stats.perk1;
      });
      if (perk1 != null) {
        perk1.id === slot.runes[index].id
          ? (slot.runes[index].chosen = true)
          : (slot.runes[index].chosen = false);
      }
      let perk2 = primaryRunePath.slots[i].runes.find((obj) => {
        return obj.id === props.stats.perk2;
      });
      if (perk2 != null) {
        perk2.id === slot.runes[index].id
          ? (slot.runes[index].chosen = true)
          : (slot.runes[index].chosen = false);
      }
      let perk3 = primaryRunePath.slots[i].runes.find((obj) => {
        return obj.id === props.stats.perk3;
      });
      if (perk3 != null) {
        perk3.id === slot.runes[index].id
          ? (slot.runes[index].chosen = true)
          : (slot.runes[index].chosen = false);
      }
    }
    selectedPrimaryRunes.push(slot);
  }

  let selectedSecondaryRunes = [];
  let first = false;
  let second = false;

  for (let i = 1; i < secondaryRunePath.slots.length; i++) {
    let secondarySlot = secondaryRunePath.slots[i];
    for (let index = 0; index < secondarySlot.runes.length; index++) {
      let perk4 = secondaryRunePath.slots[i].runes.find((obj) => {
        return obj.id === props.stats.perk4;
      });
      if (perk4 != null) {
        perk4.id === secondarySlot.runes[index].id
          ? (secondarySlot.runes[index].chosen = true)
          : (secondarySlot.runes[index].chosen = false);
        first = true;
      }
      let perk5 = secondaryRunePath.slots[i].runes.find((obj) => {
        return obj.id === props.stats.perk5;
      });
      if (perk5 != null) {
        perk5.id === secondarySlot.runes[index].id
          ? (secondarySlot.runes[index].chosen = true)
          : (secondarySlot.runes[index].chosen = false);
        second = true;
      }
      if (perk4 == null && perk5 == null) {
        secondarySlot.runes[index].chosen = false;
      }
    }
    selectedSecondaryRunes.push(secondarySlot);
  }
  let prependUrl = "https://ddragon.leagueoflegends.com/cdn/img/";

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
  };
  statRunes.push(getStatRune(props.stats.statPerk0));
  statRunes.push(getStatRune(props.stats.statPerk1));
  statRunes.push(getStatRune(props.stats.statPerk2));

  return (
    <div>
      <div className="history-item-runesetup-holder">
        <div className="to-center">
          <div>
            <div>
              <div className="img-center">
                <img
                  className="history-item-rune-primary-img"
                  title={primaryRunePath.name}
                  src={`${prependUrl}${primaryRunePath.icon}`}
                />
              </div>
            </div>
            {selectedPrimaryRunes.map((slot, index) => (
              <div className="rune-row" key={index}>
                {slot.runes.map((rune, key) =>
                  rune.chosen === true ? (
                    <img
                      key={key}
                      className="history-item-rune-img"
                      title={rune.name}
                      src={`${prependUrl}${rune.icon}`}
                    />
                  ) : (
                    <img
                      key={key}
                      className="history-item-rune-img greyscale"
                      title={rune.name}
                      src={`${prependUrl}${rune.icon}`}
                    />
                  )
                )}
              </div>
            ))}
          </div>
          <div>
            <div>
              <div className="img-center">
                <img
                  className="history-item-rune-secondary-img"
                  title={secondaryRunePath.name}
                  src={`${prependUrl}${secondaryRunePath.icon}`}
                />
              </div>
            </div>
            {selectedSecondaryRunes.map((slot, index) => (
              <div className="rune-row" key={index}>
                {slot.runes.map((rune, key) =>
                  rune.chosen === true ? (
                    <img
                      key={key}
                      className="history-item-rune-img"
                      title={rune.name}
                      src={`${prependUrl}${rune.icon}`}
                    />
                  ) : (
                    <img
                      key={key}
                      className="history-item-rune-img greyscale"
                      title={rune.name}
                      src={`${prependUrl}${rune.icon}`}
                    />
                  )
                )}
              </div>
            ))}
            <div className="rune-row">
              {statRunes.map((stat, key) => (
                <img src={stat} key={key} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuneSetup;
