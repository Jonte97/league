//SummmonerSpells does not come in a list but seperate objects in an obj and this switch finds correct spell and return it as obj
export const getSummonerSpell = (key, spells) => {
    switch (key) {
        case 4:
            return spells.SummonerFlash;
            break;
        case 21:
            return spells.SummonerBarrier;
            break;
        case 1:
            return spells.SummonerBoost;
            break;
        case 14:
            return spells.SummonerDot;
            break;
        case 3:
            return spells.SummonerExhaust;
            break;
        case 6:
            return spells.SummonerHaste;
            break;
        case 7:
            return spells.SummonerHeal;
            break;
        case 13:
            return spells.SummonerMana;
            break;
        case 30:
            return spells.SummonerPoroRecall;
            break;
        case 31:
            return spells.SummonerPoroThrow;
            break;
        case 11:
            return spells.SummonerSmite;
            break;
        case 39:
            return spells.SummonerSnowURFSnowball_Mark;
            break;
        case 32:
            return spells.SummonerSnowball;
            break;
        case 12:
            return spells.SummonerTeleport;
            break;
        default:
            return spells.SummonerMana;
            break;
    }
}