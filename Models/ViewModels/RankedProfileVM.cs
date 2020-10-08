using System.Collections.Generic;
using MingweiSamuel.Camille.MatchV4;
using Models;

namespace ViewModels
{
    public class RankedProfileVM
    {
        public List<ReferenceListWithTag> RankedQueues { get; set; } = new List<ReferenceListWithTag>();
        
    }
    //TODO Rename
    public class ReferenceListWithTag
    {
        public List<MatchReference> MatchList { get; set; }
        public int QueueId { get; set; }
        public string QueueName { get; set; }
        public string DisplayQueueName { get; set; }
        public ReferenceListWithTag(GamesByQueue queue)
        {
            QueueId = queue.QueueId;
            QueueName = QueueName;
            switch (queue.QueueId)
            {
                case 420:
                    DisplayQueueName = "Ranked solo";
                    break;
                case 440:
                    DisplayQueueName = "Ranked Flex";
                    break;
                default:
                    DisplayQueueName = "Unknown Queue";
                    break;
            }
            MatchList = new List<MatchReference>();
        }
    }
}