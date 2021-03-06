using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MingweiSamuel.Camille;
using MingweiSamuel.Camille.Enums;
using MingweiSamuel.Camille.MatchV4;
using MingweiSamuel.Camille.SpectatorV4;
using Model;
using Models;
using Newtonsoft.Json;
using QuickType;
using TimeLineNS;

namespace Services
{
    public class LeagueApiService : ILeagueApiService
    {
        private readonly static HttpClient client = new HttpClient();
        private IConfiguration _config;
        private readonly RiotApi _riotApi;
        private static readonly object threadlock = new object();

        //TODO change this to be set to current patch when website starts
        public string Patch { get; set; } = "10.22.1";
        public LeagueApiService(IConfiguration configuration)
        {
            _config = (IConfigurationRoot)configuration;
            //TODO API Key should be moved to appsettings.json
            _riotApi = RiotApi.NewInstance("RGAPI-27f314d6-8e0c-4765-b36a-4a56b782f363");
        }

        private async Task<HttpResponseMessage> SendRequestAsync(string uri)
        {
            try
            {
                HttpResponseMessage response = null;

                client.DefaultRequestHeaders.Clear();

                //TODO bör hämtas från appsettings
                string key = "RGAPI-27f314d6-8e0c-4765-b36a-4a56b782f363";
                client.DefaultRequestHeaders.Add("X-Riot-Token", key);
                response = await client.GetAsync(uri);

                response.EnsureSuccessStatusCode();
                return response;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        private async Task<int> GetStatusCode(string uri)
        {
            try
            {
                HttpResponseMessage response = null;

                client.DefaultRequestHeaders.Clear();

                //TODO bör hämtas från appsettings
                string key = "RGAPI-27f314d6-8e0c-4765-b36a-4a56b782f363";
                client.DefaultRequestHeaders.Add("X-Riot-Token", key);
                response = await client.GetAsync(uri);

                var statusCode = response.StatusCode;
                if (statusCode == HttpStatusCode.OK)
                {
                    return 200;
                }
                else if (statusCode == HttpStatusCode.NotFound)
                {
                    return 404;
                }
                else
                {
                    return 500;
                }
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> CheckIfSummonerExists(string name)
        {
            string url = $"https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/{name}";
            var code = await GetStatusCode(url);
            return code;
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
            catch (HttpRequestException hre)
            {
                throw hre;
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
        public async Task<List<MatchReference>> GetMatchesRankedProfileAsync(GamesByQueue queue)
        {
            try
            {
                string accountId = "ozMoiB-Krv93WBb4oX1nXjgKAif4kvcA1BolzEzjf_Bc4xQ";
                int startIndex = 0, endIndex = 100, burndown = queue.GameCount;
                int[] q = new int[] { queue.QueueId };
                bool isDone = false;
                var matchList = new List<MatchReference>();
                if (queue.GameCount <= 100)
                {
                    endIndex = queue.GameCount;
                }
                while (!isDone)
                {
                    if (burndown < 100) { endIndex = burndown + startIndex; }
                    var result = await _riotApi.MatchV4
                    .GetMatchlistAsync(
                                Region.EUW,
                                accountId,
                                null,
                                q,
                                null,
                                null,
                                null,
                                endIndex,
                                startIndex,
                                null
                            );
                    foreach (var match in result.Matches)
                    {
                        matchList.Add(match);
                        burndown--;
                    }
                    if (burndown == 0)
                    {
                        isDone = true;
                    }
                    else
                    {
                        startIndex += 100;
                        endIndex += 100;
                    }
                }
                return matchList;
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }
        public async Task<CurrentGameInfo> GetLiveGame(string summonerId)
        {
            var result = await _riotApi.SpectatorV4.GetCurrentGameInfoBySummonerAsync(Region.EUW, summonerId);
            return result;
        }
    }
}