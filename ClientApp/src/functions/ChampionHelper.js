import * as championData from '../TestFiles/champions.json';



//* Creates key value pair of champion json
export const championDictionary = () => { 
    let dict = [];
    for (var champ in championData.data) {
        dict.push({
            key: championData.data[champ].key,
            value: championData.data[champ]
        })    
    }
    return dict;
}
//* Returns image obj from dictionary found by champid INPUT: championId |champion dictionary
export const getChampionImageById = (id, dictionary) => {
    const champ = dictionary.find((obj) => obj.key == id);
    return champ.value.image;
}