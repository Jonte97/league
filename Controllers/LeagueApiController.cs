using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using static league_site.Controllers.SampleDataController;
using Newtonsoft;
using Newtonsoft.Json;
using Services;
using Models;
using System.Threading.Tasks;
using MiddleWare;
using ViewModels;

namespace Name.Controllers
{
    [Route("api/[controller]")]
    public class LeagueApiController : Controller
    {
        private readonly ILeagueApiService _leagueApiService;
        private readonly ILeagueMiddleWare _leagueMiddleWare;
        public LeagueApiController(ILeagueApiService leagueApiService)
        {
            _leagueApiService = leagueApiService;
        }
        [HttpPost("[action]")]
        public async Task<string> GetSummonerData([FromBody] string name)
        {
            var summoner = await _leagueApiService.GetSummonerAsync(name);
            var leagues = await _leagueApiService.GetRankedDataAsync(summoner.Id);

            var profile = new ProfileVM(summoner, leagues);

            string json = JsonConvert.SerializeObject(profile);

            return json;
        }

        [HttpGet("[action]")]
        public async Task<string> GetSummonerInitialData()
        {
            var summoner = await _leagueApiService.GetSummonerAsync("lönnen");
            var leagues = await _leagueApiService.GetRankedDataAsync(summoner.Id);
            var profile = new ProfileVM(summoner, leagues);
            string json = JsonConvert.SerializeObject(profile);
            return json;
        }

        [HttpPost("[action]")]
        public async Task<string> GetMatchHistory([FromBody] string accountId)
        {
            var matches = await _leagueApiService.GetMatchHistoryAsync(accountId);
            string json = JsonConvert.SerializeObject(matches);

            return json;
        }

        [HttpPost("[action]")]
        public async Task<string> GetMatchById([FromBody] string matchId)
        {
            var match = await _leagueApiService.GetMatchAsync(matchId);
            string json = JsonConvert.SerializeObject(match);

            return json;
        }
        [HttpGet("[action]")]
        public async Task<string> GetSimpleChampionList()
        {
            var championSimple = await _leagueApiService.GetChampionsAsync();
            string json = JsonConvert.SerializeObject(championSimple);

            return json;
        }
    }

}