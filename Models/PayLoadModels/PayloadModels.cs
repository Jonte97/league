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
    public class SummonerMatchData
    {
        [JsonProperty("gameId")]
        public string GameId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}