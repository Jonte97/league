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
        private readonly IDataHandlerService _datahandler;
        public LeagueApiController(ILeagueApiService leagueApiService, ILeagueMiddleWare leagueMiddleWare, IDataHandlerService dataHandler)
        {
            _leagueApiService = leagueApiService;
            _leagueMiddleWare = leagueMiddleWare;
            _datahandler = dataHandler;
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
                var deserializedChampion = await _leagueApiService.GetChampByKeyAsync(activeChamp);
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
        //TODO Rename to Get timeLineForGame or something
        [HttpPost("[action]")]
        public async Task<IActionResult> GetItemsTimeLine([FromBody] ItemsTimeLine data)
        {
            //TODO fix bug games: 4843570041 and 4843092948
            //Dont know whats wrong prob Viktor hexcore item
            //msg Cannot read property 'items' of undefined -EKKO GAME
            //
            try
            {
                //* Fetch timeline object with data of events from gameId
                var timeline = await _leagueApiService.GetTimeLineForMatch(data.GameId);
                //* Assembling itemorder Data
                var items = _leagueMiddleWare.GetItemEventsForParticipant(data.ParticipantId, timeline);
                //* Assembling Skillorder data
                var skillorder = _leagueMiddleWare.GetSkillOrder(timeline, data.ParticipantId);
                //* Assembling Graphdata
                var graphData = _leagueMiddleWare.GetGraphData(timeline);

                //* Assembling viewmodel as return object
                var vm = new TimeLineVM() { Items = items, SkillOrder = skillorder, GraphData = graphData };

                return Ok(vm);
            }
            catch (System.Exception ex)
            {
                //!Should not return exception message 
                return StatusCode(500, Json(new { message = ex.Message }));
            }
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> GetRankedDataProfile([FromBody] LeagueEntry[] input)
        {
            try
            {
                var queueList = new List<GamesByQueue>();
                var vm = new RankedProfileVM();
                foreach (var entry in input)
                {
                    queueList.Add(new GamesByQueue(entry));
                }
                int i = 0;
                foreach (var queue in queueList)
                {
                    var refList = new ReferenceListWithTag(queue);
                    refList.MatchList = await _leagueApiService.GetMatchesRankedProfileAsync(queue);
                    vm.RankedQueues.Add(refList);
                    i++;
                }
                if (input.Length > 0)
                {
                    //TODO do some magic here for total
                }
                return Ok(vm);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500);
            }
        }
    }

}

