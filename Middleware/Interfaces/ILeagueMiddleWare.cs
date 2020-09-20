using Models;
using Model;
using System.Threading.Tasks;
using TimeLineNS;
using System.Collections.Generic;

namespace MiddleWare
{
    public interface ILeagueMiddleWare
    {
        Participant GetOnlyCurrentParticipantData(string name, MatchDetailed match);
        List<List<Event>> GetItemEventsForParticipant(int participantId, TimeLine timeline);
    }
}