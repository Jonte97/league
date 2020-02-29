using System.Collections.Generic;
using Newtonsoft.Json;

namespace Models
{
    public class LeagueEntry
    {
        [JsonProperty("summonerId")]
        public string SummonerId { get; set; }
        [JsonProperty("tier")]
        public string Tier { get; set; }
        [JsonProperty("freshBlood")]
        public bool FreshBlood { get; set; }
        [JsonProperty("inactive")]
        public bool Inactive { get; set; }
        [JsonProperty("leagueId")]
        public string LeagueId { get; set; }
        [JsonProperty("rank")]
        public string Rank { get; set; }
        [JsonProperty("leaguePoints")]
        public int LeaguePoints { get; set; }
        [JsonProperty("losses")]
        public int Losses { get; set; }
        [JsonProperty("wins")]
        public int Wins { get; set; }
        [JsonProperty("miniSeries")]
        public MiniSeries MiniSeries { get; set; }
        [JsonProperty("hotStreak")]
        public bool HotStreak { get; set; }
        [JsonProperty("summonerName")]
        public string SummonerName { get; set; }
        [JsonProperty("queueType")]
        public string QueueType { get; set; }
        [JsonProperty("veteran")]
        public bool Veteran { get; set; }
        [JsonExtensionData]
        public Dictionary<string, object> _AdditionalProperties { get; }
    }
}