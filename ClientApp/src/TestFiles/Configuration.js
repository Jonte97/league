export const patch = "10.23.1";

const ddragonPatch = async () => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/api/versions.json`
  );
  const data = await response.json();
  return data;
};

//TODO Should take region as parameter later
const getRegionDdragonVersion = async (region) => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/realms/${region}.json`
  );
  const data = await response.json();

  return data;
};

export const configure = async () => {
  const dDragon = await ddragonPatch();
  const regionDVersion = await getRegionDdragonVersion("euw");

  const patch = {
    dragonPatches: dDragon,
    regionVersion: regionDVersion,
    version: regionDVersion.dd,
  };
  return patch;
};
