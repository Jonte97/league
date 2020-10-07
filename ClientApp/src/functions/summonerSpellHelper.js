//SummmonerSpells does not come in a list but seperate objects in an obj and this switch finds correct spell and return it as obj
export const getSummonerSpell = (key, spells) => {
    switch (key) {
        case 4:
            return spells.SummonerFlash;
        case 21:
            return spells.SummonerBarrier;
        case 1:
            return spells.SummonerBoost;
        case 14:
            return spells.SummonerDot;
        case 3:
            return spells.SummonerExhaust;
        case 6:
            return spells.SummonerHaste;
        case 7:
            return spells.SummonerHeal;
        case 13:
            return spells.SummonerMana;
        case 30:
            return spells.SummonerPoroRecall;
        case 31:
            return spells.SummonerPoroThrow;
        case 11:
            return spells.SummonerSmite;
        case 39:
            return spells.SummonerSnowURFSnowball_Mark;
        case 32:
            return spells.SummonerSnowball;
        case 12:
            return spells.SummonerTeleport;
        default:
            return spells.SummonerMana;
    }
}