import { testRunes } from "../DataFiles/testRunes";

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
