using Models;
using QuickType;

namespace MiddleWare
{
    public interface ILeagueMiddleWare
    {
        Participant GetOnlyCurrentParticipantData(string name, MatchDetailed match);
    }
}