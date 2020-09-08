using System.Threading.Tasks;
using Model;
using Models;
using QuickType;

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

    }
}