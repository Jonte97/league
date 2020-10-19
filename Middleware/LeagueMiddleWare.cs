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
        //TODO Move to datahandlersevice
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
                        y.ParticipantId == participantId ||
                        y.Type == TypeEnum.ItemSold &&
                        y.ParticipantId == participantId
                    ).ToList()
                ).ToList();

                result = result.Where(x => x.Count > 0).ToList();

                //* Removes undo items from list
                foreach (var frame in result.ToList())
                {
                    foreach (var item in frame.ToList())
                    {
                        if (item.Type == TypeEnum.ItemUndo)
                        {
                            var undo = frame.Where(x => x.ItemId == item.AfterId || x.ItemId == item.BeforeId).First();

                            frame.Remove(undo);
                            frame.Remove(item);
                        }

                    }
                }
                result = result.Where(x => x.Count != 0).ToList();
                return result;
            }
            catch (System.Exception ex)
            {
                string msg = ex.Message;
                throw ex;
            }
        }
        public List<Event> GetSkillOrder(TimeLine timeline, int participantId)
        {
            try
            {
                var skills = timeline.Frames.SelectMany(x => x.Events.Where(
                    y => y.Type == TypeEnum.SkillLevelUp && y.ParticipantId == participantId
                )).ToList();

                skills = skills.Where(x => x != null).ToList();

                return skills;
            }
            catch (System.Exception ex)
            {
                string msg = ex.Message;
                throw ex;
            }
        }
        public TimelineDataHolder GetGraphData(TimeLine timeLine)
        {
            try
            {
                var dataModel = new TimelineDataHolder();
                var dataList = new List<List<ParticipantFrames>>();
                for (int i = 1; i <= 10; i++)
                {
                    var participantFrame = new ParticipantFrames();
                    participantFrame.ParticipantId = i;
                    foreach (var frame in timeLine.Frames)
                    {
                        var frameData = new FrameData();
                        frameData.participantFrame = frame.ParticipantFrames.Where(x => x.Value.ParticipantId == i).FirstOrDefault().Value;
                        frameData.Timestamp = frame.Timestamp;
                        frameData.ParticipantId = i;
                        if (frameData.participantFrame != null)
                        {
                            participantFrame.Frames.Add(frameData);
                        }
                    }
                    dataModel.ParticipantFrames.Add(participantFrame);
                }
                return dataModel;
            }
            catch (System.Exception ex)
            {

                throw ex;
            }

        }
    }
}
