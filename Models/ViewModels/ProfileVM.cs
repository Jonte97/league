using Models;
using Newtonsoft.Json;

namespace ViewModels
{
    public class ProfileVM
    {
        [JsonProperty("leagueEntries")]
        LeagueEntry[] LeagueEntries { get; set; }
        
        [JsonProperty("summoner")]
        Summoner Summoner { get; set; }

        public ProfileVM(Summoner summoner, LeagueEntry[] leagueEntries)
        {
            LeagueEntries = leagueEntries;
            Summoner = summoner;
        }
    }
}