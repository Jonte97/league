using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MingweiSamuel.Camille;
using MingweiSamuel.Camille.Enums;
using MingweiSamuel.Camille.MatchV4;
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
        public string Patch { get; set; } = "10.19.1";
        public LeagueApiService(IConfiguration configuration)
        {
            _config = (IConfigurationRoot)configuration;
            //TODO API Key should be moved to appsettings.json
            _riotApi = RiotApi.NewInstance("RGAPI-27f314d6-8e0c-4765-b36a-4a56b782f363");
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
        public async Task<List<MatchReference>> GetMatchesRankedProfile()
        {
            try
            {
                string accountId = "ozMoiB-Krv93WBb4oX1nXjgKAif4kvcA1BolzEzjf_Bc4xQ";
                int[] queue = new int[] { 420 };
                int[] season = new int[] { 13 };
                bool IsDone = false;
                int startIndex = 0;
                int endIndex = 100;
                List<MatchReference> list = new List<MatchReference>();
                //TODO should move this as constant somewhere
                DateTime dt = new DateTime(2020, 1, 10);

                while (!IsDone)
                {
                    var result = await _riotApi.MatchV4.GetMatchlistAsync(
                        Region.EUW,
                        accountId,
                        null,
                        queue,
                        season,
                        null,
                        null,
                        endIndex,
                        startIndex,
                        null
                    );
                    foreach (var match in result.Matches)
                    {
                        list.Add(match);
                    }
                    int lastIndex = result.Matches.Length - 1;
                    double sec = TimeSpan.FromMilliseconds(result.Matches[lastIndex].Timestamp).TotalSeconds;
                    var time = UnixTimeStampToDateTime(sec);

                    startIndex += 100;
                    endIndex += 100;
                    if (time.Date <= dt)
                    {
                        IsDone = true;
                    }
                }
                return list;
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

        //TODO should move this so it can be used by other funtions
        private static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }
    }
}