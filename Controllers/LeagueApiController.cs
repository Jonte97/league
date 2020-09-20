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
using Model;
using TimeLineNS;
using PayloadModels;

namespace Name.Controllers
{
    [Route("api/[controller]")]
    public class LeagueApiController : Controller
    {
        private readonly ILeagueApiService _leagueApiService;
        private readonly ILeagueMiddleWare _leagueMiddleWare;
        public LeagueApiController(ILeagueApiService leagueApiService, ILeagueMiddleWare leagueMiddleWare)
        {
            _leagueApiService = leagueApiService;
            _leagueMiddleWare = leagueMiddleWare;
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
        public async Task<IEnumerable<object>> GetSimpleChampionList()
        {
            var championSimple = await _leagueApiService.GetChampionsAsync();

            var champions = from key in championSimple.Data.Keys
                            select new { k = championSimple.Data[key].key, v = championSimple.Data[key] };

            //string json = JsonConvert.SerializeObject(championSimple);

            return champions;
        }
        [HttpPost("[action]")]
        public async Task<Participant> GetSummonerMatchData([FromBody] SummonerMatchData data)
        {
            try
            {
                var match = await _leagueApiService.GetMatchAsync(data.GameId);
                var summonerData = _leagueMiddleWare.GetOnlyCurrentParticipantData(data.Name, match);

                return summonerData;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPost("[action]")]
        public async Task<string> GetChampByKey([FromBody] string activeChamp)
        {
            try
            {
                var deserializedChampion =  await _leagueApiService.GetChampByKeyAsync(activeChamp);
                //TODO if works move to middleware
                var champions = from key in deserializedChampion.Data.Keys
                            select new { champion = deserializedChampion.Data[key] };

                string json = JsonConvert.SerializeObject(champions);

                return json;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }

        //* Gets list of items purchase order with timestamps
        //TODO Remove undo items
        [HttpPost("[action]")]
        public async Task<List<List<Event>>> GetItemsTimeLine([FromBody] ItemsTimeLine data)
        {
            var timeline = await _leagueApiService.GetTimeLineForMatch(data.GameId);
            var result = _leagueMiddleWare.GetItemEventsForParticipant(data.ParticipantId, timeline);

            return result;
        }
    }

}