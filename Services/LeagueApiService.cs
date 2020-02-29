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
        static readonly HttpClient client = new HttpClient();
        private IConfiguration _config;
        public LeagueApiService(IConfiguration configuration)
        {
            _config = (IConfigurationRoot)configuration;

                string key = "RGAPI-f4521b48-62f2-47fc-bf20-ce4851b5bfd4";
                client.DefaultRequestHeaders.Add("Origin", $"https://developer.riotgames.com");
                client.DefaultRequestHeaders.Add("Accept-Language", $"sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7");
                client.DefaultRequestHeaders.Add("X-Riot-Token", $"{key}");

        }
        
        public async Task<Summoner> GetSummonerAsync(string name)
        {
            try
            {
                string url = $"https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/{name}";

                var response = await client.GetAsync(url);

                response.EnsureSuccessStatusCode();
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

                var response = await client.GetAsync(url);

                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();

                var summoner = JsonConvert.DeserializeObject<LeagueEntry[]>(content);
                
                return summoner;
            }
            catch (System.Exception ex)
            {
                throw ex;                 
            }
        }

    }
}