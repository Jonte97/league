import { testRunes } from "../DataFiles/testRunes";
import StatModsAdaptiveForceIcon from "../img/StatMods/StatModsAdaptiveForceIcon.png";
import StatModsArmorIcon from "../img/StatMods/StatModsArmorIcon.png";
import StatModsAttackSpeedIcon from "../img/StatMods/StatModsAttackSpeedIcon.png";
import StatModsCDRScalingIcon from "../img/StatMods/StatModsCDRScalingIcon.png";
import StatModsHealthScalingIcon from "../img/StatMods/StatModsHealthScalingIcon.png";
import StatModsMagicResIcon from "../img/StatMods/StatModsMagicResIcon.png";



export const getRunePathById = (id) => {
  const runeType = testRunes.find((obj) => obj.id == id);
  return runeType;
};
export const getRuneFromId = (id, path, i) => {
  try {
    const rune = path.slots[i].runes.find((obj) => obj.id == id);
    return rune;
  } catch (error) {
    console.log(error);
  }
};
export const getStatRune = (id) => {
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
