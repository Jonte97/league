using System.Linq;
using Models;
using Model;
using System.Threading.Tasks;
using TimeLineNS;
using System.Collections.Generic;

namespace MiddleWare
{
    public class LeagueMiddleWare : ILeagueMiddleWare
    {
        public Participant GetOnlyCurrentParticipantData(string name, MatchDetailed match)
        {
            var id = match.ParticipantIdentities.Where(x => x.Player.SummonerName == name).FirstOrDefault().ParticipantId;

            var participant = match.Participants.Where(x => x.ParticipantId == id).FirstOrDefault();

            return participant;
        }

        //* Returns list with Events of itempurchases that participantId did
        public List<List<Event>> GetItemEventsForParticipant(int participantId, TimeLine timeline)
        {
            try
            {
                var result = timeline.Frames
                .Select(x => x.Events
                .Where(y => y.ParticipantId == participantId && y.Type == TypeEnum.ItemPurchased).ToList()).ToList();
                result = result.Where(x => x.Count > 0).ToList();
                
                return result;

            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }
    }
}