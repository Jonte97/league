import { testRunes } from "../DataFiles/testRunes";

export const getRunePath = (id) => {
  const runeType = testRunes.find((obj) => obj.id == id);
  console.log(runeType);
};
export const getRuneFromId = (id) => {};
