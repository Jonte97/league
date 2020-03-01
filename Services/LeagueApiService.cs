using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Models;
using Newtonsoft.Json;

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

                string key = "RGAPI-03aad998-30a1-4bcb-9044-cfb9425df580";
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
            try
            {
                string url = "https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/CVJYBZF4gP1K8Yf9qz4yXaRj8VB8HAO8Iw-Di5akt17wMTQ?endIndex=10";

                var response = await SendRequestAsync(url);
                var content = await response.Content.ReadAsStringAsync();
                var matches = JsonConvert.DeserializeObject<Matches>(content);

                return matches;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

    }
}