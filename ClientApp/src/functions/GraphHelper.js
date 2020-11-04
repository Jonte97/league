import {
  getChampionFromDictionaryById,
  getChampionImageById,
} from "./ChampionHelper";
import { patch } from "../TestFiles/Configuration";
//* COLOR array of colors to use in graph
const colors = [
  "#7fe5f0",
  "#bada55",
  "#ff0000",
  "#407294",
  "#ffffff",
  "#065535",
  "#000000",
  "#40e0d0",
  "#0000ff",
  "#fff68f",
];
const getThumbnail = (participant, champList) => {
  const image = getChampionImageById(participant.championId, champList);
  //let champ = champList.find((obj) => obj.k == participant.championId);
  return `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${image.full}`;
};
export const getParticipantTeam = (list, champList) => {
  let teamLists = { blue: [], red: [] };
  list.forEach((element) => {
    element.champUrl = getThumbnail(element, champList);
  });
  let blue = list.filter((obj) => {
    return obj.teamId === 100;
  });
  let red = list.filter((obj) => {
    return obj.teamId === 200;
  });
  teamLists.blue = blue;
  teamLists.red = red;
  return teamLists;
};

export const getDatasets = (displayData, option, candidates) => {
  let data = [];

  for (let i = 0; i < 10; i++) {
    let cand = candidates.find((participant) => {
      return participant.participantId === displayData[i].participantId;
    });
    if (cand.active === true) {
      let graphData = [];
      switch (option.id) {
        case "gold":
          graphData = displayData[i].gold;
          break;
        case "xp":
          graphData = displayData[i].exp;
          break;
        case "cs":
          graphData = displayData[i].cs;
          break;
        default:
          break;
      }
      const element = {
        label: displayData[i].champion,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: cand.color,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: graphData,
      };
      data.push(element);
    }
  }
  return data;
};

//* CONFIGURE the data thats shown in the graph
export const configureGraphData = (
  participantFrames,
  participantList,
  championList
) => {
  let data = [];
  for (let i = 0; i < participantFrames.length; i++) {
    let x = participantFrames.find((obj) => {
      return obj.participantId === i + 1;
    });
    let obj = { participantId: x.participantId, gold: [], cs: [], exp: [] };
    data.push({});
    x.frames.forEach((element) => {
      obj.gold.push(element.participantFrame.totalGold);
      obj.cs.push(element.participantFrame.minionsKilled);
      obj.exp.push(element.participantFrame.xp);
    });
    data[i].gold = obj.gold;
    data[i].cs = obj.cs;
    data[i].exp = obj.exp;
    data[i].participantId = obj.participantId;
    let champId = participantList.find((y) => {
      return y.participantId === obj.participantId;
    });
    // let champion = championList.find((y) => {
    //   return y.k == champId.championId;
    // });
    const champion = getChampionFromDictionaryById(
      champId.championId,
      championList
    );
    //TODO should be img later
    console.log(champion);
    data[i].champion = champion.name;
  }
  return data;
};
