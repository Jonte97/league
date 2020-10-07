using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Model;
using Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using QuickType;
using TimeLineNS;

namespace Services
{
    public class LeagueApiService : ILeagueApiService
    {
        private readonly static HttpClient client = new HttpClient();
        private IConfiguration _config;
        private static readonly object threadlock = new object();

        //TODO change this
        public string Patch { get; set; } = "10.19.1";
        public LeagueApiService(IConfiguration configuration)
        {
            _config = (IConfigurationRoot)configuration;
        }

        private async Task<HttpResponseMessage> SendRequestAsync(string uri)
        {
            HttpResponseMessage response = null;

            try
            {
                client.DefaultRequestHeaders.Clear();

                //TODO bör hämtas från appsettings
                string key = "RGAPI-27f314d6-8e0c-4765-b36a-4a56b782f363";
                client.DefaultRequestHeaders.Add("X-Riot-Token", key);

                response = await client.GetAsync(uri);

                response.EnsureSuccessStatusCode();

                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<Summoner> GetSummonerAsync(string name)
        {
            try
            {
                string url = $"https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/{name}";
                var response = await SendRequestAsync(url);

                var content = await response.Content.ReadAsStringAsync();

                var summoner = JsonConvert.DeserializeObject<Summoner>(content);

                return summoner;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        public async Task<LeagueEntry[]> GetRankedDataAsync(string id)
        {
            try
            {
                string url = $"https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/{id}";
                var response = await SendRequestAsync(url);
                var content = await response.Content.ReadAsStringAsync();
                var summoner = JsonConvert.DeserializeObject<LeagueEntry[]>(content);

                return summoner;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Matches> GetMatchHistoryAsync(string accountId)
        {
            string url = $"https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/{accountId}?endIndex=10";

            var response = await SendRequestAsync(url);
            var content = await response.Content.ReadAsStringAsync();
            var matches = JsonConvert.DeserializeObject<Matches>(content);

            return matches;
        }
        public async Task<MatchDetailed> GetMatchAsync(string matchId)
        {
            try
            {
                string url = $"https://euw1.api.riotgames.com/lol/match/v4/matches/{matchId}";

                var response = await SendRequestAsync(url);
                var content = await response.Content.ReadAsStringAsync();
                var match = JsonConvert.DeserializeObject<MatchDetailed>(content);

                return match;
            }
            catch (System.Exception)
            {

                throw;
            }
        }
        //TODO handle patch verisons
        //* Get simple champion list
        public async Task<ChampionSimple> GetChampionsAsync()
        {
            try
            {
                string url = $"http://ddragon.leagueoflegends.com/cdn/{Patch}/data/en_US/champion.json";

                var response = await SendRequestAsync(url);
                var content = await response.Content.ReadAsStringAsync();
                var champions = JsonConvert.DeserializeObject<ChampionSimple>(content);

                return champions;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<RootChampionDto> GetChampByKeyAsync(string key)
        {
            try
            {
                string url = $"http://ddragon.leagueoflegends.com/cdn/{Patch}/data/en_US/champion/{key}.json";
                var response = await SendRequestAsync(url);
                var content = await response.Content.ReadAsStringAsync();
                //TODO create c# model for champion
                var champion = JsonConvert.DeserializeObject<RootChampionDto>(content);

                return champion;

            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        public async Task<TimeLine> GetTimeLineForMatch(string matchId)
        {
            try
            {
                string url = $"https://euw1.api.riotgames.com/lol/match/v4/timelines/by-match/{matchId}";
                var response = await SendRequestAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                var timeline = JsonConvert.DeserializeObject<TimeLine>(content);

                return timeline;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}