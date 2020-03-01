using Models;
using Newtonsoft.Json;

namespace ViewModels
{
    public class MatchHistoryVM
    {
        [JsonProperty("matches")]
        public Matches Matches { get; set; }
        public string ChampionImage { get; set; }
    }
}