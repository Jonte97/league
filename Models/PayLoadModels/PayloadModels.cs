using MingweiSamuel.Camille.LeagueExpV4;
using Newtonsoft.Json;

namespace PayloadModels
{
    public class ItemsTimeLine
    {
        [JsonProperty("gameId")]
        public string GameId { get; set; }
        [JsonProperty("participant")]
        public int ParticipantId { get; set; }
    }
    public class MostPlayedChampsRequestModel
    {
        [JsonProperty("entries")]
        public LeagueEntry[] LeagueEntries { get; set; }
        [JsonProperty("accountId")]
        public string AccountId { get; set; }
    }
    public class SummonerMatchData
    {
        [JsonProperty("gameId")]
        public string GameId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}