using System.Collections.Generic;
using Newtonsoft.Json;

namespace Models
{
    public class Summoner
    {
        [JsonProperty("profileIconId")]
        public int ProfileIconId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("puuid")]
        public string Puuid { get; set; }
        [JsonProperty("summonerLevel")]
        public long SummonerLevel { get; set; }
        [JsonProperty("revisionDate")]
        public long RevisionDate { get; set; }
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("accountId")]
        public string AccountId { get; set; }
        [JsonExtensionData]
        public Dictionary<string, object> _AdditionalProperties { get; }
    }
}