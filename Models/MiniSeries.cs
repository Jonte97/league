using System.Collections.Generic;
using Newtonsoft.Json;

namespace Models
{
    public class MiniSeries
    {
        [JsonProperty("progress")]
        public string Progress { get; set; }
        [JsonProperty("losses")]
        public int Losses { get; set; }
        [JsonProperty("target")]
        public int Target { get; set; }
        [JsonProperty("wins")]
        public int Wins { get; set; }
        [JsonExtensionData]
        public Dictionary<string, object> _AdditionalProperties { get; }
    }
}