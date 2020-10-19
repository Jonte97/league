using System.Collections.Generic;
using MingweiSamuel.Camille.MatchV4;
using Models;

namespace ViewModels
{
    public class RankedProfileVM
    {
        public List<ReferenceListWithTag> RankedQueues { get; set; } = new List<ReferenceListWithTag>();
        
    }
    public class ChampionRankedMostPlayedVM
    {
        public List<ListMatchListForChampion> QueueList { get; set; } = new List<ListMatchListForChampion>();
    }
    public class ListMatchListForChampion
    {
        public List<MatchListForChampion> MatchListChampion { get; set; } = new List<MatchListForChampion>();
        public int[] QueueId { get; set; }
    }
    public class MatchListForChampion
    {
        //*Should this be included in payload?
        public List<MatchReference> MatchList { get; set; }
        public int GameCount { get; set; }
        public int ChampionId { get; set; }
        public double Winrate { get; set; } = 52;
    }
    //TODO Rename
    public class ReferenceListWithTag
    {
        public List<MatchReference> MatchList { get; set; }
        public int QueueId { get; set; }
        public ReferenceListWithTag(GamesByQueue queue)
        {
            QueueId = queue.QueueId;
            MatchList = new List<MatchReference>();
        }
    }
}