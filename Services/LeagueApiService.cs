using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Models;
using Newtonsoft.Json;
using QuickType;

namespace Services
{
    public class LeagueApiService : ILeagueApiService
    {
        private readonly static HttpClient client = new HttpClient();
        private IConfiguration _config;
        private static readonly object threadlock = new object();


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

                string key = "RGAPI-2e3037e8-7ce0-4cc8-82c8-691562c91fe7";
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

    }
}