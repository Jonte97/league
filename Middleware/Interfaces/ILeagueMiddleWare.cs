using Models;
using Model;

namespace MiddleWare
{
    public interface ILeagueMiddleWare
    {
        Participant GetOnlyCurrentParticipantData(string name, MatchDetailed match);
    }
}