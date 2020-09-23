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
                //Gets list with all item purchases and sells
                var result = timeline.Frames
                .Select(x => x.Events
                    .Where(
                        y => y.ParticipantId == participantId &&
                        y.Type == TypeEnum.ItemPurchased ||
                        y.Type == TypeEnum.ItemUndo &&
                        y.ParticipantId  == participantId ||
                        y.Type == TypeEnum.ItemSold &&
                        y.ParticipantId == participantId
                    ).ToList()
                ).ToList();
                
                result = result.Where(x => x.Count > 0).ToList();

                //TODO remove undo items
                foreach (var frame in result)
                {
                    foreach (var item in frame)
                    {
                        if (item.Type == TypeEnum.ItemUndo)
                        {
                            var undo = frame.Where(x => x.ItemId == item.AfterId || x.ItemId == item.BeforeId).First();
                            frame.Remove(undo);
                        }
                    }
                }

                return result;

            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }
    }
}