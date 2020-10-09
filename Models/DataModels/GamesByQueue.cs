namespace Models
{
    public class GamesByQueue
    {
        public int Wins { get; set; }
        public int Losses { get; set; }
        public int GameCount { get; set; }
        public int QueueId { get; set; }
        public string QueueName { get; set; }
        public GamesByQueue(MingweiSamuel.Camille.LeagueExpV4.LeagueEntry league)
        {
            QueueName = league.QueueType;
            Wins = league.Wins;
            Losses = league.Losses;
            GameCount = Wins + Losses;
            if (league.QueueType == "RANKED_SOLO_5x5")
            {
                QueueId = 420;
            }
            else if(league.QueueType == "RANKED_FLEX_SR")
            {
                QueueId = 440;
            }
        }
    }
}