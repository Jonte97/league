using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using MingweiSamuel.Camille.MatchV4;
using MingweiSamuel.Camille.SpectatorV4;
using Model;
using Models;
using QuickType;
using TimeLineNS;

namespace Services
{
    public interface ILeagueApiService
    {
        Task<Summoner> GetSummonerAsync(string name);
        Task<LeagueEntry[]> GetRankedDataAsync(string id);
        Task<Matches> GetMatchHistoryAsync(string accountId);
        Task<MatchDetailed> GetMatchAsync(string matchId);
        Task<ChampionSimple> GetChampionsAsync();
        Task<RootChampionDto> GetChampByKeyAsync(string key);
        Task<TimeLine> GetTimeLineForMatch(string matchId);
        Task<List<MatchReference>> GetMatchesRankedProfileAsync(GamesByQueue queue);
        Task<int> CheckIfSummonerExists(string name);
        Task<CurrentGameInfo> GetLiveGame(string summonerId);
    }
}