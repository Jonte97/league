import * as championData from "../TestFiles/champions.json";

//* Creates key value pair of champion json
export const championDictionary = () => {
  let dict = [];
  for (var champ in championData.data) {
    dict.push({
      key: championData.data[champ].key,
      value: championData.data[champ],
    });
  }
  return dict;
};
//* Returns image obj from dictionary found by champid INPUT: championId |champion dictionary
export const getChampionImageById = (id, dictionary) => {
  const champ = dictionary.find((obj) => obj.key == id);
  return champ.value.image;
};
//* Returns name obj from dictionary found by champid INPUT: championId |champion dictionary
export const getChampionNameById = (id, dictionary) => {
  const champ = dictionary.find((obj) => obj.key == id);
  return champ.value.name;
};
//* Finds and return champion from Dictioary INPUT: championId, champion dictionary
export const getChampionFromDictionaryById = (id, dictionary) => {
  const champ = dictionary.find((obj) => obj.key == id);
  return champ.value;
};

//* Filters champion-obj and returns array of spells. INPUT: standalone-champion
export const getChampionAbilities = (champion, name) => {
  const abilities = champion.data[`${name}`].spells;
  return abilities;
};
//* Filters champion-obj and returns passive. INPUT: standalone-champion
export const getChampionPassive = (champion, name) => {
  const passive = champion.data[`${name}`].passive;
  return passive;
};